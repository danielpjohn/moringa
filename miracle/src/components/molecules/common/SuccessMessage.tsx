interface SuccessMessageProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  className?: string;
}

const SuccessMessage = ({
  title,
  message,
  buttonText,
  onButtonClick,
  className = ""
}: SuccessMessageProps) => {
  return (
    <div className={`min-h-screen bg-gray-50 py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-lg text-gray-600 mb-8">{message}</p>
          <button
            onClick={onButtonClick}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
