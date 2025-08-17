interface CouponFormFieldProps {
  label: string;
  type: 'text' | 'number' | 'date';
  name: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  min?: string;
  max?: string;
  suffix?: string;
  error?: string;
  required?: boolean;
  isMobileView: boolean;
  isTabletView: boolean;
  isDesktopView: boolean;
}

const CouponFormField = ({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
  suffix,
  error,
  required = false,
  isMobileView,
  isTabletView,
  isDesktopView,
}: CouponFormFieldProps) => {
  return (
    <div className={`${isMobileView ? 'space-y-1' : 'space-y-2'}`}>
      <label className={`
        block font-semibold text-gray-700 uppercase tracking-wider text-center
        ${isMobileView ? 'text-xs' : 'text-sm'}
      `}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className={`
            w-full border-2 text-center font-medium transition-all duration-300
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100'}
            ${type === 'date' ? 'appearance-none' : ''}
            ${isMobileView ? 'px-3 py-2 rounded-md text-sm' : ''}
            ${isTabletView ? 'px-4 py-2.5 rounded-lg text-base' : ''}
            ${isDesktopView ? 'px-4 py-3 rounded-lg text-base' : ''}
          `}
          placeholder={placeholder}
        />
        {suffix && (
          <div className={`
            absolute top-1/2 transform -translate-y-1/2 text-gray-400 font-medium
            ${isMobileView ? 'right-2 text-xs' : 'right-3 text-sm'}
          `}>
            {suffix}
          </div>
        )}
        <div className={`
          absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none
          ${isMobileView ? 'rounded-md' : 'rounded-lg'}
        `}></div>
      </div>
      {error && (
        <div className="flex items-center mt-1">
          <svg className="w-4 h-4 text-red-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className={`text-red-500 font-medium ${isMobileView ? 'text-xs' : 'text-sm'}`}>
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

export default CouponFormField;
