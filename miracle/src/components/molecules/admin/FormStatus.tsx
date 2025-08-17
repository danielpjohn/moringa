import React from 'react';

interface FormStatusProps {
  type: 'success' | 'error';
  message: string;
}

const FormStatus: React.FC<FormStatusProps> = ({ type, message }) => {
  if (!message) return null;

  const isSuccess = type === 'success';

  const wrapperClasses = isSuccess
    ? 'bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-emerald-500'
    : 'bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500';

  const iconWrapperClasses = isSuccess ? 'bg-emerald-500' : 'bg-red-500';
  const textClasses = isSuccess ? 'text-emerald-800' : 'text-red-700';

  const icon = isSuccess ? (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  return (
    <div className={`mb-6 p-4 rounded-lg flex items-center ${wrapperClasses}`}>
      <div className={`p-2 rounded-full mr-3 ${iconWrapperClasses}`}>
        {icon}
      </div>
      <span className={`font-medium ${textClasses}`}>{message}</span>
    </div>
  );
};

export default FormStatus;
