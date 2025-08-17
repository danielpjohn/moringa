import React from 'react';

interface ProductsPageHeaderProps {
  title: string;
  description: string;
}

const ProductsPageHeader: React.FC<ProductsPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
        {title}
      </h1>
      <p className="text-gray-600 text-xl max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ProductsPageHeader;
