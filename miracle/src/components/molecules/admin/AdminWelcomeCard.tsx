import React from 'react';

interface AdminWelcomeCardProps {
  title: string;
  description: string;
}

const AdminWelcomeCard: React.FC<AdminWelcomeCardProps> = ({ title, description }) => {
  return (
    <div className="p-6 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-6 sm:p-8 text-white text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-blue-100 text-lg leading-relaxed">{description}</p>
          <div className="mt-6">
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWelcomeCard;
