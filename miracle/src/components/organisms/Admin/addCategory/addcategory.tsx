import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Sidebar from '../sidebar/sidebar';
import { FormHeader, FormStatus, InputField, SubmitButton } from '../../../molecules/admin';
import axios from 'axios';
import { API_ENDPOINTS } from '../../../../constants/api';

interface CategoryFormData {
    name: string;
    description: string;
}

interface Category extends CategoryFormData {
    id: number;
}

export default function AddCategoryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const loadCategories = async () => {
        try {
            const res = await axios.get(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORIES}`);
            setCategories(res.data || []);
        } catch (e) {
            console.error('Failed to load categories', e);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const onSubmit = async (data: CategoryFormData) => {
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (editingCategory) {
                // Update
                await axios.put(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORIES}${editingCategory.id}/`, data);
                setSuccess(true);
                setEditingCategory(null);
            } else {
                // Create
                await axios.post(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORIES}`, data);
                setSuccess(true);
            }
            await loadCategories();
            reset();
        } catch (err) {
            setError('Failed to create category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        reset({ name: category.name, description: category.description });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('Delete this category?')) return;
        try {
            await axios.delete(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.CATEGORIES}${id}/`);
            setCategories(prev => prev.filter(c => c.id !== id));
        } catch (e) {
            console.error('Failed to delete category', e);
            setError('Failed to delete category.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div className="fixed inset-y-0 left-0 z-30 h-full">
                <Sidebar onClose={() => {}} onNavClick={() => {}} isMobile={false} />
            </div>

            <div className="flex-1 ml-0 lg:ml-64 mt-16 lg:mt-0">
                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] lg:min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md lg:max-w-2xl">
                        <div className="bg-white shadow-2xl border border-gray-200 p-6 lg:p-8 rounded-xl lg:rounded-2xl">
                            <FormHeader
                                icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                                title="Create New Category"
                                subtitle="Add a new product category to your inventory"
                            />

                            {error && <FormStatus type="error" message={error} />}
                            {success && <FormStatus type="success" message="Category created successfully!" />}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <InputField<CategoryFormData>
                                    label="Category Name"
                                    name="name"
                                    register={register}
                                    placeholder="e.g. Health Supplements"
                                    error={errors.name}
                                    required
                                />
                                <InputField<CategoryFormData>
                                    label="Description"
                                    name="description"
                                    register={register}
                                    placeholder="Optional description for the category"
                                    type="textarea"
                                    error={errors.description}
                                />
                                <div className="pt-4">
                                    <SubmitButton
                                        isLoading={isLoading}
                                        label={editingCategory ? 'Update Category' : 'Create Category'}
                                        loadingLabel={editingCategory ? 'Updating Category...' : 'Creating Category...'}
                                        icon={<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                                    />
                                </div>
                            </form>
                        </div>
                        {/* Category List centered under form */}
                        <div className="mt-8">
                            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                                <div className="px-4 sm:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
                                </div>
                                <div className="divide-y divide-gray-200">
                                    {categories.length === 0 ? (
                                        <div className="p-6 text-center text-gray-500">No categories found</div>
                                    ) : (
                                        categories.map((cat) => (
                                            <div key={cat.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                                <div className="flex items-start">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-medium text-gray-900 truncate">{cat.name}</h3>
                                                        {cat.description && (
                                                            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{cat.description}</p>
                                                        )}
                                                    </div>
                                                    <div className="ml-4 flex-shrink-0 flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(cat)}
                                                            className="p-2 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                                                            title="Edit"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(cat.id)}
                                                            className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50 transition-colors duration-200"
                                                            title="Delete"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}