// src/features/Admin/addProduct/AddProductPage.tsx
import { useState, useEffect } from 'react';
import Sidebar from "../sidebar/sidebar";
import AddProductForm from "./AddProductForm";
import ProductList from "./productList";
import type { Product } from './types/product';

const AddProductPage = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmitSuccess = () => {
    setRefreshKey(prev => prev + 1);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = () => {
    console.log('Navigation clicked');
  };

  const handleSidebarClose = () => {
    console.log('Sidebar closed');
  };

  // Responsive breakpoints
  const isMobileView = windowWidth < 768;
  const isTabletView = windowWidth >= 768 && windowWidth < 1024;
  const isDesktopView = windowWidth >= 1024;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Only render on desktop */}
      {isDesktopView && (
        <div className="w-64 fixed h-full bg-white shadow-md z-40">
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

      {/* Main Content Container */}
      <div className={`
        flex-1 min-h-screen transition-all duration-300 w-full overflow-x-hidden
        ${isDesktopView ? 'ml-64' : ''}
        ${isMobileView ? 'pt-16' : ''}
        ${isTabletView ? 'pt-16' : ''}
      `}>
        {/* Content Wrapper with responsive padding and spacing */}
        <div className={`
          w-full min-w-0
          ${isMobileView ? 'px-4 py-4 space-y-4' : ''}
          ${isTabletView ? 'px-6 py-4 space-y-4' : ''}
          ${isDesktopView ? 'px-6 py-6 space-y-6 max-w-7xl mx-auto' : ''}
        `}>
          
          {/* Add Product Form */}
          <div className={`
            bg-white shadow-sm border border-gray-200 overflow-hidden w-full
            ${isMobileView ? 'rounded-lg mx-0' : 'rounded-xl'}
          `}>
            <AddProductForm 
              onSubmitSuccess={handleSubmitSuccess} 
              onCancel={handleCancel}
              editingProduct={editingProduct}
            />
          </div>

          {/* Product List */}
          <div className={`
            bg-white shadow-sm border border-gray-200 overflow-hidden w-full
            ${isMobileView ? 'rounded-lg mx-0' : 'rounded-xl'}
          `}>
            <div className={`
              ${isMobileView ? 'p-3' : ''}
              ${isTabletView ? 'p-4' : ''}
              ${isDesktopView ? 'p-4 lg:p-6' : ''}
            `}>
              <ProductList 
                onEdit={handleEdit} 
                refreshKey={refreshKey}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;