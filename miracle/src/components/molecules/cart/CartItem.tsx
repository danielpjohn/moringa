import React from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  quantity,
  image,
  stock,
  onRemove,
  onUpdateQuantity
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= stock) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-100">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3 className="line-clamp-1">{name}</h3>
          <p className="ml-4">${(price * quantity).toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-500">${price.toFixed(2)} each</p>
        
        <div className="mt-2 flex items-center">
          <div className="flex items-center border border-gray-200 rounded-lg">
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 py-1 text-gray-500 hover:text-gray-700"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm w-8 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= stock}
              className={`px-2 py-1 text-gray-500 ${quantity >= stock ? 'opacity-50 cursor-not-allowed' : 'hover:text-gray-700'}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <button
            type="button"
            onClick={() => onRemove(id)}
            className="ml-4 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
