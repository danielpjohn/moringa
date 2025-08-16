import axios from 'axios';
import type { Category, Product } from './types';

const API_BASE = 'http://127.0.0.1:8000';

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  timeout: 5000,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('API Error: No response received', error.request);
    } else {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export interface ApiCartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface CartItem extends ApiCartItem {
  addedAt: string;
}

// Improved product validation
function validateProduct(product: any): Product {
  if (!product || 
      typeof product !== 'object' ||
      typeof product.id !== 'number' || 
      typeof product.name !== 'string' ||
      typeof product.price === 'undefined') {
    console.error('Invalid product data:', product);
    throw new Error('Invalid product data format');
  }
  
  return {
    id: product.id,
    name: product.name,
    description: product.description || '',
    price: Number(product.price),
    image: product.image || null,
    category: product.category || null,
    stock: typeof product.stock === 'number' ? product.stock : 0,
    is_active: typeof product.is_active === 'boolean' ? product.is_active : true,
    created_at: typeof product.created_at === 'string' ? product.created_at : new Date().toISOString()
  };
}

// Improved cart item validation
function validateCartItem(item: any): CartItem {
  if (!item || typeof item !== 'object') {
    throw new Error('Invalid cart item format');
  }

  return {
    id: typeof item.id === 'number' ? item.id : Date.now(),
    product: validateProduct(item.product),
    quantity: typeof item.quantity === 'number' && item.quantity > 0 ? item.quantity : 1,
    addedAt: typeof item.addedAt === 'string' ? item.addedAt : new Date().toISOString()
  };
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await api.get('/categories/');
  return Array.isArray(response.data) ? response.data : [];
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await api.get('/products/');
  if (!Array.isArray(response.data)) {
    return [];
  }
  return response.data.map(product => validateProduct(product));
}

export async function fetchCart(accessToken?: string): Promise<CartItem[]> {
  try {
    const config = accessToken 
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};
    const response = await api.get('/cart/', config);
    
    if (!Array.isArray(response.data)) {
      throw new Error('Invalid cart data format');
    }

    return response.data.map((item: any) => validateCartItem(item));
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return getGuestCart(); // Fallback to guest cart
  }
}

export async function addToCart(
  productId: number, 
  quantity: number = 1,
  accessToken?: string
): Promise<CartItem> {
  if (typeof productId !== 'number' || productId <= 0) {
    throw new Error('Invalid product ID');
  }

  if (typeof quantity !== 'number' || quantity <= 0) {
    throw new Error('Invalid quantity');
  }

  try {
    const config = accessToken 
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};
    const response = await api.post(
      '/cart/',
      { product: productId, quantity },
      config
    );
    
    return validateCartItem(response.data);
  } catch (error) {
    console.error('Failed to add to cart:', error);
    throw error;
  }
}

export async function removeFromCart(
  itemId: number,
  accessToken?: string
): Promise<void> {
  try {
    const config = accessToken 
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};
    await api.delete(`/cart/${itemId}/`, config);
  } catch (error) {
    console.error('Failed to remove from cart:', error);
    throw error;
  }
}

export async function updateCartItem(
  itemId: number, 
  quantity: number,
  accessToken?: string
): Promise<CartItem> {
  if (quantity < 1) {
    throw new Error('Quantity must be at least 1');
  }

  try {
    const config = accessToken 
      ? { headers: { Authorization: `Bearer ${accessToken}` } }
      : {};
    const response = await api.patch(
      `/cart/${itemId}/`,
      { quantity },
      config
    );
    
    return {
      id: response.data.id,
      product: validateProduct(response.data.product),
      quantity: Number(response.data.quantity) || 1,
      addedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Failed to update cart item:', error);
    throw error;
  }
}

// Local storage functions with validation
export function saveGuestCart(items: CartItem[]): void {
  try {
    const validItems = items.filter(item => 
      item && 
      item.product && 
      typeof item.quantity === 'number' && 
      item.quantity > 0
    );
    localStorage.setItem('guestCart', JSON.stringify(validItems));
  } catch (error) {
    console.error('Failed to save guest cart:', error);
  }
}

export function getGuestCart(): CartItem[] {
  try {
    const guestCart = localStorage.getItem('guestCart');
    if (!guestCart) return [];
    
    const parsed = JSON.parse(guestCart);
    if (!Array.isArray(parsed)) return [];
    
    return parsed.filter(item => 
      item && 
      item.product && 
      typeof item.quantity === 'number' && 
      item.quantity > 0
    );
  } catch (error) {
    console.error('Failed to load guest cart:', error);
    return [];
  }
}

export function clearGuestCart(): void {
  localStorage.removeItem('guestCart');
}

// Improved sync functions
export async function syncGuestCart(accessToken: string): Promise<void> {
  const guestCart = getGuestCart();
  if (guestCart.length === 0) return;

  try {
    // Get current server cart to avoid duplicates
    const serverCart = await fetchCart(accessToken);
    
    await Promise.all(
      guestCart.map(async guestItem => {
        const existingItem = serverCart.find(
          item => item.product.id === guestItem.product.id
        );
        
        if (existingItem) {
          // Update existing item with combined quantity
          await updateCartItem(
            existingItem.id,
            existingItem.quantity + guestItem.quantity,
            accessToken
          );
        } else {
          // Add new item
          await addToCart(guestItem.product.id, guestItem.quantity, accessToken);
        }
      })
    );
    
    clearGuestCart();
  } catch (error) {
    console.error('Failed to sync guest cart:', error);
    throw error;
  }
}

export async function syncCartOnLogin(accessToken: string): Promise<CartItem[]> {
  try {
    const [guestCart, serverCart] = await Promise.all([
      getGuestCart(),
      fetchCart(accessToken)
    ]);

    if (guestCart.length > 0) {
      await Promise.all(
        guestCart.map(async guestItem => {
          const existingItem = serverCart.find(
            item => item.product.id === guestItem.product.id
          );
          
          if (existingItem) {
            await updateCartItem(
              existingItem.id,
              existingItem.quantity + guestItem.quantity,
              accessToken
            );
          } else {
            await addToCart(guestItem.product.id, guestItem.quantity, accessToken);
          }
        })
      );
    }

    // Return merged cart from server
    const finalCart = await fetchCart(accessToken);
    saveGuestCart(finalCart);
    return finalCart;
  } catch (error) {
    console.error('Failed to sync cart on login:', error);
    // Fallback to server cart
    const serverCart = await fetchCart(accessToken);
    saveGuestCart(serverCart);
    return serverCart;
  }
}