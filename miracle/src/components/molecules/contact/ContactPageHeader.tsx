import React from 'react';

interface ContactPageHeaderProps {
  title: string;
  description: string;
}

const ContactPageHeader: React.FC<ContactPageHeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default ContactPageHeader;
