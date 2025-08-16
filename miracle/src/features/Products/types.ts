//types.ts
export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  category: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image?: string;
  is_active: boolean;
  created_at: string;
}