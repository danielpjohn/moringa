export const BUTTON_STYLES = {
  primary: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition-all duration-200',
  danger: 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg',
} as const;

export const CARD_STYLES = {
  base: 'bg-white rounded-xl shadow-lg border border-gray-200 p-6',
  hover: 'hover:shadow-xl transition-all duration-200',
  gradient: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200',
} as const;

export const TEXT_STYLES = {
  heading: 'text-2xl font-bold text-gray-800',
  subheading: 'text-lg font-semibold text-gray-700',
  body: 'text-gray-600',
  small: 'text-sm text-gray-500',
} as const;
