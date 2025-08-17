import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface CheckoutPageHeaderProps {
  title: string;
  description: string;
}

const CheckoutPageHeader: React.FC<CheckoutPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-8">
      <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100 mb-4">
        <ShoppingBag className="h-8 w-8 text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CheckoutPageHeader;
