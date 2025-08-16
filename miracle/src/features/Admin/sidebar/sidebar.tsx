import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Login/AuthContext';
import { useState, useEffect } from 'react';
import defaultLogo from '../../logo/treelogo.png'; // Fallback logo

const SIDEBAR_ITEMS = [
  {
    title: 'User Management',
    path: '/user',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Add Category',
    path: '/addcategory',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Add Product',
    path: '/addproduct',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    title: 'Add Coupon',
    path: '/coupon',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
];

interface SidebarProps {
  onClose: () => void;
  onNavClick: () => void;
  isMobile: boolean;
}

export default function Sidebar({ onNavClick }: SidebarProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [logoUrl, setLogoUrl] = useState(defaultLogo);
  const [isLoadingLogo, setIsLoadingLogo] = useState(true);

  // Fetch logo from backend
  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get-all-images/');
        if (response.ok) {
          const data: Array<{ id: number; image: string; uploaded_at: string }> = await response.json();
          // console.log('Fetched images:', data);

          if (data && data.length > 0) {
            const logo = data.find((item: { image: string }) =>
              item.image.toLowerCase().includes('logo')
            ) || data[0];
            console.log('Using image URL:', logo.image);
            setLogoUrl(logo.image);
          } else {
            console.log('No images found in response, using default logo');
          }
        } else {
          console.log('Failed to fetch images, status:', response.status);
        }
      } catch (error) {
        console.error('Failed to fetch logo:', error);
      }
    };

    fetchLogo();
  }, []);


  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = defaultLogo;
  };

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
            <button
              onClick={handleLogoClick}
              className="flex items-center h-20 px-6 hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-3">
                {isLoadingLogo ? (
                  <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
                ) : (
                  <img
                    src={logoUrl}
                    alt="Tree Logo"
                    className="h-12 w-12"
                    onError={handleImageError}
                  />
                )}
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-xs text-gray-600">Management System</p>
                </div>
              </div>
            </button>

            {/* User info and toggle button */}
            <div className="flex items-center space-x-3">
              {/* User avatar - visible on tablet */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full border-2 border-green-200 shadow-md"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="User profile"
                  />
                  <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    Administrator
                  </p>
                </div>
              </div>

              {/* Toggle button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 mr-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all shadow-lg"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Collapsible dropdown menu */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="bg-white border-t border-gray-100 shadow-xl">
              <div className="py-2">
                {/* User info - shown on mobile */}
                <div className="px-4 py-4 border-b border-gray-100 sm:hidden bg-gradient-to-r from-green-50 to-emerald-50">
                  <div className="flex items-center">
                    <div className="relative flex-shrink-0">
                      <img
                        className="h-12 w-12 rounded-full border-3 border-green-200 shadow-md"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="User profile"
                      />
                      <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {user?.name || 'Admin User'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {user?.email || 'Administrator'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation items */}
                <nav className="py-2">
                  {SIDEBAR_ITEMS.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={handleMobileNavClick}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-4 mx-2 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-700 transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-l-4 border-green-500 font-semibold shadow-sm' : ''
                        }`
                      }
                      end
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`p-2 rounded-lg ${isActive ? item.bgColor : 'bg-gray-100'} mr-3`}>
                            <span className={isActive ? item.color : 'text-gray-600'}>
                              {item.icon}
                            </span>
                          </div>
                          <span className="text-sm font-medium">{item.title}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </nav>

                {/* Logout button */}
                <div className="border-t border-gray-100 pt-2 px-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 rounded-xl"
                  >
                    <div className="p-2 rounded-lg bg-gray-100 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Logout</span>
                  </button>
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
      {/* Logo section - White logo on green background for desktop */}
      <button
        onClick={handleLogoClick}
        className="flex items-center h-20 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
      >
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            {isLoadingLogo ? (
              <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
            ) : (
              <img
                src={logoUrl}
                alt="Tree Logo"
                className="h-8 w-8 brightness-0 invert"
                onError={handleImageError}
              />
            )}
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-xs text-green-100">Management System</p>
          </div>
        </div>
      </button>

      {/* Navigation items */}
      <div className="flex-1 flex flex-col overflow-y-auto p-4">
        <nav className="flex-1 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-4 rounded-xl transition-all duration-200 group hover:shadow-md ${isActive
                  ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 font-semibold shadow-lg border-l-4 border-green-500'
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900'
                }`
              }
              end
            >
              {({ isActive }) => (
                <>
                  <div className={`p-3 rounded-lg transition-all duration-200 ${isActive ? item.bgColor : 'bg-gray-100 group-hover:bg-gray-200'
                    } mr-4`}>
                    <span className={`transition-colors duration-200 ${isActive ? item.color : 'text-gray-600 group-hover:text-gray-700'
                      }`}>
                      {item.icon}
                    </span>
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom section with user and logout */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="px-4 py-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 mb-4">
            <div className="flex items-center">
              <div className="relative flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full border-3 border-green-200 shadow-md"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User profile"
                />
                <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-white"></span>
              </div>
              <div className="ml-4 min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {user?.email || 'Administrator'}
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-4 text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 rounded-xl transition-all duration-200 hover:shadow-md"
          >
            <div className="p-2 rounded-lg bg-gray-100 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
} 