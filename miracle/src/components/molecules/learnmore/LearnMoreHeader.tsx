import React from 'react';

interface LearnMoreHeaderProps {
  title: string;
  subtitle: string;
  description: string;
}

const LearnMoreHeader: React.FC<LearnMoreHeaderProps> = ({
  title,
  subtitle,
  description
}) => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-12">
      <h2 className="text-base font-semibold text-green-600 mb-3">{subtitle}</h2>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        {title}
      </h1>
      <p className="text-lg text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default LearnMoreHeader;
