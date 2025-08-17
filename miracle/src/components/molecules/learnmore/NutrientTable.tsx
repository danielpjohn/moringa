import React from 'react';

interface Nutrient {
  nutrient: string;
  function: string;
}

interface NutrientTableProps {
  nutrients: Nutrient[];
}

const NutrientTable: React.FC<NutrientTableProps> = ({ nutrients }) => {
  return (
    <div className="overflow-x-auto">
      <div className="bg-white border-2 border-green-200 rounded-xl overflow-hidden shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="text-left py-4 px-6 font-bold text-lg">Nutrient</th>
              <th className="text-left py-4 px-6 font-bold text-lg">Function</th>
            </tr>
          </thead>
          <tbody>
            {nutrients.map((row, index) => (
              <tr 
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-green-50' : 'bg-white'
                } border-b border-green-100 hover:bg-green-100 transition-colors duration-200`}
              >
                <td className="py-4 px-6 font-semibold text-green-800">
                  {row.nutrient}
                </td>
                <td className="py-4 px-6 text-green-700">
                  {row.function}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutrientTable;
