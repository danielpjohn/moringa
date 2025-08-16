import { useState, useEffect } from 'react';
import Sidebar from "../sidebar/sidebar";

export default function AddCouponPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSidebarClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Responsive breakpoints
  const isMobileView = windowWidth < 768;
  const isTabletView = windowWidth >= 768 && windowWidth < 1024;
  const isDesktopView = windowWidth >= 1024;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-green-50 relative">
      {/* Desktop Sidebar - Only render on desktop */}
      {isDesktopView && (
        <div className="w-64 fixed h-full bg-white/90 backdrop-blur-md shadow-xl z-40 border-r border-white/20">
          <Sidebar 
            onClose={handleSidebarClose}
            onNavClick={handleNavClick}
            isMobile={false}
          />
        </div>
      )}

      {/* Mobile & Tablet Sidebar - Rendered by Sidebar component itself */}
      {!isDesktopView && (
        <Sidebar 
          onClose={handleSidebarClose}
          onNavClick={handleNavClick}
          isMobile={true}
        />
      )}

      {/* Main Content */}
      <div className={`
        flex-1 min-h-screen transition-all duration-300 w-full overflow-x-hidden
        ${isDesktopView ? 'ml-64' : ''}
        ${isMobileView ? 'pt-4' : ''}
        ${isTabletView ? 'pt-16' : ''}
      `}>
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div className={`
          w-full min-w-0 min-h-screen flex items-center justify-center
          ${isMobileView ? 'px-4 py-4' : ''}
          ${isTabletView ? 'px-6 py-6' : ''}
          ${isDesktopView ? 'px-8 py-8' : ''}
        `}>
          <div className={`
            w-full
            ${isMobileView ? 'max-w-full' : ''}
            ${isTabletView ? 'max-w-lg' : ''}
            ${isDesktopView ? 'max-w-2xl' : ''}
          `}>
            {/* Glass Card */}
            <div className={`
              bg-white/90 backdrop-blur-lg shadow-2xl border border-white/20
              ${isMobileView ? 'p-4 rounded-lg' : ''}
              ${isTabletView ? 'p-6 rounded-xl' : ''}
              ${isDesktopView ? 'p-8 rounded-2xl' : ''}
            `}>
              {/* Header with animated icon */}
              <div className={`
                text-center
                ${isMobileView ? 'mb-4' : ''}
                ${isTabletView ? 'mb-6' : ''}
                ${isDesktopView ? 'mb-8' : ''}
              `}>
                <div className={`
                  inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg transform transition-transform hover:scale-105
                  ${isMobileView ? 'w-10 h-10 rounded-lg mb-2' : ''}
                  ${isTabletView ? 'w-12 h-12 rounded-lg mb-3' : ''}
                  ${isDesktopView ? 'w-14 h-14 rounded-xl mb-4' : ''}
                `}>
                  <svg 
                    className={`text-white ${isMobileView ? 'w-5 h-5' : 'w-6 h-6'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <h2 className={`
                  font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1
                  ${isMobileView ? 'text-xl' : ''}
                  ${isTabletView ? 'text-2xl' : ''}
                  ${isDesktopView ? 'text-3xl' : ''}
                `}>
                  Create New Coupon
                </h2>
                <p className={`
                  text-gray-500 font-medium
                  ${isMobileView ? 'text-xs' : 'text-sm'}
                `}>
                  Boost your sales with special discounts
                </p>
              </div>

              {/* Form */}
              <div className={`
                mx-auto
                ${isMobileView ? 'space-y-4 max-w-full' : ''}
                ${isTabletView ? 'space-y-5 max-w-sm' : ''}
                ${isDesktopView ? 'space-y-6 max-w-md' : ''}
              `}>
                <div className={`
                  ${isMobileView ? 'space-y-3' : ''}
                  ${isTabletView ? 'space-y-4' : ''}
                  ${isDesktopView ? 'space-y-5' : ''}
                `}>
                  {/* Coupon Code */}
                  <div className={`
                    ${isMobileView ? 'space-y-1' : 'space-y-2'}
                  `}>
                    <label className={`
                      block font-semibold text-gray-700 uppercase tracking-wider text-center
                      ${isMobileView ? 'text-xs' : 'text-sm'}
                    `}>
                      Coupon Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className={`
                          w-full border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-center font-medium transition-all duration-300
                          ${isMobileView ? 'px-3 py-2 rounded-md text-sm' : ''}
                          ${isTabletView ? 'px-4 py-2.5 rounded-lg text-base' : ''}
                          ${isDesktopView ? 'px-4 py-3 rounded-lg text-base' : ''}
                        `}
                        placeholder="SUMMER20"
                      />
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none
                        ${isMobileView ? 'rounded-md' : 'rounded-lg'}
                      `}></div>
                    </div>
                  </div>

                  {/* Discount Percentage */}
                  <div className={`
                    ${isMobileView ? 'space-y-1' : 'space-y-2'}
                  `}>
                    <label className={`
                      block font-semibold text-gray-700 uppercase tracking-wider text-center
                      ${isMobileView ? 'text-xs' : 'text-sm'}
                    `}>
                      Discount Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="1"
                        max="100"
                        className={`
                          w-full border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-center font-medium transition-all duration-300
                          ${isMobileView ? 'px-3 py-2 rounded-md text-sm' : ''}
                          ${isTabletView ? 'px-4 py-2.5 rounded-lg text-base' : ''}
                          ${isDesktopView ? 'px-4 py-3 rounded-lg text-base' : ''}
                        `}
                        placeholder="20"
                      />
                      <div className={`
                        absolute top-1/2 transform -translate-y-1/2 text-gray-400 font-medium
                        ${isMobileView ? 'right-2 text-xs' : 'right-3 text-sm'}
                      `}>%</div>
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none
                        ${isMobileView ? 'rounded-md' : 'rounded-lg'}
                      `}></div>
                    </div>
                  </div>

                  {/* Expiry Date */}
                  <div className={`
                    ${isMobileView ? 'space-y-1' : 'space-y-2'}
                  `}>
                    <label className={`
                      block font-semibold text-gray-700 uppercase tracking-wider text-center
                      ${isMobileView ? 'text-xs' : 'text-sm'}
                    `}>
                      Expiry Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        className={`
                          w-full border-2 border-gray-200 hover:border-green-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-center font-medium transition-all duration-300 appearance-none
                          ${isMobileView ? 'px-3 py-2 rounded-md text-sm' : ''}
                          ${isTabletView ? 'px-4 py-2.5 rounded-lg text-base' : ''}
                          ${isDesktopView ? 'px-4 py-3 rounded-lg text-base' : ''}
                        `}
                      />
                      <div className={`
                        absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 pointer-events-none
                        ${isMobileView ? 'rounded-md' : 'rounded-lg'}
                      `}></div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className={`
                  ${isMobileView ? 'pt-1' : ''}
                  ${isTabletView ? 'pt-2' : ''}
                  ${isDesktopView ? 'pt-3' : ''}
                `}>
                  <button 
                    className={`
                      w-full flex justify-center items-center shadow-md font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                      ${isMobileView ? 'py-2 px-3 rounded-md text-sm' : ''}
                      ${isTabletView ? 'py-2.5 px-4 rounded-lg text-base' : ''}
                      ${isDesktopView ? 'py-3 px-5 rounded-lg text-base' : ''}
                    `}
                  >
                    <svg className={`mr-2 ${isMobileView ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Generate Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}