import Logo from '../../atoms/Logo';

interface LogoHeaderProps {
  defaultLogo: string;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  variant?: 'normal' | 'inverted';
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: { logo: 'h-8 w-8', title: 'text-lg', subtitle: 'text-xs' },
  md: { logo: 'h-10 w-10', title: 'text-xl', subtitle: 'text-sm' },
  lg: { logo: 'h-12 w-12', title: 'text-2xl', subtitle: 'text-base' }
};

export default function LogoHeader({ 
  defaultLogo, 
  title, 
  subtitle, 
  onClick, 
  variant = 'normal',
  size = 'md'
}: LogoHeaderProps) {
  const classes = sizeClasses[size];
  const textColor = variant === 'inverted' ? 'text-white' : 'text-gray-800';
  const subtitleColor = variant === 'inverted' ? 'text-green-100' : 'text-gray-600';

  return (
    <div className="flex items-center space-x-3">
      <div className={`p-3 rounded-xl ${variant === 'inverted' ? 'bg-white/20 backdrop-blur-sm' : ''}`}>
        <Logo
          defaultLogo={defaultLogo}
          alt={title}
          className={classes.logo}
          onClick={onClick}
          variant={variant}
        />
      </div>
      <div>
        <h1 className={`${classes.title} font-bold ${textColor}`}>{title}</h1>
        {subtitle && (
          <p className={`${classes.subtitle} ${subtitleColor}`}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}
