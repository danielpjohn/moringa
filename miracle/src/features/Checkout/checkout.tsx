import React, { useState } from 'react';
import { 
  Check, 
  CreditCard, 
  Lock, 
  MapPin, 
  Truck, 

  ShoppingCart,
  ArrowRight
} from 'lucide-react';
import Navbar from '../Navbar/navbar';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
  paymentMethod: string;
}

const Checkout = () => {
  const [cartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Organic Moringa Powder",
      price: 12.99,
      quantity: 2,
      image: "/images/moringa-powder.jpg"
    },
    {
      id: 2,
      name: "Moringa Tea Bags",
      price: 8.99,
      quantity: 1,
      image: "/images/moringa-tea.jpg"
    }
  ]);

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    paymentMethod: 'credit'
  });

  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'MORINGA10') {
      setDiscount(subtotal * 0.1);
      setCouponMessage('Coupon applied successfully!');
    } else if (couponCode.toUpperCase() === 'MORINGA20') {
      setDiscount(subtotal * 0.2);
      setCouponMessage('Coupon applied successfully!');
    } else {
      setDiscount(0);
      setCouponMessage('Invalid coupon code');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Order placed successfully!');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-2">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              Checkout
            </h1>
            <p className="text-gray-600 text-xl">
              Complete your purchase in just a few steps
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="xl:col-span-2">
              <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden backdrop-blur-sm">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <MapPin className="h-6 w-6" />
                    Shipping Information
                  </h2>
                </div>
                
                <form onSubmit={handleSubmit} className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="UK">United Kingdom</option>
                        {/* Add more countries as needed */}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-xl mb-8">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                      <CreditCard className="h-6 w-6" />
                      Payment Method
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex items-center bg-white p-4 rounded-lg">
                        <input
                          type="radio"
                          id="credit"
                          name="paymentMethod"
                          value="credit"
                          checked={formData.paymentMethod === 'credit'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="credit" className="ml-3 flex-1 block text-sm font-medium text-gray-700">
                          Credit Card
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                          <div className="w-8 h-5 bg-gray-200 rounded-sm"></div>
                        </div>
                      </div>
                      
                      <div className="flex items-center bg-white p-4 rounded-lg">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <label htmlFor="paypal" className="ml-3 flex-1 block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                        <div className="w-12 h-8 bg-blue-100 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-green-300/50 font-bold text-lg flex items-center justify-center gap-3"
                  >
                    <Lock className="h-5 w-5" />
                    Complete Purchase
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-3xl shadow-2xl border border-green-100 overflow-hidden sticky top-6 backdrop-blur-sm">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <ShoppingCart className="h-6 w-6" />
                    Order Summary
                  </h2>
                </div>
                
                <div className="p-6">
                  {/* Cart Items */}
                  <div className="mb-6 space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-green-50 rounded-lg transition-colors">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.name}</h3>
                          <p className="text-sm text-gray-600">${item.price.toFixed(2)} × {item.quantity}</p>
                        </div>
                        <div className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-2">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-r-xl hover:from-green-600 hover:to-emerald-700 transition-colors font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage && (
                      <p className={`mt-2 text-sm ${discount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {couponMessage}
                      </p>
                    )}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">Free Shipping</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Enjoy free standard shipping on all orders. Delivery in 3-5 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;