import React from 'react';

interface SubmitButtonProps {
  isLoading: boolean;
  label: string;
  loadingLabel: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, label, loadingLabel, icon, onClick, type = 'submit' }) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className="w-full flex justify-center items-center py-3 px-6 font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-lg shadow-lg text-base"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingLabel}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
};

export default SubmitButton;
