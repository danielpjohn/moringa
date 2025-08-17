import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Login/AuthContext';
import { useState, useEffect } from 'react';
import { ADMIN_SIDEBAR_ITEMS } from '../../../../constants/navigation';
import NavigationLink from '../../../molecules/layout/NavigationLink';
import LogoHeader from '../../../molecules/layout/LogoHeader';
import MobileMenuToggle from '../../../molecules/layout/MobileMenuToggle';
import Button from '../../../atoms/Button';
import Icon from '../../../atoms/Icon';
// Use a public asset as a safe default logo; Logo component will fetch the real one
const defaultLogo = '/vite.svg';

interface SidebarProps {
  onClose: () => void;
  onNavClick: () => void;
  isMobile: boolean;
}

export default function Sidebar({ onNavClick }: SidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleLogoClick = () => {
    navigate('/admin');
  };

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
    onNavClick();
  };

  // Mobile/Tablet view (below 1024px) - collapsible navbar
  if (windowWidth < 1024) {
    return (
      <>
        {/* Mobile/Tablet top navbar */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-lg lg:hidden z-50">
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo - No background color for mobile */}
            <LogoHeader
              defaultLogo={defaultLogo}
              title="Admin Panel"
              subtitle="Management System"
              onClick={handleLogoClick}
              size="lg"
            />

            {/* User info and toggle button */}
            <div className="flex items-center space-x-3">

              <MobileMenuToggle
                isOpen={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>

          {/* Collapsible dropdown menu */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white border-t border-gray-100 shadow-xl">
              <div className="py-2">

                <nav className="py-2">
                  {ADMIN_SIDEBAR_ITEMS.map((item) => (
                    <NavigationLink
                      key={item.path}
                      title={item.title}
                      path={item.path}
                      icon={item.icon as any}
                      color={item.color}
                      bgColor={item.bgColor}
                      onClick={handleMobileNavClick}
                      isMobile={true}
                    />
                  ))}
                </nav>

                <div className="border-t border-gray-100 pt-2 px-2">
                  <Button
                    onClick={handleLogout}
                    variant="danger"
                    className="flex items-center w-full justify-start bg-transparent hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 text-gray-700 hover:text-red-700 shadow-none"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 mr-3">
                      <Icon name="logout" className="text-gray-600" />
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-25 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </>
    );
  }

  // Desktop view (1024px and above) - fixed sidebar
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 shadow-xl w-64">
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
        <LogoHeader
          defaultLogo={defaultLogo}
          title="Admin Panel"
          subtitle="Management System"
          onClick={handleLogoClick}
          variant="inverted"
          size="md"
        />
      </div>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        <nav className="flex-1 space-y-2">
          {ADMIN_SIDEBAR_ITEMS.map((item) => (
            <NavigationLink
              key={item.path}
              title={item.title}
              path={item.path}
              icon={item.icon as any}
              color={item.color}
              bgColor={item.bgColor}
              onClick={onNavClick}
              isMobile={false}
            />
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-200">
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center w-full justify-start bg-transparent hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 text-gray-700 hover:text-red-700 shadow-none mt-4"
          >
            <div className="p-2 rounded-lg bg-gray-100 mr-3">
              <Icon name="logout" className="text-gray-600" />
            </div>
            <span className="text-sm font-medium">Logout</span>
          </Button>
        </div>
      </div>
    </div>
  );
}