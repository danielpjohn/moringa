import React from 'react';

interface ImageUploadFieldProps {
  label: string;
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  error?: string;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ label, imagePreview, onImageChange, onRemoveImage, error }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">{label}</label>
      <div className="relative">
        <label className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${error ? 'border-red-400' : 'border-gray-300 hover:border-green-400 bg-gray-50 hover:bg-green-50'}`}>
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Preview" className="max-w-full max-h-full object-contain rounded-lg" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveImage();
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
                <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              <p className="text-sm text-gray-500"><span className="font-semibold text-green-600">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
            </div>
          )}
          <input
            id="file-upload"
            type="file"
            onChange={onImageChange}
            className="hidden"
            accept="image/*"
          />
        </label>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default ImageUploadField;
