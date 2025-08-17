import React, { useEffect, useMemo, useState } from 'react';
import { API_ENDPOINTS } from '../../../../constants/api';
import Sidebar from '../sidebar/sidebar';
import { FormHeader, FormStatus, SubmitButton, ImageUploadField } from '../../../molecules/admin';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  onClick: () => void;
  ingredients: string[];
  instructions: string[];
  benefits: string;
}

type DraftRecipe = Omit<Recipe, 'id' | 'onClick'> & { id?: number; imageFile?: File | null };

const emptyDraft = (): DraftRecipe => ({
  title: '',
  image: '',
  imageFile: null,
  ingredients: [''],
  instructions: [''],
  benefits: ''
});

const AddRecipePage: React.FC = () => {
  const baseUrl = API_ENDPOINTS.BASE_URL;
  const RECIPES_URL = useMemo(() => `${baseUrl}${API_ENDPOINTS.RECIPES}`, [baseUrl]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [draft, setDraft] = useState<DraftRecipe>(emptyDraft());
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Responsive layout like AddProductPage
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isMobileView = windowWidth < 768;
  const isTabletView = windowWidth >= 768 && windowWidth < 1024;
  const isDesktopView = windowWidth >= 1024;

  const fetchRecipes = async () => {
    try {
      const res = await fetch(RECIPES_URL);
      const data = await res.json();
      const now = Date.now();
      const mapped: Recipe[] = (data || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        image: r.image
          ? (r.image.startsWith('http')
              ? `${r.image}?v=${now}`
              : `${baseUrl}${r.image}?v=${now}`)
          : '',
        onClick: () => {},
        ingredients: r.ingredients || [],
        instructions: r.instructions || [],
        benefits: r.benefits || ''
      }));
      setRecipes(mapped);
    } catch (e) {
      console.error('Failed to load recipes', e);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleArrayChange = (key: 'ingredients' | 'instructions', index: number, value: string) => {
    setDraft(prev => {
      const arr = [...prev[key]];
      arr[index] = value;
      return { ...prev, [key]: arr };
    });
  };

  const handleAddField = (key: 'ingredients' | 'instructions') => {
    setDraft(prev => ({ ...prev, [key]: [...prev[key], ''] }));
  };

  const handleRemoveField = (key: 'ingredients' | 'instructions', index: number) => {
    setDraft(prev => {
      const arr = [...prev[key]];
      arr.splice(index, 1);
      return { ...prev, [key]: arr.length ? arr : [''] };
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setDraft(emptyDraft());
    setImagePreview(null);
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const form = new FormData();
      form.append('title', draft.title);
      if (draft.imageFile) form.append('image', draft.imageFile);
      form.append('ingredients', JSON.stringify(draft.ingredients.filter(Boolean)));
      form.append('instructions', JSON.stringify(draft.instructions.filter(Boolean)));
      form.append('benefits', draft.benefits);

      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `${RECIPES_URL}${editingId}/` : RECIPES_URL;

      const res = await fetch(url, { method, body: form });
      if (!res.ok) throw new Error('Failed to save');
      await fetchRecipes();
      resetForm();
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setError('Failed to save recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (r: Recipe) => {
    setEditingId(r.id);
    setDraft({
      title: r.title,
      image: r.image,
      imageFile: null,
      ingredients: r.ingredients.length ? r.ingredients : [''],
      instructions: r.instructions.length ? r.instructions : [''],
      benefits: r.benefits
    });
    setImagePreview(r.image || null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setDraft(d => ({ ...d, imageFile: file }));
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setDraft(d => ({ ...d, imageFile: null }));
    setImagePreview(null);
    const fileInput = document.getElementById('file-upload') as HTMLInputElement | null;
    if (fileInput) fileInput.value = '';
  };

  const remove = async (id: number) => {
    if (!confirm('Delete this recipe?')) return;
    try {
      await fetch(`${RECIPES_URL}${id}/`, { method: 'DELETE' });
      await fetchRecipes();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      {isDesktopView && (
        <div className="w-64 fixed h-full bg-white shadow-md z-40">
          <Sidebar onClose={() => {}} onNavClick={() => {}} isMobile={false} />
        </div>
      )}

      {/* Mobile & Tablet Sidebar */}
      {!isDesktopView && (
        <Sidebar onClose={() => {}} onNavClick={() => {}} isMobile={true} />
      )}

      {/* Main Content Container */}
      <div
        className={`
        flex-1 min-h-screen transition-all duration-300 w-full overflow-x-hidden
        ${isDesktopView ? 'ml-64' : ''}
        ${isMobileView ? 'pt-16' : ''}
        ${isTabletView ? 'pt-16' : ''}
      `}
      >
        {/* Content Wrapper */}
        <div
          className={`
          w-full min-w-0
          ${isMobileView ? 'px-4 py-4 space-y-4' : ''}
          ${isTabletView ? 'px-6 py-4 space-y-4' : ''}
          ${isDesktopView ? 'px-6 py-6 space-y-6 max-w-7xl mx-auto' : ''}
        `}
        >
          {/* Header max-width container */}
          <div className="max-w-full sm:max-w-[95vw] md:max-w-3xl lg:max-w-4xl xl:max-w-7xl mx-auto">
            <FormHeader
              icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h9a3 3 0 013 3v11H6a2 2 0 01-2-2V6z" /></svg>}
              title={editingId ? 'Edit Recipe' : 'Create New Recipe'}
              subtitle="Add a new recipe with image, ingredients and instructions"
            />
          </div>

          {/* Form Card */}
          <div
            className={`
            bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl lg:shadow-2xl border border-white/20 overflow-hidden w-full
            ${isMobileView ? 'mx-2' : ''}
          `}
          >
            <div className="p-4">
              {error && <FormStatus type="error" message={error} />}
              {success && <FormStatus type="success" message={editingId ? 'Recipe updated successfully!' : 'Recipe created successfully!'} />}
            </div>

            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="p-3 sm:p-4 lg:p-6 xl:p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
                  placeholder="e.g. Moringa Smoothie"
                  className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <ImageUploadField
                label="Recipe Image"
                imagePreview={imagePreview || (draft.image && !draft.imageFile ? draft.image : null)}
                onImageChange={handleImageChange}
                onRemoveImage={removeImage}
                error={undefined}
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredients</label>
                <div className="space-y-2">
                  {draft.ingredients.map((v, i) => (
                    <div key={`ing-${i}`} className="flex items-center space-x-2">
                      <input
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={v}
                        onChange={(e) => handleArrayChange('ingredients', i, e.target.value)}
                        placeholder={`Ingredient ${i + 1}`}
                      />
                      <button type="button" onClick={() => handleRemoveField('ingredients', i)} className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddField('ingredients')} className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    Add ingredient
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                <div className="space-y-2">
                  {draft.instructions.map((v, i) => (
                    <div key={`ins-${i}`} className="flex items-center space-x-2">
                      <input
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={v}
                        onChange={(e) => handleArrayChange('instructions', i, e.target.value)}
                        placeholder={`Step ${i + 1}`}
                      />
                      <button type="button" onClick={() => handleRemoveField('instructions', i)} className="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => handleAddField('instructions')} className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" /></svg>
                    Add step
                  </button>
                </div>
              </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                  <textarea
                    value={draft.benefits}
                    onChange={(e) => setDraft(d => ({ ...d, benefits: e.target.value }))}
                    rows={3}
                    placeholder="Health benefits, notes, etc."
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="pt-2">
                  <SubmitButton
                    isLoading={loading}
                    label={editingId ? 'Update Recipe' : 'Save Recipe'}
                    loadingLabel={editingId ? 'Updating Recipe...' : 'Saving Recipe...'}
                    icon={<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}
                  />
                  {editingId && (
                    <button type="button" onClick={resetForm} className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">Cancel</button>
                  )}
                </div>
            </form>
          </div>

          {/* Saved recipes list below form */}
          <div
            className={`
            bg-white shadow-sm border border-gray-200 overflow-hidden w-full
            ${isMobileView ? 'rounded-lg mx-0' : 'rounded-xl'}
          `}
          >
            <div
              className={`
                ${isMobileView ? 'p-3' : ''}
                ${isTabletView ? 'p-4' : ''}
                ${isDesktopView ? 'p-4 lg:p-6' : ''}
              `}
            >
              <div className="divide-y divide-gray-200">
                {recipes.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">No recipes found</div>
                ) : (
                  recipes.map((r) => (
                    <div key={r.id} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        {r.image ? (
                          <img
                            src={r.image}
                            alt={r.title}
                            className="w-16 h-16 mr-4 rounded-md object-cover flex-shrink-0 border border-gray-200"
                          />
                        ) : (
                          <div className="w-16 h-16 mr-4 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-medium text-gray-900 truncate">{r.title}</h3>
                          <p className="text-sm text-gray-600 mt-2">{r.ingredients.length} ingredients • {r.instructions.length} steps</p>
                        </div>
                        <div className="ml-4 flex-shrink-0 flex space-x-2">
                          <button
                            onClick={() => startEdit(r)}
                            className="p-2 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50 transition-colors duration-200"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => remove(r.id)}
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
  );
};

export default AddRecipePage;
