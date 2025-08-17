interface LoadingButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
  loadingText: string;
  children: React.ReactNode;
  className?: string;
}

const LoadingButton = ({
  onClick,
  isLoading,
  disabled = false,
  loadingText,
  children,
  className = ""
}: LoadingButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium ${className}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
