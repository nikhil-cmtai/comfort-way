import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Header = ({ toggleSidebar, sidebarOpen }) => {
  const location = useLocation();
  
  // Create breadcrumbs from the current path
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    if (paths.length === 0) return [{ name: 'Dashboard', path: '/dashboard' }];
    
    return paths.map((path, index) => {
      const url = `/${paths.slice(0, index + 1).join('/')}`;
      return {
        name: path.charAt(0).toUpperCase() + path.slice(1),
        path: url
      };
    });
  };
  
  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="bg-white shadow-sm py-2 px-4 border-b">
      <div className="flex items-center justify-between h-12"> 
        <div className="flex items-center">
          {/* Menu toggle button for mobile */}
          <button 
            className="md:hidden p-2 mr-2 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-600 focus:outline-none"
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Breadcrumbs - hidden on small screens */}
          <nav className="hidden sm:flex text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.path} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-gray-400">/</span>}
                  <Link 
                    to={crumb.path}
                    className={`${
                      index === breadcrumbs.length - 1
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {crumb.name}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          
          {/* Current page title for small screens */}
          <div className="sm:hidden text-blue-600 font-medium">
            {breadcrumbs[breadcrumbs.length - 1]?.name || 'Dashboard'}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <span className="text-xs font-medium">US</span>
          </div>
          <div>
            <p className="text-xs font-medium text-gray-800">Admin User</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
