import React, { useState } from 'react';
import { Plus, Minus, Tag, ArrowRight, CheckCircle } from 'lucide-react';
import CheckoutButton from './CheckoutButton';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
}

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onApplyCoupon?: (code: string) => void;
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shipping,
  tax,
  onQuantityChange,
  onRemoveItem,
  onApplyCoupon,
  className = ''
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [isPlacing, setIsPlacing] = useState(false);
  
  const total = subtotal + shipping + tax - discount;
  
  const handleCouponApply = () => {
    if (couponCode.trim() === '') return;
    
    // In a real app, you would validate the coupon code with your backend
    // For demo purposes, we'll just apply a 10% discount for any non-empty code
    const newDiscount = subtotal * 0.1; // 10% off
    setDiscount(newDiscount);
    setIsCouponApplied(true);
    onApplyCoupon?.(couponCode);
  };
  
  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setIsCouponApplied(false);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-6">
        {/* Cart Items */}
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2 -mr-2">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b border-gray-100">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                
                <div className="ml-4 flex-1">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3 className="line-clamp-1">{item.name}</h3>
                    <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                  
                  <div className="mt-2 flex items-center">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-gray-500 hover:text-gray-700"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="px-2 text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className={`px-2 py-1 text-gray-500 ${item.quantity >= item.stock ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Coupon Code */}
        <div className="border-t border-gray-200 pt-4">
          {isCouponApplied ? (
            <div className="flex items-center justify-between bg-green-50 p-3 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm text-green-700">Coupon applied! ${discount.toFixed(2)} off</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveCoupon}
                className="text-sm font-medium text-green-700 hover:text-green-800"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <button
                type="button"
                onClick={handleCouponApply}
                disabled={!couponCode.trim()}
                className={`px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-r-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition-colors ${
                  !couponCode.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Apply
              </button>
            </div>
          )}
        </div>
        
        {/* Order Totals */}
        <div className="border-t border-gray-200 pt-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 mt-2">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <CheckoutButton
              buttonText="Checkout"
              onClick={() => { setIsPlacing(true); /* integrate checkout here */ setIsPlacing(false); }}
              isDisabled={items.length === 0}
              className="w-full"
              isLoading={isPlacing}
            />
            
            <p className="mt-4 text-center text-sm text-gray-500">
              or{' '}
              <button
                type="button"
                className="font-medium text-green-600 hover:text-green-500"
                onClick={() => {}}
              >
                Continue Shopping <ArrowRight className="inline h-4 w-4" />
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
