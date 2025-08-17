
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  online?: boolean;
  fallback?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12'
};

export default function Avatar({ 
  src, 
  alt = "Avatar", 
  size = 'md', 
  online = false, 
  fallback,
  className = '' 
}: AvatarProps) {
  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`relative ${className}`}>
      {src ? (
        <img
          className={`${sizeClass} rounded-full border-2 border-green-200 shadow-md object-cover`}
          src={src}
          alt={alt}
        />
      ) : (
        <div className={`${sizeClass} rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold`}>
          {fallback || alt.charAt(0).toUpperCase()}
        </div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
      )}
    </div>
  );
}
