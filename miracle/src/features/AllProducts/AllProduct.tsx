import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Search, Loader2, AlertCircle } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from "../Navbar/navbar";

const API_BASE_URL = 'http://127.0.0.1:8000';

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image: string | null;
  is_active: boolean;
  created_at: string;
  category: number;
}

const ProductCard: React.FC<{
  product: Product;
  categories: Category[];
  onAddToCart: (product: Product, quantity: number) => void;
}> = ({ product, categories, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const category = categories.find(cat => cat.id === product.category);
  const price = parseFloat(product.price);

  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) {
      return "https://via.placeholder.com/400x400/f0f9ff/059669?text=Product+Image";
    }

    if (imagePath.startsWith('http')) {
      return imagePath;
    }

    if (imagePath.startsWith('/')) {
      return `${API_BASE_URL}${imagePath}`;
    }

    return `${API_BASE_URL}/${imagePath}`;
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await onAddToCart(product, quantity);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 w-full max-w-sm mx-auto overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.stock > 0 && product.stock <= 5 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Low Stock
          </span>
        </div>
      )}

      {product.stock === 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            Out of Stock
          </span>
        </div>
      )}

      <button
        onClick={() => setIsLiked(!isLiked)}
        className={`absolute top-12 right-3 z-10 p-2 rounded-full transition-all duration-300 ${
          isLiked
            ? 'bg-red-500 text-white shadow-lg'
            : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-red-500 hover:text-white'
        } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      >
        <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
      </button>

      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          <img
            src={getImageUrl(product.image)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400/f0f9ff/059669?text=Product+Image";
            }}
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
          <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded-full">
            {category?.name || 'Uncategorized'}
          </span>
        </div>

        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center bg-gray-50 rounded-full border border-gray-200">
            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors duration-200 rounded-full"
              disabled={product.stock === 0}
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-semibold text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
              className="w-8 h-8 flex items-center justify-center hover:bg-green-100 hover:text-green-600 transition-colors duration-200 rounded-full"
              disabled={product.stock === 0}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || !product.is_active || isAddingToCart}
          className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform ${
            product.stock === 0 || !product.is_active
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isAddingToCart ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart size={18} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="w-8 h-8 animate-spin text-green-600" />
    <span className="ml-2 text-gray-600">Loading products...</span>
  </div>
);

const ErrorMessage: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-12">
    <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
    <p className="text-gray-600 text-center mb-4">{message}</p>
    <button
      onClick={onRetry}
      className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors"
    >
      Try Again
    </button>
  </div>
);

const AllProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/categories/`);
        if (!response.ok) throw new Error('Failed to load categories');
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = `${API_BASE_URL}/products/`;
        if (selectedCategory !== 'All') {
          url = `${API_BASE_URL}/products-by-category/${encodeURIComponent(selectedCategory)}/`;
        }

        const params = new URLSearchParams();
        if (debouncedSearchTerm) params.append('search', debouncedSearchTerm);
        if (sortBy === 'price_asc') params.append('ordering', 'price');
        if (sortBy === 'price_desc') params.append('ordering', '-price');
        if (sortBy === 'newest') params.append('ordering', '-created_at');

        const response = await fetch(`${url}?${params.toString()}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(Array.isArray(data) ? data : data.results || []);
        setTotalCount(Array.isArray(data) ? data.length : data.count || 0);
      } catch (err) {
        console.error('Error loading products:', err);
        setError('Failed to load products. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  const handleAddToCart = async (product: Product, quantity: number) => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      toast.info('Please login to add items to your cart');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cart/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`
        },
        body: JSON.stringify({
          product: product.id,
          quantity: quantity
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/login');
          toast.info('Please login to add items to your cart');
          return;
        }
        throw new Error('Failed to add to cart');
      }

      toast.success(`Added ${quantity} ${product.name}(s) to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart. Please try again.');
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortBy("name");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                Our <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">Products</span>
              </h1>
              <p className="text-lg text-gray-600">
                Discover premium natural health products for your wellness journey
              </p>
              <div className="mt-2 text-sm text-gray-500">
                {loading ? 'Loading...' : `Showing ${products.length} of ${totalCount} products`}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === "All"
                      ? 'bg-green-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`px-4 py-2 rounded-full font-medium transition-colors ${
                      selectedCategory === category.name
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>

          {loading && <LoadingSpinner />}

          {error && <ErrorMessage message={error} onRetry={handleRetry} />}

          {!loading && !error && (
            <>
              {products.length > 0 ? (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      categories={categories}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}

          <div className="flex justify-between mt-12">
            <button
              onClick={() => navigate(-1)}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Go Back
            </button>
            <Link
              to="/cart"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              View Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;