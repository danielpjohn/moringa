import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/navbar';
import LoadingSpinner from '../../molecules/common/LoadingSpinner';
import ErrorDisplay from '../../molecules/common/ErrorDisplay';
import ProductsHeader from '../../molecules/product/ProductsHeader';
import ProductCard from '../../molecules/product/ProductCard';
import EmptyProductsMessage from '../../molecules/product/EmptyProductsMessage';
import { API_ENDPOINTS } from '../../../constants/api';
import {
    addToCart as addToCartApi,
    addToCartSession,
    updateCartItem,
    removeFromCart,
    updateCartItemSession,
    removeFromCartSession,
    getServerCartItemIdByProduct,
    getGuestCart,
    saveGuestCart
} from './api';
import { useAuth } from '../Login/AuthContext';

type UIProduct = {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    reviewCount: number;
};

// Ensure we always have an absolute image URL
function normalizeImageUrl(image: string | undefined | null): string {
    if (!image) return '';
    // If already absolute (http/https), return as is
    if (/^https?:\/\//i.test(image)) return image;
    // Ensure leading slash
    const path = image.startsWith('/') ? image : `/${image}`;
    return `${API_ENDPOINTS.BASE_URL}${path}`;
}

const Product: React.FC = () => {
    const [products, setProducts] = useState<UIProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cartIds, setCartIds] = useState<Record<string, number>>({});
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.PRODUCTS}`);
                if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
                const data = await res.json();
                const mapped: UIProduct[] = (Array.isArray(data) ? data : []).map((p: any) => ({
                    id: String(p.id),
                    name: p.name ?? 'Unnamed',
                    description: p.description ?? '',
                    price: Number(p.price) || 0,
                    image: normalizeImageUrl(p.image),
                    rating: Number(p.rating) || 4.5,
                    reviewCount: Number(p.review_count) || 0,
                }));
                setProducts(mapped);
            } catch (e) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Local per-product quantity (for dynamic controls on cards)
    const [productQty, setProductQty] = useState<Record<string, number>>({});
    // Prevent rapid double-clicks on Add causing duplicate POSTs
    const [adding, setAdding] = useState<Record<string, boolean>>({});

    const onAdd = async (productId: string) => {
        const pid = Number(productId);
        try {
            // Guard: if already adding this product, ignore subsequent clicks
            if (adding[productId]) return;
            setAdding(prev => ({ ...prev, [productId]: true }));
            if (isAuthenticated) {
                const token = localStorage.getItem('access_token') || '';
                if (token) await addToCartApi(pid, 1, token);
            } else {
                // Guest: call session API and also mirror into local storage so cart page can show items
                const items = getGuestCart();
                const ensureLocalAdd = () => {
                    const idx = items.findIndex(i => Number(i.product.id) === pid);
                    if (idx >= 0) items[idx].quantity += 1; else {
                        const p = products.find(pr => Number(pr.id) === pid) || products.find(pr => pr.id === productId);
                        if (p) items.push({ id: pid, quantity: 1, product: { id: pid, name: p.name, description: p.description, price: p.price, image: p.image } } as any);
                    }
                };
                try {
                    await addToCartSession(pid, 1);
                    ensureLocalAdd();
                } catch {
                    ensureLocalAdd();
                }
                saveGuestCart(items as any);
            }
            setProductQty(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
            setCartIds(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
        } catch {} finally {
            setAdding(prev => {
                const copy = { ...prev };
                delete copy[productId];
                return copy;
            });
        }
    };

    const onIncrement = async (productId: string) => {
        const pid = Number(productId);
        try {
            if (isAuthenticated) {
                const token = localStorage.getItem('access_token') || '';
                if (token) await addToCartApi(pid, 1, token); // increments existing
            } else {
                // Guest: increment in session and mirror to local
                const items = getGuestCart();
                const applyLocalInc = () => {
                    const idx = items.findIndex(i => Number(i.product.id) === pid);
                    if (idx >= 0) items[idx].quantity += 1; else {
                        const p = products.find(pr => Number(pr.id) === pid) || products.find(pr => pr.id === productId);
                        if (p) items.push({ id: pid, quantity: 1, product: { id: pid, name: p.name, description: p.description, price: p.price, image: p.image } } as any);
                    }
                };
                try {
                    await addToCartSession(pid, 1);
                    applyLocalInc();
                } catch {
                    applyLocalInc();
                }
                saveGuestCart(items as any);
            }
            setProductQty(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
            setCartIds(prev => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
        } catch {}
    };

    const onDecrement = async (productId: string) => {
        const pid = Number(productId);
        const current = productQty[productId] || 0;
        if (current <= 0) return;
        const nextQty = current - 1;
        try {
            if (isAuthenticated) {
                const token = localStorage.getItem('access_token') || '';
                const itemId = await getServerCartItemIdByProduct(pid, token);
                if (itemId == null) return;
                if (nextQty > 0) {
                    await updateCartItem(itemId, nextQty, token);
                } else {
                    await removeFromCart(itemId, token);
                }
            } else {
                // Guest: update session and mirror to local
                const items = getGuestCart();
                const idx = items.findIndex(i => Number(i.product.id) === pid);
                const applyLocal = () => {
                    if (idx >= 0) {
                        if (nextQty > 0) items[idx].quantity = nextQty; else items.splice(idx, 1);
                    }
                };
                try {
                    if (nextQty > 0) {
                        await updateCartItemSession(pid, nextQty);
                    } else {
                        await removeFromCartSession(pid);
                    }
                    applyLocal();
                } catch {
                    applyLocal();
                }
                saveGuestCart(items as any);
            }
            setProductQty(prev => {
                const copy = { ...prev };
                if (nextQty > 0) copy[productId] = nextQty; else delete copy[productId];
                return copy;
            });
            setCartIds(prev => {
                const copy: Record<string, number> = { ...prev };
                if (nextQty > 0) copy[productId] = nextQty; else delete copy[productId];
                return copy;
            });
        } catch {}
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
                <div className="flex items-center justify-center py-20">
                    <LoadingSpinner size="lg" />
                    <span className="ml-3 text-gray-600">Loading products...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4">
                <ErrorDisplay 
                    message={error} 
                    onRetry={() => window.location.reload()} 
                />
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50">
                <ProductsHeader 
                    title="Our Products"
                    subtitle="Eco-friendly products for a sustainable lifestyle"
                    cartItemCount={Object.values(cartIds).reduce((s, n) => s + n, 0)}
                />

                <main className="container mx-auto px-4 py-8">
                    {products.length === 0 ? (
                        <EmptyProductsMessage />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {products.map((product) => {
                                const qty = productQty[product.id] || 0;
                                return (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        inCart={qty > 0}
                                        quantity={qty || 1}
                                        onAdd={onAdd}
                                        onIncrement={onIncrement}
                                        onDecrement={onDecrement}
                                    />
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </> 
    );
};

export default Product;