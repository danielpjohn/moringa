// AdminLayout.tsx
import { useEffect, useState } from 'react';
import Sidebar from './sidebar/sidebar';
import api from '../Login/api';
import { useNavigate } from 'react-router-dom';
import AdminLoadingSpinner from "../../molecules/admin/AdminLoadingSpinner";
import AdminErrorDisplay from '../../molecules/admin/AdminErrorDisplay';
import AdminDashboardHeader from '../../molecules/admin/AdminDashboardHeader';
import AdminStatsCard from '../../molecules/admin/AdminStatsCard';
import AdminWelcomeCard from '../../molecules/admin/AdminWelcomeCard';
import { Users, Package } from 'lucide-react';

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
      icon: Users,
      color: 'bg-indigo-500'
    },
    {
      title: 'Active Products',
      value: activeProducts,
      icon: Package,
      color: 'bg-green-500'
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
        
        {/* Main Content - responsive margin for desktop sidebar and mobile top offset */}
        <div className="lg:ml-64 mt-16 lg:mt-0">
          <AdminLoadingSpinner />
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
      
      {/* Main Content - responsive margin for desktop sidebar and mobile top offset */}
      <div className="lg:ml-64 mt-16 lg:mt-0 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-6">
          <AdminDashboardHeader 
            title="Admin Dashboard"
            description="Monitor your application's key metrics and performance"
          />
          
          {error && <AdminErrorDisplay error={error} />}

          {/* Stats Cards */}
          <div className="w-full max-w-4xl mb-6 sm:mb-8 md:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {cards.map((card, index) => (
                <AdminStatsCard key={index} {...card} />
              ))}
            </div>
          </div>

          <AdminWelcomeCard 
            title="Welcome to Your Dashboard"
            description="This is your central hub for monitoring and managing your application. Use the sidebar to navigate to different sections and manage your system effectively."
          />
        </div>
      </div>
    </div>
  );
}