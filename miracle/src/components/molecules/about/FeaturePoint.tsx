import React from 'react';

interface FeaturePointProps {
  icon: string;
  point: string;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({ icon, point }) => {
  return (
    <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
      <div className="text-4xl mb-4">{icon}</div>
      <p className="text-green-800 font-medium leading-relaxed">
        {point}
      </p>
    </div>
  );
};

export default FeaturePoint;
