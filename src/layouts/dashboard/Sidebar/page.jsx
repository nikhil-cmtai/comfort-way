import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(null);
  const [expandedItem, setExpandedItem] = useState(null);
  
  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { 
      label: 'Products', 
      path: '/dashboard/products', 
      icon: '📦',
      subItems: [
        { label: 'Categories', path: '/dashboard/products/categories', icon: '🏷️' },
        { label: 'Product List', path: '/dashboard/products', icon: '📋' }
      ]
    },
    { label: 'Maintenance Requests', path: '/dashboard/maintenance-request', icon: '🔧' },
    { label: 'Leads', path: '/dashboard/leads', icon: '👥' },
    { label: 'Logout', path: '/logout', icon: '🚪' },
  ];

  const toggleExpand = (path) => {
    if (expandedItem === path) {
      setExpandedItem(null);
    } else {
      setExpandedItem(path);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-gray-100 text-gray-800 h-full w-60 md:w-60 flex-shrink-0 p-6 border-r border-r-gray-200 shadow-md flex flex-col justify-between overflow-y-auto">
      <div>
        <div className="mb-10">
          <h1 className="text-2xl font-bold text-blue-700 tracking-tight">Comfort Way</h1>
          <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mt-2"></div>
        </div>
        
        <nav>
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isHovered = hovered === item.path;
              const isExpanded = expandedItem === item.path;
              const hasSubItems = item.subItems && item.subItems.length > 0;
              
              return (
                <li key={item.path}>
                  <div 
                    className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                      isActive 
                        ? 'bg-blue-100 text-blue-700 font-medium shadow-sm' 
                        : 'hover:bg-white hover:shadow-sm'
                    }`}
                    onMouseEnter={() => setHovered(item.path)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => hasSubItems ? toggleExpand(item.path) : null}
                  >
                    <div className={`text-xl ${isActive || isHovered ? 'scale-110' : ''} transition-transform duration-200`}>
                      {item.icon}
                    </div>
                    {hasSubItems ? (
                      <span className={`${isActive ? 'transform translate-x-1' : ''} transition-transform duration-200`}>
                        {item.label}
                      </span>
                    ) : (
                      <Link to={item.path} className="flex-grow">
                        <span className={`${isActive ? 'transform translate-x-1' : ''} transition-transform duration-200`}>
                          {item.label}
                        </span>
                      </Link>
                    )}
                    {hasSubItems && (
                      <div className="ml-auto">
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    )}
                    {isActive && !hasSubItems && (
                      <div className="ml-auto w-1.5 h-5 bg-blue-500 rounded-full"></div>
                    )}
                  </div>

                  {/* Sub-menu */}
                  {hasSubItems && isExpanded && (
                    <ul className="mt-2 ml-6 space-y-2">
                      {item.subItems.map((subItem) => {
                        const isSubActive = location.pathname === subItem.path;
                        
                        return (
                          <li key={subItem.path}>
                            <Link 
                              to={subItem.path} 
                              className={`flex items-center p-2 rounded-md transition-all duration-200 ${
                                isSubActive 
                                  ? 'bg-blue-50 text-blue-700 font-medium' 
                                  : 'hover:bg-white hover:text-blue-600'
                              }`}
                            >
                              <div className="text-lg mr-2">{subItem.icon}</div>
                              <span className="ml-2">{subItem.label}</span>
                              {isSubActive && (
                                <div className="ml-auto w-1 h-4 bg-blue-500 rounded-full"></div>
                              )}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
      
      <div className="text-xs text-center text-gray-500 pt-4 border-t border-gray-200 mt-6">
        <p>© 2023 Comfort Way</p>
      </div>
    </div>
  );
};

export default Sidebar;

    