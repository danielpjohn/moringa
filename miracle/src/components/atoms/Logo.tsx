import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS, IMAGE_TYPES } from '../../constants/api';

interface LogoProps {
  defaultLogo: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  variant?: 'normal' | 'inverted';
}

export default function Logo({ 
  defaultLogo, 
  alt = "Logo", 
  className = "h-8 w-8", 
  onClick,
  variant = 'normal'
}: LogoProps) {
  const [logoUrl, setLogoUrl] = useState(defaultLogo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}${API_ENDPOINTS.GET_ALL_IMAGES}`);
        
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const logo = data.find((item: { image: string }) =>
              item.image.toLowerCase().includes(IMAGE_TYPES.LOGO)
            ) || data[0];
            setLogoUrl(logo.image);
          }
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogo();
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = defaultLogo;
  };

  if (isLoading) {
    return <div className={`${className} bg-gray-200 animate-pulse rounded-full`}></div>;
  }

  return (
    <img
      src={logoUrl}
      alt={alt}
      className={`${className} ${variant === 'inverted' ? 'brightness-0 invert' : ''} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      onError={handleImageError}
    />
  );
}
