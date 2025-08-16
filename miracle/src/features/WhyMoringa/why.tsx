import { useState } from 'react';
import { Check } from 'lucide-react';

const MoringaTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const benefits = [
    {
      title: "Immunity Booster",
      icon: "🌿",
      details: [
        "High in Vitamin C, Vitamin A, Zinc, and Iron",
        "Boosts white blood cell production", 
        "Helps fight infection and inflammation",
        "Reference: Gopalakrishnan et al., 2016 – Food Science and Human Wellness"
      ]
    },
    {
      title: "Natural Energy Support",
      icon: "⚡",
      details: [
        "Rich in B-vitamins for sustained energy",
        "Iron content helps combat fatigue",
        "Natural amino acids support muscle function",
        "Reference: Vergara-Jimenez et al., 2017 – Journal of Food and Nutrition Research"
      ]
    },
    {
      title: "Heart Health Support", 
      icon: "❤️",
      details: [
        "Potassium helps regulate blood pressure",
        "Antioxidants support cardiovascular health",
        "Omega-3 fatty acids for heart function",
        "Reference: Mbikay, 2012 – Frontiers in Pharmacology"
      ]
    },
    {
      title: "Skin & Hair Health",
      icon: "✨", 
      details: [
        "Vitamin E and C for collagen production",
        "Antioxidants protect against free radicals",
        "Biotin supports healthy hair growth",
        "Reference: Paikra et al., 2017 – International Journal of Current Microbiology"
      ]
    }
  ];

  const nutrients = [
    { nutrient: "Vitamin C", function: "Immune support, skin health" },
    { nutrient: "Iron", function: "Energy production, oxygen transport" },
    { nutrient: "Calcium", function: "Bone health, muscle function" },
    { nutrient: "Zinc", function: "Immunity, wound healing" },
    { nutrient: "Amino Acids", function: "Muscle recovery, enzyme function" },
    { nutrient: "Antioxidants", function: "Fights aging and oxidative stress" }
  ];

  const whyChoosePoints = [
    { icon: "🌿", point: "Support your immune system with nature's multivitamin" },
    { icon: "⚡", point: "Fuel your day with natural, plant-powered energy" },
    { icon: "💪", point: "Strengthen your foundation—inside and out" },
    { icon: "❤️", point: "Support a healthier heart and better metabolic function" },
    { icon: "✨", point: "Glow from within—naturally" }
  ];

  const tabs = [
    { id: 0, label: "Why Choose Moringa?" },
    { id: 1, label: "Health Benefits" }, 
    { id: 2, label: "Key Nutrients" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-1 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-green-800 hover:bg-green-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Why Choose Moringa Tab */}
          {activeTab === 0 && (
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                  Why Choose Moringa?
                </h2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-4"></div>
                <p className="text-lg text-green-700 italic max-w-2xl mx-auto">
                  The "Miracle Tree" packed with essential nutrients
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whyChoosePoints.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
                  >
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <p className="text-green-800 font-medium leading-relaxed">
                      {item.point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Benefits Tab */}
          {activeTab === 1 && (
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                  Health Benefits
                </h2>
                <div className="w-20 h-1 bg-green-500 mx-auto mb-4"></div>
                <p className="text-lg text-green-700 font-semibold mb-4">
                  Why Moringa is the Miracle Tree
                </p>
                <p className="text-green-700 max-w-4xl mx-auto leading-relaxed">
                  Moringa oleifera, also known as the Miracle Tree, has been used in traditional medicine for centuries—and now, science is catching up. Our 100% pure Moringa powder is rich in vitamins, minerals, antioxidants, and essential amino acids that help support your health from the inside out.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-green-50 to-white border-2 border-green-200 rounded-xl p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg w-full max-w-md"
                  >
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{benefit.icon}</span>
                      <h3 className="text-xl font-bold text-green-800">{benefit.title}</h3>
                    </div>
                    
                    <ul className="space-y-3">
                      {benefit.details.map((detail, i) => (
                        <li key={i} className="flex items-start">
                          {i < benefit.details.length - 1 ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          ) : (
                            <span className="text-lg mr-3 mt-0.5">📚</span>
                          )}
                          <span className={`${
                            i < benefit.details.length - 1 
                              ? 'text-green-800' 
                              : 'text-gray-600 text-sm italic'
                          }`}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Nutrients Tab */}
          {activeTab === 2 && (
            <div className="p-6 md:p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                  Summary of Key Nutrients in Moringa
                </h2>
                <div className="w-20 h-1 bg-green-500 mx-auto"></div>
              </div>

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
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default MoringaTabs;