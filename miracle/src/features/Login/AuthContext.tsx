import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import { api, syncGuestCart, fetchCart, addToCart, saveGuestCart, getGuestCart } from "../Products/api";

interface Tokens {
  access: string;
  refresh: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  username?: string;
  role?: string;
  is_staff?: boolean;
  is_superuser?: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User, tokens: Tokens) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async (token: string) => {
    try {
      const response = await api.get('/user/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Failed to fetch user data', error);
      return false;
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      const success = await fetchUserData(accessToken);
      if (!success) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    }
    setLoading(false);
  }, [fetchUserData]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = useCallback(async (userData: User, tokens: Tokens) => {
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    
    try {
      // Check if we have a guest cart to sync
      const guestCart = getGuestCart();
      if (guestCart.length > 0) {
        await syncGuestCart(tokens.access);
      }
      
      // Always fetch the latest cart from server after login
      const serverCart = await fetchCart(tokens.access);
      
      // If server cart is empty but we had guest items, restore them
      if (serverCart.length === 0 && guestCart.length > 0) {
        await Promise.all(
          guestCart.map(item => 
            addToCart(item.product.id, item.quantity, tokens.access)
          )
        );
      }
      
      // Update local cart with server state
      const updatedCart = await fetchCart(tokens.access);
      saveGuestCart(updatedCart.map(item => ({
        id: item.id,
        product: item.product,
        quantity: item.quantity,
        addedAt: new Date().toISOString(),
      })));
      
    } catch (error) {
      console.error('Cart sync failed:', error);
    }
    
    setUser(userData);
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) return false;

      const response = await axios.post('http://127.0.0.1:8000/token/refresh/', {
        refresh: refreshToken
      });

      localStorage.setItem('access_token', response.data.access);
      return await fetchUserData(response.data.access);
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  }, [fetchUserData]);

  const logout = useCallback(async () => {
    try {
      // Save current cart state before logout
      const currentCart = await fetchCart(localStorage.getItem('access_token') || undefined);
      if (currentCart.length > 0) {
        saveGuestCart(currentCart.map(item => ({
          id: item.id,
          product: item.product,
          quantity: item.quantity,
          addedAt: new Date().toISOString(),
        })));
      }

      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        await axios.post('http://127.0.0.1:8000/logout/', {
          refresh: refreshToken
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setUser(null);
    }
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}