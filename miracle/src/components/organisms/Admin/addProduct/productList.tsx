// src/features/Admin/addProduct/ProductList.tsx
import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from './api/productApi';
import type { Product } from './types/product';
import { ProductListItem } from '../../../molecules/admin';

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
            <ProductListItem 
              key={product.id} 
              product={product} 
              onEdit={onEdit} 
              onDelete={handleDelete} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;