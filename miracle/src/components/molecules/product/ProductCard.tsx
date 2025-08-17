import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description?: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
  };
  inCart?: boolean;
  quantity?: number;
  onAdd: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, inCart = false, quantity = 1, onAdd, onIncrement, onDecrement }) => {

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition-shadow">
      <div className="bg-gray-100 group-hover:opacity-95 h-64 sm:h-72 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-base font-semibold text-gray-900">
          <Link to={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex flex-1 flex-col justify-end">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-xs text-gray-500">{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</p>
            {inCart ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDecrement(product.id); }} className="px-2 py-1 text-gray-700 hover:bg-gray-100">−</button>
                  <span className="w-12 text-center text-sm py-1 select-none">{quantity}</span>
                  <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onIncrement(product.id); }} className="px-2 py-1 text-gray-700 hover:bg-gray-100">+</button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(product.id); }}
                className="flex items-center justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
