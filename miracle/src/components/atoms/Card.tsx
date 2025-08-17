import React from 'react';
import { CARD_STYLES } from '../../constants/styles';

interface CardProps {
  children: React.ReactNode;
  variant?: 'base' | 'gradient';
  hover?: boolean;
  className?: string;
}

export default function Card({ 
  children, 
  variant = 'base', 
  hover = false, 
  className = '' 
}: CardProps) {
  const baseStyles = CARD_STYLES[variant];
  const hoverStyles = hover ? CARD_STYLES.hover : '';
  
  return (
    <div className={`${baseStyles} ${hoverStyles} ${className}`}>
      {children}
    </div>
  );
}
