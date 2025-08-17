import type { ReactNode } from 'react';

interface ResponsiveLayoutProps {
  children: ReactNode;
  isMobileView: boolean;
  isTabletView: boolean;
  isDesktopView: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  centered?: boolean;
  glassMorphism?: boolean;
  className?: string;
}

const ResponsiveLayout = ({ 
  children, 
  isMobileView, 
  isTabletView, 
  isDesktopView,
  maxWidth = 'lg',
  centered = true,
  glassMorphism = true,
  className = ''
}: ResponsiveLayoutProps) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case 'sm': return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-sm' : 'max-w-md';
      case 'md': return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-md' : 'max-w-lg';
      case 'lg': return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-lg' : 'max-w-2xl';
      case 'xl': return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-xl' : 'max-w-4xl';
      case '2xl': return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-2xl' : 'max-w-6xl';
      case 'full': return 'max-w-full';
      default: return isMobileView ? 'max-w-full' : isTabletView ? 'max-w-lg' : 'max-w-2xl';
    }
  };
  return (
    <div className={`
      flex-1 min-h-screen transition-all duration-300 w-full overflow-x-hidden
      ${isDesktopView ? 'ml-64' : ''}
      ${isMobileView ? 'pt-4' : ''}
      ${isTabletView ? 'pt-16' : ''}
    `}>
      <div className={`
        w-full min-w-0 min-h-screen ${centered ? 'flex items-center justify-center' : 'flex'}
        ${isMobileView ? 'px-4 py-4' : ''}
        ${isTabletView ? 'px-6 py-6' : ''}
        ${isDesktopView ? 'px-8 py-8' : ''}
      `}>
        <div className={`
          w-full ${getMaxWidthClass()}
        `}>
          <div className={`
            ${glassMorphism ? 'bg-white/90 backdrop-blur-lg shadow-2xl border border-white/20' : 'bg-white shadow-lg border border-gray-200'}
            ${isMobileView ? 'p-4 rounded-lg' : ''}
            ${isTabletView ? 'p-6 rounded-xl' : ''}
            ${isDesktopView ? 'p-8 rounded-2xl' : ''}
            ${className}
          `}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveLayout;
