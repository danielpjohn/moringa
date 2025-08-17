import React from 'react';
import { Clock, Users, Heart } from 'lucide-react';

interface RecipeHeaderProps {
  title: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  isFavorite: boolean;
  onFavoriteToggle: () => void;
}

const RecipeHeader: React.FC<RecipeHeaderProps> = ({
  title,
  image,
  prepTime,
  cookTime,
  servings,
  isFavorite,
  onFavoriteToggle
}) => {
  const totalTime = prepTime + cookTime;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 md:h-80 object-cover"
        />
        <button
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart 
            className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
          />
        </button>
      </div>
      
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
        
        <div className="flex flex-wrap gap-6 text-gray-600">
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="font-medium">{prepTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="font-medium">{cookTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Total Time</p>
              <p className="font-medium">{totalTime} min</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-medium">{servings} {servings === 1 ? 'serving' : 'servings'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeHeader;
