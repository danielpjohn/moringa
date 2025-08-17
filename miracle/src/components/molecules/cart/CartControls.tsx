import React from 'react';

interface CartControlsProps {
  productId: number;
  quantityInCart: number;
  isAdding: boolean;
  onAddToCart: (productId: number) => void;
  onRemoveFromCart: (productId: number) => void;
}

const CartControls: React.FC<CartControlsProps> = ({
  productId,
  quantityInCart,
  isAdding,
  onAddToCart,
  onRemoveFromCart
}) => {
  if (quantityInCart > 0) {
    return (
      <div className="flex items-center space-x-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemoveFromCart(productId);
          }}
          className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-100 text-red-600 rounded-lg hover:from-red-200 hover:to-rose-200 transition-all shadow-sm hover:shadow-md"
        >
          -
        </button>
        <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
          {quantityInCart}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(productId);
          }}
          disabled={isAdding}
          className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 rounded-lg hover:from-emerald-200 hover:to-green-200 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
        >
          {isAdding ? (
            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          ) : '+'}
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => onAddToCart(productId)}
      disabled={isAdding}
      className={`px-4 py-2 rounded-lg font-medium text-sm transition-all 
        ${isAdding
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'}`}
    >
      {isAdding ? (
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          Adding...
        </div>
      ) : 'Add to Cart'}
    </button>
  );
};

export default CartControls;
