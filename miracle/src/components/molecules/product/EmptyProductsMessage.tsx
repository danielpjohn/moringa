import React from 'react';

interface EmptyProductsMessageProps {
  title?: string;
  message?: string;
  icon?: string;
}

const EmptyProductsMessage: React.FC<EmptyProductsMessageProps> = ({
  title = "Our Collection is Growing",
  message = "New products coming soon!",
  icon = "🌿"
}) => {
  return (
    <div className="text-center py-20">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-500">{message}</p>
    </div>
  );
};

export default EmptyProductsMessage;
