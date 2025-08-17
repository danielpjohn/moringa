import { ADMIN_ICONS } from '../../constants/icons';

interface IconProps {
  name: keyof typeof ADMIN_ICONS;
  className?: string;
}

export default function Icon({ name, className = '' }: IconProps) {
  const IconComponent = ADMIN_ICONS[name];
  
  return (
    <span className={className}>
      {IconComponent}
    </span>
  );
}
