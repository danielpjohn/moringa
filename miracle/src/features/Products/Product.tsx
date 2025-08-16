import React, { useState, useEffect } from 'react';
import type { Product as ProductType } from './types';
import { fetchProducts, addToCart, type CartItem } from './api';
import Navbar from '../Navbar/navbar';

const Product: React.FC = () => {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [addingToCart, setAddingToCart] = useState<number | null>(null);

    useEffect(() => {
        const loadCartFromStorage = () => {
            try {
                const savedCart = localStorage.getItem('guestCart');
                if (savedCart) {
                    const parsedCart = JSON.parse(savedCart);
                    const validCartItems = Array.isArray(parsedCart)
                        ? parsedCart.filter(item => 
                            item && 
                            typeof item === 'object' &&
                            item.product &&
                            typeof item.product.id === 'number' &&
                            typeof item.quantity === 'number' &&
                            item.quantity > 0
                        )
                        : [];
                    setCartItems(validCartItems);
                }
            } catch (error) {
                console.error('Error loading cart:', error);
                setCartItems([]);
            }
        };
        loadCartFromStorage();
    }, []);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError(err instanceof Error ? err.message : 'Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const updateCart = (newCart: CartItem[]) => {
        const validCart = newCart.filter(item => 
            item && 
            item.product && 
            typeof item.quantity === 'number' && 
            item.quantity > 0
        );
        setCartItems(validCart);
        localStorage.setItem('guestCart', JSON.stringify(validCart));
    };

    const handleAddToCart = async (productId: number) => {
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error('Product not found:', productId);
            return;
        }

        setAddingToCart(productId);
        try {
            const accessToken = localStorage.getItem('access_token');

            if (accessToken) {
                // Add to server cart if logged in
                const newCartItem = await addToCart(productId, 1, accessToken);
                
                // Update local state
                const existingItemIndex = cartItems.findIndex(
                    item => item.product?.id === productId
                );
                let newCart = [...cartItems];

                if (existingItemIndex >= 0) {
                    newCart[existingItemIndex].quantity += 1;
                } else {
                    newCart.push(newCartItem);
                }

                updateCart(newCart);
            } else {
                // Add to guest cart if not logged in
                const existingItemIndex = cartItems.findIndex(
                    item => item.product?.id === productId
                );
                let newCart = [...cartItems];

                if (existingItemIndex >= 0) {
                    newCart[existingItemIndex].quantity += 1;
                } else {
                    newCart.push({
                        id: Date.now(),
                        product,
                        quantity: 1,
                        addedAt: new Date().toISOString()
                    });
                }

                updateCart(newCart);
            }
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setError('Failed to add item to cart. Please try again.');
        } finally {
            setAddingToCart(null);
        }
    };

    const handleRemoveFromCart = (productId: number) => {
        const existingItemIndex = cartItems.findIndex(item => item.product?.id === productId);
        if (existingItemIndex === -1) return;

        let newCart = [...cartItems];
        if (newCart[existingItemIndex].quantity > 1) {
            newCart[existingItemIndex].quantity -= 1;
        } else {
            newCart = newCart.filter(item => item.product?.id !== productId);
        }

        updateCart(newCart);
    };

    const getProductQuantityInCart = (productId: number): number => {
        const item = cartItems.find(item => item.product?.id === productId);
        return item?.quantity || 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
                <div className="flex justify-center items-center h-96">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="animate-pulse w-6 h-6 bg-emerald-600 rounded-full"></div>
                        </div>
                    </div>
                    <p className="ml-4 text-xl text-gray-700 font-medium">Loading products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-4">
                <div className="max-w-md mx-auto mt-20">
                    <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-6">
                        <div className="flex items-center mb-4">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-lg">!</span>
                                </div>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-red-800">Error Loading Products</h3>
                            </div>
                        </div>
                        <p className="text-red-700 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full px-4 py-2 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <><Navbar />
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
            {/* Header Section */}
            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-2">
                                Our Products
                            </h1>
                            <p className="text-gray-600">Eco-friendly products for a sustainable lifestyle</p>
                        </div>
                        {cartItems.length > 0 && (
                            <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-full px-4 py-2 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow">
                                <span className="text-emerald-800 font-semibold">
                                    🛒 {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Products Grid */}
            <main className="container mx-auto px-4 py-8">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🌿</div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Collection is Growing</h2>
                        <p className="text-gray-500">New products coming soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.map((product) => {
                            const quantityInCart = getProductQuantityInCart(product.id);
                            const isAddingThis = addingToCart === product.id;

                            return (
                                <article
                                    key={product.id}
                                    className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-emerald-100"
                                >
                                    {/* Product Image */}
                                    <div className="relative h-60 bg-gradient-to-br from-gray-50 to-gray-100">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <div className="text-4xl text-gray-300">🌱</div>
                                            </div>
                                        )}

                                        {quantityInCart > 0 && (
                                            <div className="absolute top-3 right-3 bg-gradient-to-br from-emerald-500 to-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-md">
                                                {quantityInCart}
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details */}
                                    <div className="p-5">
                                        <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                                            {product.name}
                                        </h2>

                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {product.description || 'No description available'}
                                        </p>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                                                ${typeof product.price === 'number'
                                                    ? product.price.toFixed(2)
                                                    : Number(product.price).toFixed(2)}
                                            </div>

                                            {quantityInCart > 0 ? (
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveFromCart(product.id);
                                                        } }
                                                        className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-red-100 to-rose-100 text-red-600 rounded-lg hover:from-red-200 hover:to-rose-200 transition-all shadow-sm hover:shadow-md"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-sm font-medium text-gray-700 min-w-[20px] text-center">
                                                        {quantityInCart}
                                                    </span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleAddToCart(product.id);
                                                        } }
                                                        disabled={isAddingThis}
                                                        className="w-9 h-9 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 rounded-lg hover:from-emerald-200 hover:to-green-200 transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                                                    >
                                                        {isAddingThis ? (
                                                            <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                                                        ) : '+'}
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddToCart(product.id)}
                                                    disabled={isAddingThis}
                                                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all 
                                                        ${isAddingThis
                                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                            : 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'}`}
                                                >
                                                    {isAddingThis ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                                            Adding...
                                                        </div>
                                                    ) : 'Add to Cart'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                )}
            </main>
        </div></>
    );
};

export default Product;