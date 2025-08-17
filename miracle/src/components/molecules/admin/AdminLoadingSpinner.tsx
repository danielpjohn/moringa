import React from 'react';

const AdminLoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Dashboard</h2>
        <p className="text-gray-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  );
};

export default AdminLoadingSpinner;
