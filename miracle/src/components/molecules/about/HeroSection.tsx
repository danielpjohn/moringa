import { useState, useEffect } from 'react';

interface HeroSectionProps {
  defaultBackground: string;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const HeroSection = ({ defaultBackground, onImageError }: HeroSectionProps) => {
  const [backgroundImage, setBackgroundImage] = useState(defaultBackground);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBackgroundImage = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://127.0.0.1:8000/get-all-images/');

        if (response.ok) {
          const data = await response.json();

          if (Array.isArray(data) && data.length > 0) {
            const bgImage = data.find(item =>
              item.image.toLowerCase().includes('homepage')
            );

            if (bgImage) {
              console.log('Found background image:', bgImage.image);
              setBackgroundImage(bgImage.image);
            } else {
              console.log('No matching image found, using first image');
              setBackgroundImage(data[0].image);
            }
          } else {
            console.log('Empty response array, using default image');
          }
        } else {
          console.log('API request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch background image:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackgroundImage();
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full z-0">
      {isLoading ? (
        <div className="w-full h-[500px] bg-gray-200 animate-pulse"></div>
      ) : (
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-auto block"
          style={{
            display: 'block',
            margin: 0,
            padding: 0,
            verticalAlign: 'top',
            lineHeight: 0,
            height: '600px',
            objectFit: 'contain'
          }}
          onError={onImageError}
        />
      )}
    </div>
  );
};

export default HeroSection;
