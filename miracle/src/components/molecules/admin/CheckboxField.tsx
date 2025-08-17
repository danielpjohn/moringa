import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface CheckboxFieldProps<T extends FieldValues> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
}

const CheckboxField = <T extends FieldValues>({
  label,
  name,
  register,
}: CheckboxFieldProps<T>) => {
  return (
    <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300">
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          {...register(name)}
          className="sr-only peer"
        />
        <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-lg peer-checked:bg-green-600 peer-checked:border-green-600 transition-all duration-300 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="ml-3 text-sm text-gray-800 font-medium">{label}</span>
      </label>
    </div>
  );
};

export default CheckboxField;
