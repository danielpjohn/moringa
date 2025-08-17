import React from 'react';

interface SelectFieldProps {
  label: string;
  name: string;
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: number; label: string }[];
  error?: string;
  required?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, options, error, required = false }) => {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 text-base appearance-none ${error ? 'border-red-400' : 'border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'}`}
        >
          <option value="">Select a category</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

export default SelectField;
