import axios from 'axios';
import type { Category, Product, ProductFormData, ProductFormFields } from '../types/product';


const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (formData: FormData): Promise<Product> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const updateProduct = async (id: number, formData: FormData): Promise<Product> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}/`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Export types for external use
export type { Product, Category, ProductFormData, ProductFormFields };