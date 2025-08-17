export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  image: string | null;
  is_active: boolean;
  category?: Category;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category_id: number | null;
  image: File | null;
  is_active: boolean;
}

export type ProductFormFields = Array<{
  name: keyof ProductFormData;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: Array<{ value: number; label: string }>;
}>;