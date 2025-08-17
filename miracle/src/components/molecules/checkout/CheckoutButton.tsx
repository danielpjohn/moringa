import React from 'react';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  buttonText?: string;
  loadingText?: string;
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
  isLoading = false,
  isDisabled = false,
  onClick,
  buttonText = 'Place Order',
  loadingText = 'Processing...',
  className = ''
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading || isDisabled}
      className={`w-full flex justify-center items-center py-4 px-6 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5 mr-2" />
          {loadingText}
        </>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default CheckoutButton;
