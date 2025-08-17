import React from 'react';

interface Tab {
  id: number;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white rounded-xl shadow-lg p-2 w-full max-w-full sm:max-w-3xl flex flex-col md:flex-row gap-2 md:gap-3 lg:gap-4 md:justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 md:px-6 py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 whitespace-nowrap text-left md:text-center ${
              activeTab === tab.id
                ? 'bg-green-600 text-white shadow-md'
                : 'text-green-800 hover:bg-green-50'
            } ${'w-full md:w-auto'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
