// AdminLayout.tsx
import { useEffect, useState } from 'react';
import Sidebar from './sidebar/sidebar';
import api from '../Login/api';
import { useNavigate } from 'react-router-dom';

type UserStats = {
  total_users: number;
  active_users: number;
};

type Product = {
  id: number;
  name: string;
  is_active: boolean;
};

type ApiError = {
  response?: {
    status?: number;
    data?: any;
  };
  message?: string;
};

export default function AdminLayout() {
  const [userStats, setUserStats] = useState<UserStats>({ total_users: 0, active_users: 0 });
  const [activeProducts, setActiveProducts] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [, setIsMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [usersResponse, productsResponse] = await Promise.all([
          api.get('user-count/'),
          api.get('products/')
        ]);
        
        if (!usersResponse.data || !productsResponse.data) {
          throw new Error('Invalid data received from server');
        }

        setUserStats(usersResponse.data);
        const activeCount = Array.isArray(productsResponse.data) 
          ? productsResponse.data.filter((product: Product) => product.is_active).length
          : 0;
        setActiveProducts(activeCount);
      } catch (err: unknown) {
        console.error('Fetch error:', err);
        const error = err as ApiError;
        
        if (error.response?.status === 401) {
          navigate('/login');
          return;
        }

        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const cards = [
    {
      title: 'Total Users',
      value: userStats.total_users,
      icon: '👥',
      bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-100',
      textColor: 'text-indigo-600',
      iconBg: 'bg-indigo-500',
      borderColor: 'border-indigo-200'
    },
    {
      title: 'Active Products',
      value: activeProducts,
      icon: '📦',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100',
      textColor: 'text-green-600',
      iconBg: 'bg-green-500',
      borderColor: 'border-green-200'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Fixed Sidebar for desktop (1024px+) */}
        <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-10">
          <Sidebar 
            onClose={handleMobileMenuClose} 
            onNavClick={handleNavClick} 
            isMobile={false} 
          />
        </div>
        
        {/* Mobile Navbar (below 1024px) */}
        <div className="lg:hidden">
          <Sidebar 
            onClose={handleMobileMenuClose} 
            onNavClick={handleNavClick} 
            isMobile={true} 
          />
        </div>
        
        {/* Main Content - responsive margin for desktop sidebar */}
        <div className="lg:ml-64 min-h-screen flex items-center justify-center p-6">
          <div className="text-center bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-200 max-w-md mx-auto">
            <div className="mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h3>
            <p className="text-sm sm:text-base text-gray-600">Please wait while we fetch your data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Fixed Sidebar for desktop (1024px+) */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-10">
        <Sidebar 
          onClose={handleMobileMenuClose} 
          onNavClick={handleNavClick} 
          isMobile={false} 
        />
      </div>
      
      {/* Mobile Navbar (below 1024px) */}
      <div className="lg:hidden">
        <Sidebar 
          onClose={handleMobileMenuClose} 
          onNavClick={handleNavClick} 
          isMobile={true} 
        />
      </div>
      
      {/* Main Content - responsive margin for desktop sidebar */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6">
          {/* Header Section */}
          <div className="w-full max-w-4xl text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
              Admin Dashboard
            </h1>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Monitor your application's key metrics and performance
            </p>
          </div>
          
          {/* Error Display */}
          {error && (
            <div className="w-full max-w-4xl mb-6 sm:mb-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <span className="text-red-500 text-lg sm:text-xl mr-3 flex-shrink-0">⚠️</span>
                  <p className="text-red-700 font-medium text-sm sm:text-base">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="w-full max-w-4xl mb-8 sm:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {cards.map((card, index) => (
                <div 
                  key={index} 
                  className={`${card.bgColor} ${card.borderColor} border-2 p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-600 text-xs sm:text-sm font-medium uppercase tracking-wider mb-2 truncate">
                        {card.title}
                      </p>
                      <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${card.textColor} mb-2`}>
                        {card.value.toLocaleString()}
                      </p>
                      <div className="w-8 sm:w-12 h-1 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full"></div>
                    </div>
                    <div className={`${card.iconBg} w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg ml-4 sm:ml-6 flex-shrink-0`}>
                      <span className="text-lg sm:text-2xl filter drop-shadow-sm">{card.icon}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Content Section */}
          <div className="w-full max-w-4xl">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                Welcome to Your Dashboard
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
                This is your central hub for monitoring and managing your application. 
                Use the sidebar to navigate to different sections and manage your system effectively.
              </p>
              <div className="flex justify-center">
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span>System Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}