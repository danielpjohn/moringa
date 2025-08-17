import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export default function MobileMenuToggle({ 
  isOpen, 
  onToggle, 
  className = '' 
}: MobileMenuToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="primary"
      className={`p-2 mr-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg ${className}`}
    >
      <Icon name={isOpen ? 'close' : 'menu'} />
    </Button>
  );
}
