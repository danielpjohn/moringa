import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../sidebar/sidebar";
import { FormHeader, CouponFormField, ResponsiveLayout, SubmitButton } from '../../../molecules/admin';

export default function AddCouponPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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

  const goToContactForCoupon = () => {
    navigate('/contact', {
      state: {
        message: 'Fill your email and submit the form – your coupon will be sent to your inbox.'
      }
    });
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

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <ResponsiveLayout
        isMobileView={isMobileView}
        isTabletView={isTabletView}
        isDesktopView={isDesktopView}
      >
        <FormHeader
          icon={
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          }
          title="Create New Coupon"
          subtitle="Boost your sales with special discounts"
        />

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
            <CouponFormField
              label="Coupon Code"
              type="text"
              name="code"
              placeholder="SUMMER20"
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
            />
            <CouponFormField
              label="Discount Percentage"
              type="number"
              name="discount"
              placeholder="20"
              min="1"
              max="100"
              suffix="%"
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
            />
            <CouponFormField
              label="Expiry Date"
              type="date"
              name="expiryDate"
              isMobileView={isMobileView}
              isTabletView={isTabletView}
              isDesktopView={isDesktopView}
            />
          </div>

          <div className={`
            ${isMobileView ? 'pt-1' : ''}
            ${isTabletView ? 'pt-2' : ''}
            ${isDesktopView ? 'pt-3' : ''}
          `}>
            <SubmitButton
              isLoading={false}
              label="Get Coupon"
              loadingLabel="Redirecting..."
              type="button"
              onClick={goToContactForCoupon}
              icon={
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              }
            />
          </div>
        </div>
      </ResponsiveLayout>
    </div>
  );
}