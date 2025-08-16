import { useState } from 'react';
import Sidebar from '../sidebar/sidebar';

interface CategoryFormData {
    name: string;
    description: string;
}

export default function AddCategoryPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: ''
    });
    const [errors, setErrors] = useState<Partial<CategoryFormData>>({});

    const validateForm = () => {
        const newErrors: Partial<CategoryFormData> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'Category name is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            setSuccess(true);
            setFormData({ name: '', description: '' });
        } catch (err) {
            setError('Failed to create category. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: keyof CategoryFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar - Full height and responsive */}
            <div className="fixed inset-y-0 left-0 z-30 h-full">
                <Sidebar 
                    onClose={() => {}} 
                    onNavClick={() => {}} 
                    isMobile={false}
                />
            </div>

            {/* Main Content with margin-top for mobile */}
            <div className="flex-1 ml-0 lg:ml-64 mt-16 lg:mt-0">
                <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] lg:min-h-screen py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md lg:max-w-2xl">
                        {/* Glass Card */}
                        <div className="bg-white shadow-2xl border border-gray-200 p-6 lg:p-8 rounded-xl lg:rounded-2xl">
                            {/* Header */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg mb-4 transform transition-transform hover:scale-105">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                                    Create New Category
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    Add a new product category to your inventory
                                </p>
                            </div>

                            {/* Status Messages */}
                            {error && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg flex items-center">
                                    <div className="bg-red-500 p-2 rounded-full mr-3">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </div>
                                    <span className="text-red-700 font-medium">{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-100 border-l-4 border-emerald-500 rounded-lg flex items-center">
                                    <div className="bg-emerald-500 p-2 rounded-full mr-3">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-emerald-800 font-medium">Category created successfully!</span>
                                </div>
                            )}

                            {/* Form */}
                            <div className="space-y-6">
                                {/* Category Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Category Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 text-base ${
                                            errors.name ? 'border-red-400' : 'border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'
                                        }`}
                                        placeholder="e.g. Electronics, Clothing"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 rounded-lg transition-all duration-300 text-base resize-none"
                                        placeholder="Optional description for the category"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                        className="w-full flex justify-center items-center py-3 px-6 font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] rounded-lg shadow-lg text-base"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Creating Category...
                                            </>
                                        ) : (
                                            <>
                                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Create Category
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}