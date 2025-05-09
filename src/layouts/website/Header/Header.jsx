import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, CircleUserRound, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // For desktop dropdown
  const userDropdownRef = useRef(null); // For dropdown
  const devicePlansRef = useRef(null); // Ref for mega menu area

  const devicePlans = [
    { name: 'AC', path: '/maintenance-repair/ac', new: true },
    { name: 'RO', path: '/maintenance-repair/ro', new: true },
    { name: 'Electrical', path: '/maintenance-repair/electrical', new: true },
    { name: 'Plumbing', path: '/maintenance-repair/plumbing', new: true },
    { name: 'Home Appliances', path: '/maintenance-repair/home-appliances', new: true },
    { name: 'Kitchen Appliances', path: '/maintenance-repair/kitchen-appliances', new: true },
    { name: 'Buy/Rent', path: '/buy-rent', separator: true },
    { name: 'About Us', path: '/about', separator: true },
  ];

  const navigation = [
    { name: 'Maintenance & Repairs', path: '/maintenance-repair', separator: true },
    { name: 'Home Protection', path: '/home-protection', separator: true, new: true },
    { name: 'Buy/Rent', path: '/buy-rent', separator: true },
    { name: 'About Us', path: '/about' },
  ];



  const legals = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms of Service', path: '/terms-of-service' },
  ];

  const userDropdownItems = [
    { name: 'Sign In/Sign Up', path: '/sign-in' },
    { name: 'My Profile', path: '/sign-in' },
    { name: 'Raise Service Request', path: '/raise-request' },
    { name: 'Help & Support', path: '/contact' },
  ];

  // --- Close Dropdown/Drawer Logic --- 
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close User Dropdown (desktop)
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
      // Close Device Plans Mega Menu
      if (devicePlansRef.current && !devicePlansRef.current.contains(event.target)) {
        const triggerLink = document.getElementById('device-plans-trigger');
        if (!triggerLink || !triggerLink.contains(event.target)) {
          setIsDevicePlansOpen(false);
        }
      }
      // Close mobile menu on click outside
      const mobileMenuContent = document.getElementById('mobile-menu-content');
      const mobileMenuButton = document.getElementById('mobile-menu-button');
      if (isMenuOpen && mobileMenuContent && !mobileMenuContent.contains(event.target) && (!mobileMenuButton || !mobileMenuButton.contains(event.target))) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // --- Hover Handlers for User Dropdown (desktop) --- 
  const handleUserMouseEnter = () => setIsUserDropdownOpen(true);
  const handleUserMouseLeave = () => {
    setTimeout(() => {
      if (userDropdownRef.current && !userDropdownRef.current.matches(':hover')) {
        setIsUserDropdownOpen(false);
      }
    }, 100);
  };

  return (
    <header className="bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          {/* Mobile menu button (left) */}
          <button
            id="mobile-menu-button"
            className="md:hidden text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 rounded-md p-2 mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="sr-only">Open menu</span>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              <img src="/logo.png" alt="ComfortWay" className="h-16 w-full" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm lg:text-base font-medium text-gray-600 hover:text-indigo-600 relative"
              >
                {item.name}
                {item.new && (
                  <span className="absolute -top-2 -right-4 text-xs font-semibold text-white bg-red-500 px-1.5 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* User Icon Button (right, all screens) */}
          <button
            className="flex md:hidden items-center justify-center px-3 shadow-sm text-base font-medium bg-white text-gray-700 ml-2"
            onMouseEnter={handleUserMouseEnter}
            onMouseLeave={handleUserMouseLeave}
            aria-label="Open profile dropdown"
            ref={userDropdownRef}
          >
            <CircleUserRound className="h-8 w-8 text-indigo-600" />
          </button>

          <button
            className="hidden md:flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            onClick={() => setIsUserDropdownOpen((open) => !open)}
          >
            <User className="mr-2 h-5 w-5 text-indigo-600" />
            Sign In/Up
          </button>

          {/* User Dropdown (all screens) */}
          {isUserDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
              style={{ top: '100%', right: 0 }}
              ref={userDropdownRef}
            >
              {/* Optional close button for mobile */}

              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {userDropdownItems.map((item) => (
                  <div key={item.name}>
                    {item.separator && <div className="border-t border-gray-200 mx-1 my-1"></div>}
                    <Link
                      to={item.path}
                      className={`block px-4 py-2 text-sm ${item.separator ? 'text-gray-500' : 'text-gray-700'} hover:bg-gray-100 hover:text-gray-900`}
                      role="menuitem"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Mobile Menu Drawer --- */}
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sliding Panel */}
      <div
        id="mobile-menu-content"
        className={`fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
          <Link to="/" className="text-xl font-bold text-indigo-600" onClick={() => setIsMenuOpen(false)}>
            <img src="/logo.png" alt="ComfortWay" className="h-16 w-full" />
          </Link>
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 bg-gray-100 hover:bg-gray-200 rounded-md p-2"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        {/* Drawer Content (Scrollable) */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6">
          <div className="space-y-2">
            <h2 className="px-2 mb-3 text-base font-semibold text-gray-700 uppercase tracking-wider underline">Maintenance & Repairs</h2>
            {devicePlans.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <h2 className="px-2 mb-3 text-base font-semibold text-gray-700 uppercase tracking-wider underline">Legals</h2>
            {legals.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 