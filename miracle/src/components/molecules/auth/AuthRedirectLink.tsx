import React from 'react';

interface AuthRedirectLinkProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

const AuthRedirectLink: React.FC<AuthRedirectLinkProps> = ({ text, linkText, onClick }) => {
  return (
    <div className="text-center mt-6">
      <p className="text-sm text-gray-600">
        {text}{' '}
        <button
          onClick={onClick}
          className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
        >
          {linkText}
        </button>
      </p>
    </div>
  );
};

export default AuthRedirectLink;
