import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertMessageProps {
  message: string;
  variant?: AlertVariant;
  onClose?: () => void;
  className?: string;
}

const variantIcons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info
};

const variantStyles = {
  success: 'bg-green-50 text-green-800',
  error: 'bg-red-50 text-red-800',
  warning: 'bg-yellow-50 text-yellow-800',
  info: 'bg-blue-50 text-blue-800'
};

const AlertMessage: React.FC<AlertMessageProps> = ({
  message,
  variant = 'info',
  onClose,
  className = ''
}) => {
  const Icon = variantIcons[variant];
  
  return (
    <div 
      className={`rounded-md p-4 ${variantStyles[variant]} ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${variant === 'success' ? 'text-green-400' : ''} ${variant === 'error' ? 'text-red-400' : ''} ${variant === 'warning' ? 'text-yellow-400' : ''} ${variant === 'info' ? 'text-blue-400' : ''}`} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-4 flex-shrink-0 flex">
            <button
              type="button"
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertMessage;
