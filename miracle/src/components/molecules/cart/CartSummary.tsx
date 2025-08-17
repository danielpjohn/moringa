import React from 'react';
import { ShoppingBag } from 'lucide-react';
import CheckoutButton from '../checkout/CheckoutButton';

interface CartSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  itemCount: number;
  onCheckout: () => void;
  isLoading?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subtotal,
  shipping,
  tax,
  total,
  itemCount,
  onCheckout,
  isLoading = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
        <ShoppingBag className="h-6 w-6 text-green-600 mr-2" />
        Order Summary
      </h2>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>{itemCount} {itemCount === 1 ? 'item' : 'items'}</span>
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
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-6">
          <CheckoutButton
            onClick={onCheckout}
            isDisabled={itemCount === 0 || isLoading}
            isLoading={isLoading}
            buttonText={itemCount === 0 ? 'Your cart is empty' : 'Proceed to checkout'}
            className="w-full"
          />
        </div>
        
        <p className="mt-4 text-center text-sm text-gray-500">
          or{' '}
          <button
            type="button"
            className="font-medium text-green-600 hover:text-green-500"
            onClick={() => {}}
          >
            Continue Shopping
          </button>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
