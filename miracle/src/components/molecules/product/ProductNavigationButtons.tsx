import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart } from 'lucide-react';

interface ProductNavigationButtonsProps {
  onGoBack?: () => void;
  showCartButton?: boolean;
  cartItemCount?: number;
  onViewCart?: () => void;
}

const ProductNavigationButtons: React.FC<ProductNavigationButtonsProps> = ({
  onGoBack,
  showCartButton = true,
  cartItemCount = 0,
  onViewCart
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      navigate(-1);
    }
  };

  const handleViewCart = () => {
    if (onViewCart) {
      onViewCart();
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={handleGoBack}
        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
        Go Back
      </button>
      
      {showCartButton && (
        <button
          onClick={handleViewCart}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          View Cart
          {cartItemCount > 0 && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
              {cartItemCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default ProductNavigationButtons;
