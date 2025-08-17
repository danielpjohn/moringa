import React, { useState } from 'react';

interface RecipeCardProps {
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  benefits: string;
  onClick: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  image,
  ingredients,
  instructions,
  benefits,
  onClick
}) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  const fallbackImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80';

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-green-300 backdrop-blur-sm bg-white/95"
      onClick={onClick}
    >
      {/* Enhanced Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={image || fallbackImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = fallbackImage; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white drop-shadow-lg">
            {title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Health Benefits Section */}
        {benefits && (
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border shadow-sm" style={{borderColor: '#17322b30', backgroundColor: '#f0f9ff10'}}>
            <h4 className="text-sm font-bold mb-2 flex items-center" style={{color: '#17322b'}}>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#17322b'}}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Health Benefits
            </h4>
            <p className="text-sm leading-relaxed" style={{color: '#17322b'}}>{benefits}</p>
          </div>
        )}

        {/* Collapsible Ingredients Section */}
        {ingredients && ingredients.length > 0 && (
          <div className="space-y-3" onClick={handleDropdownClick}>
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md"
              style={{borderColor: '#17322b30'}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#17322b'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="font-semibold" style={{color: '#17322b'}}>
                  Ingredients ({ingredients.length})
                </span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${showIngredients ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{color: '#17322b'}}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showIngredients ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-green-50/50 rounded-xl p-4 border-l-4 space-y-2" style={{borderColor: '#17322b'}}>
                <ul className="space-y-2">
                  {ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="inline-block w-2 h-2 rounded-full mt-2 mr-3 flex-shrink-0" style={{backgroundColor: '#17322b'}}></span>
                      <span className="leading-relaxed">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Instructions Section */}
        {instructions && instructions.length > 0 && (
          <div className="space-y-3" onClick={handleDropdownClick}>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 rounded-xl border transition-all duration-300 shadow-sm hover:shadow-md"
              style={{borderColor: '#17322b40'}}
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{color: '#17322b'}}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="font-semibold" style={{color: '#17322b'}}>
                  Instructions ({instructions.length} steps)
                </span>
              </div>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{color: '#17322b'}}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showInstructions ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="bg-purple-50/30 rounded-xl p-4 border-l-4 border-purple-400 space-y-3">
                <ol className="space-y-3">
                  {instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-700">
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-purple-400 text-white text-xs font-bold rounded-full mr-3 flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Footer */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            {Array.isArray(ingredients) && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 border border-emerald-200 text-emerald-800 font-medium text-xs shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                {ingredients.length} ingredients
              </div>
            )}
            {Array.isArray(instructions) && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 text-indigo-800 font-medium text-xs shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {instructions.length} steps
              </div>
            )}  
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;