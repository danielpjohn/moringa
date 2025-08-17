import React from 'react';
import type { ReactNode } from 'react';

interface ContentSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  id?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  description,
  children,
  className = '',
  contentClassName = '',
  id
}) => {
  return (
    <section 
      id={id}
      className={`py-12 sm:py-16 lg:py-20 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {title && (
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-lg text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}
        <div className={contentClassName}>
          {children}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
