interface ImageUploadProps {
  imagePreview: string | null;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  label: string;
  required?: boolean;
  className?: string;
}

const ImageUpload = ({
  imagePreview,
  onImageChange,
  onRemoveImage,
  label,
  required = false,
  className = ""
}: ImageUploadProps) => {
  return (
    <div className={`space-y-2 sm:space-y-3 ${className}`}>
      <label className="block text-xs sm:text-sm font-semibold text-gray-800 mb-1 sm:mb-2">
        {label}
        {required && <span className="text-red-500 ml-1 text-xs sm:text-sm">*</span>}
      </label>
      
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
                    onRemoveImage();
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
              onChange={onImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
