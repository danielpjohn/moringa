import React from 'react';

interface AdminDashboardHeaderProps {
  title: string;
  description: string;
}

const AdminDashboardHeader: React.FC<AdminDashboardHeaderProps> = ({ title, description }) => {
  return (
    <div className="p-6 sm:p-8 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto text-center lg:text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
