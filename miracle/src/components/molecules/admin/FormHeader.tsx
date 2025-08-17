import React from 'react';

interface FormHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg mb-4 transform transition-transform hover:scale-105">
        {icon}
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
        {title}
      </h2>
      <p className="text-gray-600 font-medium">
        {subtitle}
      </p>
    </div>
  );
};

export default FormHeader;
