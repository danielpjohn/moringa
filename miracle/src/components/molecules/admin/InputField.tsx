import type { UseFormRegister, FieldValues, Path, FieldError } from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  error?: FieldError;
  type?: 'text' | 'textarea' | 'number';
  required?: boolean;
}

const InputField = <T extends FieldValues>({
  label,
  name,
  register,
  placeholder,
  error,
  type = 'text',
  required = false,
}: InputFieldProps<T>) => {
  const commonClasses = `w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 text-base ${error ? 'border-red-400' : 'border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'}`;

  const registerOptions = {
    required,
    ...(type === 'number' && { valueAsNumber: true }),
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
        {label} {required && '*'}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={name}
          {...register(name, registerOptions)}
          placeholder={placeholder}
          rows={4}
          className={`${commonClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          type={type}
          {...register(name, registerOptions)}
          placeholder={placeholder}
          className={commonClasses}
          step={type === 'number' ? '0.01' : undefined}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
