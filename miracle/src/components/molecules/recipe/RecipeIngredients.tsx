import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Ingredient {
  id: number;
  name: string;
  amount: string;
  unit: string;
}

interface RecipeIngredientsProps {
  ingredients: Ingredient[];
  servings: number;
  onServingsChange: (newServings: number) => void;
  checkedIngredients: number[];
  onIngredientToggle: (id: number) => void;
}

const RecipeIngredients: React.FC<RecipeIngredientsProps> = ({
  ingredients,
  servings,
  onServingsChange,
  checkedIngredients,
  onIngredientToggle
}) => {
  const handleServingsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onServingsChange(Number(e.target.value));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
        <div className="flex items-center">
          <label htmlFor="servings" className="mr-2 text-sm font-medium text-gray-700">
            Servings:
          </label>
          <select
            id="servings"
            value={servings}
            onChange={handleServingsChange}
            className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
          >
            {[1, 2, 4, 6, 8, 10].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="space-y-3">
        {ingredients.map((ingredient) => (
          <li key={ingredient.id} className="flex items-start">
            <button
              onClick={() => onIngredientToggle(ingredient.id)}
              className="mr-3 mt-0.5 flex-shrink-0"
              aria-label={checkedIngredients.includes(ingredient.id) ? 'Mark as not done' : 'Mark as done'}
            >
              <CheckCircle 
                className={`h-5 w-5 ${checkedIngredients.includes(ingredient.id) ? 'text-green-500' : 'text-gray-300'}`} 
              />
            </button>
            <span className={`${checkedIngredients.includes(ingredient.id) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
              <span className="font-medium">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeIngredients;
