import React from 'react';

interface LearnMoreImageSectionProps {
  images: {
    src: string;
    alt: string;
  }[];
  title?: string;
}

const LearnMoreImageSection: React.FC<LearnMoreImageSectionProps> = ({ images, title }) => {
  return (
    <div className="py-12">
      {title && <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg">
            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnMoreImageSection;
