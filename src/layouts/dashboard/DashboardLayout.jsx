import React, { useState, useEffect } from 'react';
import Header from './Header/page';
import Sidebar from './Sidebar/page';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Auto close sidebar on small screens and reopen on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Set initial state based on screen size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden"> 
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          fixed md:relative z-10 md:translate-x-0 transition-transform duration-300 h-full`}
      >
        <Sidebar />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-0"
          onClick={toggleSidebar}
        ></div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

