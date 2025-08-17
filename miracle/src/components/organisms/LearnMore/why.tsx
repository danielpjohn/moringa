import { useState } from 'react';
import TabNavigation from '../../molecules/common/TabNavigation.tsx';
import BenefitCard from '../../molecules/about/BenefitCard.tsx';
import FeaturePoint from '../../molecules/about/FeaturePoint.tsx';
import NutrientTable from '../../molecules/learnmore/NutrientTable.tsx';

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
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto no-scrollbar">
          <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
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
                  <FeaturePoint key={index} icon={item.icon} point={item.point} />
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
                  <BenefitCard 
                    key={index}
                    title={benefit.title}
                    icon={benefit.icon}
                    details={benefit.details}
                  />
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

              <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto">
                <NutrientTable nutrients={nutrients} />
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default MoringaTabs;