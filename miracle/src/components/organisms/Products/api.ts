import { API_ENDPOINTS } from "../../../constants/api";

// Types
export interface ProductSummary {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  image?: string;
}

// Ensure we always have an absolute image URL for cart items
function normalizeImageUrl(image?: string | null): string | undefined {
  if (!image) return undefined;
  if (/^https?:\/\//i.test(image)) return image;
  const path = image.startsWith('/') ? image : `/${image}`;
  return `${API_ENDPOINTS.BASE_URL}${path}`;
}

// Fetch cart for unauthenticated users using session cookie
export async function fetchCartSession(): Promise<CartItem[]> {
  const res = await fetch(`${CART_BASE}/`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error(`Failed to fetch cart (session): ${res.status}`);
  const data = await res.json();
  const rawItems = Array.isArray(data) ? data : (data?.items || []);
  return rawItems.map((item: any) => {
    const pd = item.product_details || item.product || null;
    const id = Number(item.id ?? item.product_id);
    const name = pd?.name ?? item.product_name ?? "";
    const description = pd?.description ?? item.description ?? "";
    const price = Number(pd?.price ?? item.price) || 0;
    const image = normalizeImageUrl(pd?.image ?? item.image);
    const productId = Number(pd?.id ?? item.product_id ?? id) || 0;
    return {
      id: Number(id),
      quantity: Math.max(1, Number(item.quantity) || 1),
      product: { id: productId, name, description, price, image },
    } as CartItem;
  });
}

export interface CartItem {
  id: number;
  product: ProductSummary;
  quantity: number;
}

// Local storage key for guest cart
const STORAGE_KEY = "guest_cart";

// Guest cart helpers
export function getGuestCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    // Basic validation/normalization
    return Array.isArray(parsed)
      ? parsed.map((item) => ({
          id: Number(item.id),
          quantity: Math.max(1, Number(item.quantity) || 1),
          product: {
            id: Number(item.product?.id) || 0,
            name: item.product?.name ?? "Unnamed",
            description: item.product?.description ?? "",
            price: Number(item.product?.price) || 0,
            image: normalizeImageUrl(item.product?.image),
          },
        }))
      : [];
  } catch {
    return [];
  }
}

export function saveGuestCart(items: CartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Ignore storage errors
  }
}

// Server helpers (best-effort; will gracefully fail so caller can fallback)
const CART_BASE = `${API_ENDPOINTS.BASE_URL}/cart`;

export async function fetchCart(accessToken: string): Promise<CartItem[]> {
  try {
    const res = await fetch(`${CART_BASE}/`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`Failed to fetch cart: ${res.status}`);
    const data = await res.json();

    // Normalize both authenticated and guest shapes
    // Authenticated (CartSerializer): { items: [{ id, product, product_details{ id,name,description,price,image }, quantity, ... }], ... }
    // Guest fallback (custom): { items: [{ id, product_id, product_name, quantity, price, image, description }], ... }
    const rawItems = Array.isArray(data) ? data : (data?.items || []);
    const items: CartItem[] = rawItems.map((item: any) => {
      const pd = item.product_details || item.product || null;
      const id = Number(item.id ?? item.product_id);
      const name = pd?.name ?? item.product_name ?? "";
      const description = pd?.description ?? item.description ?? "";
      const price = Number(pd?.price ?? item.price) || 0;
      const image = normalizeImageUrl(pd?.image ?? item.image);
      const productId = Number(pd?.id ?? item.product_id ?? id) || 0;

      return {
        id: Number(id),
        quantity: Math.max(1, Number(item.quantity) || 1),
        product: {
          id: productId,
          name,
          description,
          price,
          image,
        },
      };
    });

    return items;
  } catch (err) {
    // Let caller decide fallback to guest cart
    throw err;
  }
}

export async function removeFromCart(itemId: number, accessToken: string): Promise<void> {
  try {
    const res = await fetch(`${CART_BASE}/${itemId}/`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) throw new Error(`Failed to remove item: ${res.status}`);
  } catch (err) {
    // Surface error to caller (cart.tsx already handles and shows error)
    throw err;
  }
}

export async function updateCartItem(itemId: number, quantity: number, accessToken: string): Promise<void> {
  try {
    const res = await fetch(`${CART_BASE}/${itemId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity }),
    });
    if (!res.ok) throw new Error(`Failed to update item: ${res.status}`);
  } catch (err) {
    throw err;
  }
}

// Add a product to the cart
export async function addToCart(productId: number, quantity: number, accessToken: string): Promise<void> {
  try {
    const res = await fetch(`${CART_BASE}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      // Backend expects { product: <id>, quantity }
      body: JSON.stringify({ product: productId, quantity }),
    });
    if (!res.ok) throw new Error(`Failed to add item: ${res.status}`);
  } catch (err) {
    throw err;
  }
}

// Add for unauthenticated session cart
export async function addToCartSession(productId: number, quantity: number): Promise<void> {
  const res = await fetch(`${CART_BASE}/`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId, quantity }),
  });
  if (!res.ok) throw new Error(`Failed to add item (session): ${res.status}`);
}

// Update quantity for unauthenticated session cart using product id as pk
export async function updateCartItemSession(productId: number, quantity: number): Promise<void> {
  const res = await fetch(`${CART_BASE}/${productId}/`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity, product: productId }),
  });
  if (!res.ok) throw new Error(`Failed to update item (session): ${res.status}`);
}

// Remove item for unauthenticated session cart using product id as pk
export async function removeFromCartSession(productId: number): Promise<void> {
  const res = await fetch(`${CART_BASE}/${productId}/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ product: productId }),
  });
  if (!res.ok) throw new Error(`Failed to remove item (session): ${res.status}`);
}

// Resolve server cart item id by product id (authenticated only)
export async function getServerCartItemIdByProduct(productId: number, accessToken: string): Promise<number | null> {
  const items = await fetchCart(accessToken);
  const found = items.find((i) => Number(i.product.id) === Number(productId));
  return found ? Number(found.id) : null;
}

// Best-effort sync of guest cart to server for an authenticated user
export async function syncGuestCart(accessToken: string): Promise<void> {
  const items = getGuestCart();
  if (!items.length) return;
  for (const item of items) {
    try {
      await addToCart(Number(item.product.id), Number(item.quantity), accessToken);
    } catch {
      // continue best-effort
    }
  }
  // Clear guest cart after sync
  saveGuestCart([]);
}
