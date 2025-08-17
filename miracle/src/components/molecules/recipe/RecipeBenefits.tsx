import React from 'react';
import { Leaf, Heart, Zap, Droplet } from 'lucide-react';

interface Benefit {
  id: number;
  icon: 'leaf' | 'heart' | 'zap' | 'droplet';
  title: string;
  description: string;
}

interface RecipeBenefitsProps {
  benefits: Benefit[];
}

const iconMap = {
  leaf: Leaf,
  heart: Heart,
  zap: Zap,
  droplet: Droplet,
};

const iconColors = {
  leaf: 'text-green-500',
  heart: 'text-red-500',
  zap: 'text-yellow-500',
  droplet: 'text-blue-500',
};

const RecipeBenefits: React.FC<RecipeBenefitsProps> = ({ benefits }) => {
  if (benefits.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Health Benefits</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit) => {
          const Icon = iconMap[benefit.icon];
          const iconColor = iconColors[benefit.icon];
          
          return (
            <div key={benefit.id} className="flex">
              <div className={`flex-shrink-0 h-10 w-10 rounded-full ${iconColor} bg-opacity-10 flex items-center justify-center mr-4`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                <p className="mt-1 text-gray-600">{benefit.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeBenefits;
