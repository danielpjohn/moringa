import React from 'react';

interface ContactFormContainerProps {
  children: React.ReactNode;
  title: string;
}

const ContactFormContainer: React.FC<ContactFormContainerProps> = ({ children, title }) => {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm max-w-2xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 sm:mb-8">
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
};

export default ContactFormContainer;
