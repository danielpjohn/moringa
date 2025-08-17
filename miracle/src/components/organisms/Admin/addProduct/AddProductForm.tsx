import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCategories, createProduct, updateProduct } from './api/productApi';
import type { Category, Product, ProductFormData } from './types/product';
import {
  FormHeader,
  FormStatus,
  InputField,
  SelectField,
  ImageUploadField,
  SubmitButton,
  CheckboxField,
} from '../../../molecules/admin';

interface AddProductFormProps {
  onSubmitSuccess?: () => void;
  onCancel?: () => void;
  editingProduct?: Product | null;
}

const AddProductForm = ({ onSubmitSuccess, onCancel, editingProduct }: AddProductFormProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: null,
      image: null,
      is_active: true,
    },
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    if (editingProduct) {
      setValue('name', editingProduct.name);
      setValue('description', editingProduct.description);
      setValue('price', editingProduct.price.toString());
      setValue('stock', editingProduct.stock.toString());
      setValue('category_id', editingProduct.category_id);
      setValue('is_active', editingProduct.is_active);
      
      if (editingProduct.image) {
        setImagePreview(editingProduct.image);
      }
    } else {
      reset();
      setImagePreview(null);
      setImageFile(null);
    }
  }, [editingProduct, reset, setValue]);

  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    formData.append('is_active', String(data.is_active));

    if (data.category_id) {
      formData.append('category_id', data.category_id.toString());
    }

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
        setSuccess(true);
        onSubmitSuccess?.();
      } else {
        await createProduct(formData);
        setSuccess(true);
        reset();
        setImageFile(null);
        setImagePreview(null);
        onSubmitSuccess?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setValue('image', file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('image', null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-4 sm:py-8 px-0 min-[380px]:px-2 sm:px-4 lg:px-8">
      <div className="max-w-full sm:max-w-[95vw] md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto">
        <FormHeader
          title={editingProduct ? 'Edit Product' : 'Add New Product'}
          subtitle={editingProduct ? 'Update the product details below' : 'Fill out the details below to add a new product to your catalog.'}
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          }
        />

        <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/20 overflow-hidden mx-2 sm:mx-0">
          <div className="p-4">
            {error && <FormStatus type="error" message={error} />}
            {success && <FormStatus type="success" message={editingProduct ? 'Product updated successfully.' : 'Product created successfully.'} />}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              <InputField<ProductFormData>
                label="Product Name"
                name="name"
                register={register}
                required
                placeholder="Enter product name"
                error={errors.name}
              />
              <InputField<ProductFormData>
                label="Description"
                name="description"
                type="textarea"
                register={register}
                required
                placeholder="Enter product description"
                error={errors.description}
              />
              <InputField<ProductFormData>
                label="Price"
                name="price"
                type="number"
                register={register}
                required
                placeholder="Enter price"
                error={errors.price}
              />
              <InputField<ProductFormData>
                label="Stock Quantity"
                name="stock"
                type="number"
                register={register}
                required
                placeholder="Enter stock quantity"
                error={errors.stock}
              />
              <SelectField
                label="Category"
                name="category_id"
                value={watch('category_id')}
                onChange={(e) => setValue('category_id', parseInt(e.target.value, 10), { shouldValidate: true })}
                options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                error={errors.category_id?.message}
                required
              />
              <ImageUploadField
                label="Product Image"
                imagePreview={imagePreview}
                onImageChange={handleImageChange}
                onRemoveImage={removeImage}
                error={errors.image?.message}
              />
              <CheckboxField<ProductFormData>
                label="Make this product active and available for purchase"
                name="is_active"
                register={register}
              />
            </div>

            <div className="mt-8 sm:mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
              {editingProduct && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="w-full sm:w-auto sm:flex-1 mr-0 sm:mr-4 flex justify-center items-center py-3 px-6 sm:py-4 sm:px-8 border-2 border-gray-300 rounded-xl sm:rounded-2xl shadow-sm text-sm sm:text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-gray-200 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              )}

              <SubmitButton
                isLoading={isLoading}
                label={editingProduct ? 'Update Product' : 'Add Product'}
                loadingLabel={editingProduct ? 'Updating...' : 'Creating...'}
                icon={
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;