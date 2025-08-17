import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Instruction {
  id: number;
  step: number;
  description: string;
}

interface RecipeInstructionsProps {
  instructions: Instruction[];
  completedSteps: number[];
  onStepToggle: (step: number) => void;
}

const RecipeInstructions: React.FC<RecipeInstructionsProps> = ({
  instructions,
  completedSteps,
  onStepToggle
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
      
      <ol className="space-y-4">
        {instructions.map((instruction) => (
          <li key={instruction.id} className="flex items-start">
            <button
              onClick={() => onStepToggle(instruction.step)}
              className={`flex-shrink-0 mr-4 mt-1 flex items-center justify-center h-8 w-8 rounded-full ${
                completedSteps.includes(instruction.step)
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
              aria-label={completedSteps.includes(instruction.step) ? 'Mark step as not completed' : 'Mark step as completed'}
            >
              {completedSteps.includes(instruction.step) ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <span className="font-medium">{instruction.step}</span>
              )}
            </button>
            <p 
              className={`text-gray-700 ${completedSteps.includes(instruction.step) ? 'line-through text-gray-400' : ''}`}
            >
              {instruction.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeInstructions;
