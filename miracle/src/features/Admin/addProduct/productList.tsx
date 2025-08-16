// src/features/Admin/addProduct/ProductList.tsx
import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from './api/productApi';
import type { Product } from './types/product';

interface ProductListProps {
  onEdit: (product: Product) => void;
  refreshKey: number;
}

const ProductList = ({ onEdit, refreshKey }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError('Failed to delete product');
      }
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="bg-white rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Product Inventory</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {products.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No products found</div>
        ) : (
          products.map(product => (
            <div key={product.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-start">
                {product.image && (
                  <div className="flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden mr-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">${product.price} • {product.stock} in stock</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex space-x-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="p-2 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50 transition-colors duration-200"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;