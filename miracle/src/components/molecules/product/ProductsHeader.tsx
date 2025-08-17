import React from 'react';

interface ProductsHeaderProps {
  title: string;
  subtitle: string;
  cartItemCount?: number;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ 
  title, 
  subtitle, 
  cartItemCount = 0 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
              {title}
            </h1>
            <p className="text-gray-600">{subtitle}</p>
          </div>
          {cartItemCount > 0 && (
            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full px-4 py-2 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-emerald-800 font-semibold">
                🛒 {cartItemCount} items
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ProductsHeader;
