import React from 'react';

interface Nutrient {
  name: string;
  amount: string;
  dailyValue: string;
}

interface NutrientCategory {
  category: string;
  nutrients: Nutrient[];
}

interface NutrientSummaryTableProps {
  categories: NutrientCategory[];
  servingSize: string;
  servingsPerContainer: string;
  calories: number;
}

const NutrientSummaryTable: React.FC<NutrientSummaryTableProps> = ({
  categories,
  servingSize,
  servingsPerContainer,
  calories
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="text-lg font-medium text-gray-900">Nutritional Information</h3>
        <p className="text-sm text-gray-500 mt-1">
          Serving Size: {servingSize} | Servings Per Container: {servingsPerContainer}
        </p>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-medium">Amount Per Serving</span>
          <span className="text-gray-600">% Daily Value*</span>
        </div>
        <div className="mt-1 flex justify-between items-center">
          <div>
            <span className="font-bold">Calories</span>
            <span className="ml-2 text-gray-600">{calories}</span>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {categories.map((category, index) => (
          <div key={index} className="px-6 py-4">
            <h4 className="font-medium text-gray-900 mb-2">{category.category}</h4>
            <div className="space-y-2">
              {category.nutrients.map((nutrient, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-gray-600">{nutrient.name}</span>
                  <div className="text-right">
                    <span className="font-medium">{nutrient.amount}</span>
                    {nutrient.dailyValue && (
                      <span className="ml-2 text-gray-500">{nutrient.dailyValue}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 text-xs text-gray-500 border-t border-gray-100">
        *Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.
      </div>
    </div>
  );
};

export default NutrientSummaryTable;
