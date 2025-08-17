import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface AuthHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ icon: Icon, title, subtitle }) => {
  return (
    <div className="text-center">
      <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </div>
  );
};

export default AuthHeader;
