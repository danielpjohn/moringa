import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCategories, createProduct, updateProduct } from './api/productApi';
import type { Category, Product, ProductFormData, ProductFormFields } from './types/product';

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

  const formFields: ProductFormFields = [
    {
      name: 'name',
      label: 'Product Name',
      type: 'text',
      required: true,
      placeholder: 'Enter product name',
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
      placeholder: 'Enter product description',
    },
    {
      name: 'price',
      label: 'Price',
      type: 'number',
      required: true,
      placeholder: 'Enter price',
    },
    {
      name: 'stock',
      label: 'Stock Quantity',
      type: 'number',
      required: true,
      placeholder: 'Enter stock quantity',
    },
    {
      name: 'category_id',
      label: 'Category',
      type: 'select',
      required: true,
      options: categories.map((cat) => ({
        value: cat.id,
        label: cat.name,
      })),
    },
    {
      name: 'image',
      label: 'Product Image',
      type: 'file',
      required: false,
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox',
      required: false,
    },
  ];

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
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg sm:rounded-xl md:rounded-2xl mb-3 sm:mb-4 md:mb-6 shadow-lg">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 via-green-800 to-emerald-800 bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md sm:max-w-2xl mx-auto leading-relaxed">
            {editingProduct
              ? 'Update the product details below'
              : 'Fill out the details below to add a new product to your catalog.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/20 overflow-hidden mx-2 sm:mx-0">
          {(error || success) && (
            <div className="m-3 sm:m-4 lg:m-6 mb-0 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl">
              {error && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-2 sm:ml-3 lg:ml-4">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-red-800 mb-1">Error</h3>
                      <p className="text-xs sm:text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {success && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-2 sm:ml-3 lg:ml-4">
                      <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-emerald-800 mb-1">Success!</h3>
                      <p className="text-xs sm:text-sm text-emerald-700">
                        {editingProduct
                          ? 'Product has been updated successfully.'
                          : 'Product has been created successfully and added to your inventory.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8">
              {formFields.map((field) => (
                <div
                  key={field.name}
                  className={`space-y-2 sm:space-y-3 ${field.type === 'textarea' ||
                    field.type === 'file' ||
                    field.name === 'name' ||
                    field.name === 'category_id' ||
                    field.name === 'is_active'
                    ? 'col-span-1'
                    : ''
                    }`}
                >
                  <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1 text-xs sm:text-sm">*</span>}
                  </label>

                  {field.type === 'textarea' ? (
                    <div className="relative">
                      <textarea
                        {...register(field.name, {
                          required: field.required,
                        })}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 p-3 sm:p-4 transition-all duration-300 hover:border-gray-300 bg-white/70 backdrop-blur-sm resize-none text-sm sm:text-base"
                        rows={4}
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
                    </div>
                  ) : field.type === 'select' ? (
                    <div className="relative">
                      <select
                        {...register('category_id', { required: field.required })}
                        className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 p-3 sm:p-4 bg-white/70 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 appearance-none text-sm sm:text-base"
                      >
                        <option value="">Select a category</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 sm:px-4 pointer-events-none">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  ) : field.type === 'checkbox' ? (
                    <div className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          {...register('is_active')}
                          className="sr-only peer"
                        />
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white border-2 border-gray-300 rounded-md sm:rounded-lg peer-checked:bg-green-600 peer-checked:border-green-600 transition-all duration-300 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-gray-800 font-medium">Make this product active and available for purchase</span>
                      </label>
                    </div>
                  ) : field.type === 'file' ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div className="relative">
                        <label className="flex flex-col items-center justify-center w-full h-32 sm:h-48 border-2 border-dashed border-gray-300 rounded-xl sm:rounded-2xl lg:rounded-3xl cursor-pointer bg-gradient-to-br from-gray-50 to-gray-100 hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all duration-300 group relative">
                          {imagePreview ? (
                            <>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <img
                                  src={imagePreview}
                                  alt="Preview"
                                  className="max-w-full max-h-full object-contain rounded-lg sm:rounded-xl shadow-lg"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeImage();
                                }}
                                className="absolute top-1 right-1 sm:top-3 sm:right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 sm:p-2 shadow-lg transition-colors duration-300"
                              >
                                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center pt-3 pb-4 sm:pt-5 sm:pb-6">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-300">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                              </div>
                              <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-600 text-center">
                                <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xxs sm:text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          )}
                          <input
                            id="file-upload"
                            type="file"
                            onChange={handleImageChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <input
                        type={field.type}
                        {...register(field.name, {
                          required: field.required,
                          ...(field.type === 'number' && {
                            min: { value: 0, message: 'Value must be positive' },
                            valueAsNumber: true
                          })
                        })}
                        placeholder={field.placeholder}
                        className="w-full rounded-lg sm:rounded-xl lg:rounded-2xl border-2 border-gray-200 shadow-sm focus:border-green-500 focus:ring-2 sm:focus:ring-4 focus:ring-green-100 p-3 sm:p-4 transition-all duration-300 hover:border-gray-300 bg-white/70 backdrop-blur-sm text-sm sm:text-base"
                        step={field.type === 'number' ? '0.01' : undefined}
                      />
                      <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
                    </div>
                  )}

                  {errors[field.name] && (
                    <div className="flex items-start p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg sm:rounded-xl">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mr-1 sm:mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs sm:text-sm text-red-700 font-medium">{field.label} is required</span>
                    </div>
                  )}
                </div>
              ))}
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

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full ${editingProduct ? 'sm:flex-1' : ''} flex justify-center items-center py-3 px-6 sm:py-4 sm:px-8 border-0 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-green-200 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] group`}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2 sm:mr-3"></div>
                    <span>{editingProduct ? 'Updating...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>{editingProduct ? 'Update Product' : 'Add Product'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductForm;