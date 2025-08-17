import React from 'react';
import { Check } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  icon: string;
  details: string[];
}

const BenefitCard: React.FC<BenefitCardProps> = ({ title, icon, details }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full max-w-md">
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-xl font-bold text-green-800">{title}</h3>
      </div>
      
      <ul className="space-y-3">
        {details.map((detail, i) => (
          <li key={i} className="flex items-start">
            {i < details.length - 1 ? (
              <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            ) : (
              <span className="text-lg mr-3 mt-0.5">📚</span>
            )}
            <span className={`${
              i < details.length - 1 
                ? 'text-green-800' 
                : 'text-gray-600 text-sm italic'
            }`}>
              {detail}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BenefitCard;
