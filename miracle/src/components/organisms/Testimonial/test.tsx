import React from 'react';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'white';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right' | 'justify';
  className?: string;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  weight = 'normal',
  align = 'left',
  className = '',
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'h1':
        return 'text-4xl md:text-5xl lg:text-6xl';
      case 'h2':
        return 'text-3xl md:text-4xl lg:text-5xl';
      case 'h3':
        return 'text-2xl md:text-3xl lg:text-4xl';
      case 'h4':
        return 'text-xl md:text-2xl lg:text-3xl';
      case 'h5':
        return 'text-lg md:text-xl lg:text-2xl';
      case 'h6':
        return 'text-base md:text-lg lg:text-xl';
      case 'body':
        return 'text-base';
      case 'caption':
        return 'text-sm';
      case 'small':
        return 'text-xs';
      default:
        return 'text-base';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'text-black';
      case 'secondary':
        return 'text-gray-700';
      case 'muted':
        return 'text-gray-500';
      case 'accent':
        return 'text-green-600';
      case 'success':
        return 'text-green-600';
      case 'white':
        return 'text-white';
      default:
        return 'text-black';
    }
  };

  const getWeightClasses = () => {
    switch (weight) {
      case 'light':
        return 'font-light';
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };

  const getAlignClasses = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      case 'justify':
        return 'text-justify';
      default:
        return 'text-left';
    }
  };

  const Tag = variant.startsWith('h') ? (variant as keyof React.JSX.IntrinsicElements) : 'p';

  const classes = [
    getVariantClasses(),
    getColorClasses(),
    getWeightClasses(),
    getAlignClasses(),
    className,
  ].filter(Boolean).join(' ');

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  );
};

export default Text;