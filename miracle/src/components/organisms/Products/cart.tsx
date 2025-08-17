import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/navbar';
import {
    fetchCart,
    fetchCartSession,
    saveGuestCart,
    getGuestCart,
    type CartItem,
    removeFromCart,
    updateCartItem,
    updateCartItemSession,
    removeFromCartSession,
} from './api.ts';
import { useAuth } from '../Login/AuthContext';

const Cart: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [updatingItem, setUpdatingItem] = useState<number | null>(null);
    const [removingItem, setRemovingItem] = useState<number | null>(null);

    useEffect(() => {
        const loadCart = async () => {
            try {
                setLoading(true);
                setError(null);

                const accessToken = localStorage.getItem('access_token');
                let loadedItems: CartItem[] = [];

                if (accessToken) {
                    try {
                        loadedItems = await fetchCart(accessToken);
                    } catch (serverError) {
                        console.error('Failed to fetch server cart:', serverError);
                        // fallback to session (if server supports session with auth) else guest
                        try {
                            loadedItems = await fetchCartSession();
                        } catch {
                            loadedItems = getGuestCart();
                        }
                    }
                } else {
                    // Guest: prefer session cart if it has items; otherwise fallback to local guest cart
                    try {
                        const sessionItems = await fetchCartSession();
                        loadedItems = Array.isArray(sessionItems) && sessionItems.length > 0
                            ? sessionItems
                            : getGuestCart();
                    } catch (e) {
                        loadedItems = getGuestCart();
                    }
                }

                // Validate all cart items
                const validItems = loadedItems
                    .map(item => {
                        try {
                            return {
                                ...item,
                                product: {
                                    ...item.product,
                                    price: Number(item.product.price) || 0
                                }
                            };
                        } catch (e) {
                            console.error('Invalid cart item:', item);
                            return null;
                        }
                    })
                    .filter(item => item !== null) as CartItem[];

                setCartItems(validItems);
                // Mirror current view into local guest cart so Checkout can read it too
                saveGuestCart(validItems);
            } catch (error) {
                console.error('Failed to load cart:', error);
                setError('Failed to load your cart. Please try again.');
                setCartItems([]);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    const handleRemove = async (itemId: number) => {
        try {
            setRemovingItem(itemId);
            const accessToken = localStorage.getItem('access_token');

            if (accessToken) {
                await removeFromCart(itemId, accessToken);
            } else {
                // For session cart, the identifier is product id
                const item = cartItems.find(ci => ci.id === itemId);
                if (item) {
                    try { await removeFromCartSession(Number(item.product.id)); } catch {}
                }
            }

            const updatedItems = cartItems.filter(item => item.id !== itemId);
            setCartItems(updatedItems);
            saveGuestCart(updatedItems);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to remove item';
            setError(errorMessage);
        } finally {
            setRemovingItem(null);
        }
    };

    const handleQuantityChange = async (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) {
            handleRemove(itemId);
            return;
        }

        try {
            setUpdatingItem(itemId);
            const accessToken = localStorage.getItem('access_token');
            let updatedItems: CartItem[];

            if (accessToken) {
                await updateCartItem(itemId, newQuantity, accessToken);
                updatedItems = cartItems.map(item =>
                    item.id === itemId ? { ...item, quantity: newQuantity } : item
                );
            } else {
                // For session cart, call session update using product id
                const item = cartItems.find(ci => ci.id === itemId);
                if (item) {
                    try { await updateCartItemSession(Number(item.product.id), newQuantity); } catch {}
                }
                updatedItems = cartItems.map(ci =>
                    ci.id === itemId ? { ...ci, quantity: newQuantity } : ci
                );
            }

            setCartItems(updatedItems);
            saveGuestCart(updatedItems);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update quantity';
            setError(errorMessage);
        } finally {
            setUpdatingItem(null);
        }
    };

    const calculateSubtotal = (): number => {
        return cartItems.reduce(
            (total, item) => total + (Number(item.product.price) * item.quantity),
            0
        );
    };

    const calculateTax = (subtotal: number): number => {
        return subtotal * 0.08;
    };

    const calculateTotal = (): number => {
        const subtotal = calculateSubtotal();
        const tax = calculateTax(subtotal);
        return subtotal + tax;
    };

    const getTotalItems = (): number => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your entire cart?')) {
            setCartItems([]);
            saveGuestCart([]);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-96">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <div className="animate-pulse w-6 h-6 bg-green-600 rounded-full"></div>
                            </div>
                        </div>
                        <p className="ml-4 text-xl text-gray-700 font-medium">Loading your cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-4">
                <div className="container mx-auto">
                    <div className="max-w-md mx-auto mt-20">
                        <div className="bg-white rounded-xl shadow-lg border-l-4 border-red-500 p-6">
                            <div className="flex items-center mb-4">
                                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                                    <span className="text-red-600 font-bold text-lg">!</span>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-red-800">Cart Error</h3>
                                </div>
                            </div>
                            <p className="text-red-700 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <><Navbar /><div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                Shopping Cart
                            </h1>
                            <p className="text-gray-600">
                                {cartItems.length === 0
                                    ? 'Your cart is waiting for some amazing products!'
                                    : `${getTotalItems()} item${getTotalItems() !== 1 ? 's' : ''} ready for checkout`}
                            </p>
                        </div>

                        {cartItems.length > 0 && (
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {cartItems.length === 0 ? (
                    // Empty cart state
                    <div className="text-center py-16">
                        <div className="text-8xl mb-6">🛒</div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            Discover our amazing products and add some to your cart!
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
                        >
                            🛍️ Start Shopping
                        </Link>
                    </div>
                ) : (
                    // Cart with items
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-800">
                                        Cart Items ({getTotalItems()})
                                    </h2>
                                </div>

                                {cartItems.map((item) => (
                                    <div key={item.id} className={`
                                        border-b last:border-b-0 p-6 transition-all duration-300
                                        ${removingItem === item.id ? 'bg-red-50 opacity-50' : 'hover:bg-gray-50'}
                                    `}>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            {/* Product Image */}
                                            <div className="flex-shrink-0">
                                                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                                    {item.product.image ? (
                                                        <img
                                                            src={item.product.image}
                                                            alt={item.product.name}
                                                            className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center">
                                                            <span className="text-gray-400 text-2xl">📦</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-grow min-w-0">
                                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {item.product.description || 'No description available'}
                                                </p>
                                                <div className="text-lg font-bold text-green-600">
                                                    ${Number(item.product.price).toFixed(2)} each
                                                </div>
                                            </div>

                                            {/* Quantity Controls and Price */}
                                            <div className="flex-shrink-0 flex flex-col items-end justify-between">
                                                <div className="flex items-center space-x-4">
                                                    {/* Quantity Selector */}
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                            disabled={updatingItem === item.id || item.quantity <= 1}
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="px-4 py-2 bg-gray-50 min-w-[3rem] text-center font-semibold">
                                                            {updatingItem === item.id ? (
                                                                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                                            ) : (
                                                                item.quantity
                                                            )}
                                                        </span>
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                            disabled={updatingItem === item.id}
                                                            className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Item Total */}
                                                    <div className="text-lg font-bold text-gray-800 min-w-[6rem] text-right">
                                                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                                                    </div>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    disabled={removingItem === item.id}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium disabled:opacity-50 mt-2"
                                                >
                                                    {removingItem === item.id ? (
                                                        <div className="flex items-center">
                                                            <div className="w-3 h-3 border-2 border-red-600 border-t-transparent rounded-full animate-spin mr-1"></div>
                                                            Removing...
                                                        </div>
                                                    ) : (
                                                        '🗑️ Remove'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>

                            <div className="space-y-4">
                                {/* Item breakdown */}
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.id} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {item.product.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                ${(Number(item.product.price) * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t pt-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Tax (8%)</span>
                                        <span className="font-semibold">${calculateTax(calculateSubtotal()).toFixed(2)}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span className="font-semibold text-green-600">Free 🚚</span>
                                    </div>

                                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-green-600">${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-3">
                                <button
                                    className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 font-semibold text-lg"
                                    onClick={() => navigate('/checkout')}
                                >
                                    {isAuthenticated ? '🛒 Checkout' : '🛒 Checkout as Guest'}
                                </button>

                                <Link
                                    to="/products"
                                    className="block w-full px-6 py-3 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-xl transition-colors font-medium text-center"
                                >
                                    ← Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recommendations Section */}
                {cartItems.length > 0 && (
                    <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">
                            💡 You might also like
                        </h3>
                        <div className="text-center py-8 text-gray-500">
                            <div className="text-4xl mb-4">🎯</div>
                            <p>Product recommendations would appear here based on your cart items!</p>
                        </div>
                    </div>
                )}
            </div>
        </div></>
    );
};

export default Cart;