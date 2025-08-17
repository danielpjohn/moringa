import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import CheckoutPageHeader from '../../molecules/checkout/CheckoutPageHeader';
import ShippingForm from '../../molecules/checkout/ShippingForm';
import PaymentMethod from '../../molecules/checkout/PaymentMethod';
import OrderSummary from '../../molecules/checkout/OrderSummary';
import { useAuth } from '../Login/AuthContext';
import {
  fetchCart,
  fetchCartSession,
  getGuestCart,
  type CartItem
} from '../Products/api.ts';

// CartItem type imported from Products/api.ts

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

const Checkout = () => {
  const { isAuthenticated } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<'credit' | 'paypal' | 'apple-pay' | null>(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        setError(null);
        if (isAuthenticated) {
          const token = localStorage.getItem('access_token') || '';
          if (token) {
            const data = await fetchCart(token);
            setCartItems(data);
          } else {
            setCartItems([]);
          }
        } else {
          try {
            const sessionData = await fetchCartSession();
            setCartItems(Array.isArray(sessionData) && sessionData.length > 0 ? sessionData : getGuestCart());
          } catch {
            const local = getGuestCart();
            setCartItems(local);
          }
        }
      } catch (e) {
        setError('Failed to load cart for checkout');
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [isAuthenticated]);

  // Compute totals based on API cart items (price lives under product)
  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.product.price) * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Order placed successfully!');
      setIsSubmitting(false);
    }, 1000);
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <CheckoutPageHeader 
            title="Checkout"
            description="Complete your purchase in just a few steps"
          />

          {loading && (
            <div className="py-8 text-center text-gray-600">Loading your cart...</div>
          )}
          {error && (
            <div className="py-4 mb-6 text-center text-red-600 bg-red-50 border border-red-200 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="xl:col-span-2">
              <ShippingForm 
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
              />
              
              <div className="mt-8">
                <PaymentMethod 
                  selectedMethod={selectedPayment}
                  onSelect={setSelectedPayment}
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <OrderSummary 
                items={cartItems.map(ci => ({
                  id: ci.id,
                  name: ci.product.name,
                  price: Number(ci.product.price) || 0,
                  quantity: ci.quantity,
                  image: ci.product.image || '',
                  stock: 9999,
                }))}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                onQuantityChange={handleQuantityChange}
                onRemoveItem={handleRemoveItem}
                onApplyCoupon={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
;

export default Checkout;