import React from 'react';
import StarRating from '../common/StarRating';
import UserAvatar from './UserAvatar';

interface TestimonialCardProps {
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  avatar?: string;
  variant?: 'default' | 'card' | 'minimal';
}

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
  </svg>
);

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  company,
  content,
  rating = 5,
  avatar,
  variant = 'default'
}) => {
  if (variant === 'minimal') {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-4">
          <StarRating rating={rating} />
        </div>
        <blockquote className="text-lg italic text-black mb-4">
          "{content}"
        </blockquote>
        <div className="text-sm text-gray-600">
          <span className="font-medium text-black">{name}</span>
          {role && <span>, {role}</span>}
          {company && <span> at {company}</span>}
        </div>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center mb-6">
          <QuoteIcon />
          <div className="ml-3">
            <StarRating rating={rating} />
          </div>
        </div>
        
        <blockquote className="text-black mb-6 leading-relaxed">
          "{content}"
        </blockquote>
        
        <div className="flex items-center">
          <UserAvatar name={name} avatar={avatar} size="md" />
          <div className="ml-4">
            <div className="font-semibold text-black">
              {name}
            </div>
            <div className="text-sm text-gray-600">
              {role}{company && ` • ${company}`}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 md:p-12">
        <div className="absolute top-6 left-6 opacity-20">
          <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="relative">
          <div className="mb-6">
            <StarRating rating={rating} />
          </div>
          
          <blockquote className="text-xl md:text-2xl text-black text-center mb-8 leading-relaxed font-medium">
            "{content}"
          </blockquote>
          
          <div className="flex items-center justify-center">
            <UserAvatar name={name} avatar={avatar} size="lg" />
            <div className="text-center ml-6">
              <div className="text-lg font-semibold text-black">
                {name}
              </div>
              <div className="text-gray-600">
                {role}{company && ` • ${company}`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
