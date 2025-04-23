import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';

// Data for the Device & Plans Mega Menu
const devicePlansData = [
  // Column 1
  [
    { name: 'Air Conditioner', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/ac', new: true },
    { name: 'Air Purifier', subLinks: ['Extended Warranty'], path: '/devices/air-purifier' },
    { name: 'Audio System', subLinks: ['Extended Warranty'], path: '/devices/audio' },
    { name: 'Chopper and Blender', subLinks: ['Extended Warranty'], path: '/devices/blender' },
    { name: 'Desktop', subLinks: ['Extended Warranty'], path: '/devices/desktop' },
    { name: 'Digital Camera', subLinks: ['Spills and Drops / Damage Protection', 'Extended Warranty'], path: '/devices/camera' },
    { name: 'Dishwasher', subLinks: ['Extended Warranty'], path: '/devices/dishwasher' },
    { name: 'Electric Cooker', subLinks: ['Extended Warranty'], path: '/devices/cooker' },
  ],
  // Column 2
  [
    { name: 'Fan', subLinks: ['Extended Warranty'], path: '/devices/fan' },
    { name: 'Fitness Tracker', subLinks: ['Extended Warranty'], path: '/devices/fitness-tracker' },
    { name: 'Gaming Console', subLinks: ['Extended Warranty'], path: '/devices/gaming' },
    { name: 'Geyser', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/geyser' },
    { name: 'Groom & Hair Care', subLinks: ['Extended Warranty'], path: '/devices/grooming' },
    { name: 'Headphone', subLinks: ['Extended Warranty'], path: '/devices/headphones' },
    { name: 'Home Theatre and Soundbar', subLinks: ['Extended Warranty'], path: '/devices/home-theatre' },
    { name: 'Iron', subLinks: ['Extended Warranty'], path: '/devices/iron' },
  ],
  // Column 3
  [
    { name: 'Juicer Mixer Grinder', subLinks: ['Extended Warranty'], path: '/devices/jmg' },
    { name: 'Kettle', subLinks: ['Extended Warranty'], path: '/devices/kettle' },
    { name: 'Laptop', subLinks: ['Laptop Complete Care', 'Extended Warranty'], path: '/devices/laptop', new: true },
    { name: 'Microwave', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/microwave' },
    { name: 'Mobile Phone', subLinks: ['Extended Warranty'], path: '/devices/mobile' },
    { name: 'Printer and Scanner', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/printer' },
    { name: 'Refrigerator', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/refrigerator' },
  ],
  // Column 4
  [
    { name: 'Room Cooler', subLinks: ['Extended Warranty'], path: '/devices/room-cooler' },
    { name: 'Smartwatch', subLinks: ['Extended Warranty'], path: '/devices/smartwatch' },
    { name: 'Tablet', subLinks: ['Extended Warranty'], path: '/devices/tablet' },
    { name: 'Television', subLinks: ['Extended Warranty'], path: '/devices/tv' },
    { name: 'Vacuum Cleaner', subLinks: ['Extended Warranty'], path: '/devices/vacuum' },
    { name: 'Washing Machine', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/washing-machine' },
    { name: 'Water Purifier', subLinks: ['Extended Warranty', 'Maintenance and Repair'], path: '/devices/water-purifier' },
  ],
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isDevicePlansOpen, setIsDevicePlansOpen] = useState(false); // State for mega menu
  const userDropdownRef = useRef(null);
  const devicePlansRef = useRef(null); // Ref for mega menu area

  const navigation = [
    // { name: 'Device & Plans', path: '/devices' }, // Handled separately now for dropdown
    { name: 'Home Protection', path: '/home-protection', new: true },
    { name: 'Activate Plan', path: '/activate-plan' },
    { name: 'Track Service Request', path: '/track-request' },
  ];

  const userDropdownItems = [
    { name: 'Sign In/Sign Up', path: '/signin' },
    { name: 'My Plans', path: '/my-plans' },
    { name: 'My Profile', path: '/profile' },
    { name: 'Raise Service Request', path: '/raise-request' },
    { name: 'Help & Support', path: '/help' },
    { name: 'Enterprise Partner Sign In', path: '/partner-signin', separator: true },
  ];

  // --- Close Dropdown Logic --- 
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close User Dropdown
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
       // Close Device Plans Mega Menu (also close on click outside for robustness)
       if (devicePlansRef.current && !devicePlansRef.current.contains(event.target)) {
         // Check if the click was on the trigger link itself
         const triggerLink = document.getElementById('device-plans-trigger');
         if (!triggerLink || !triggerLink.contains(event.target)) {
            setIsDevicePlansOpen(false);
         }
       }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Removed refs from dependencies as they don't change

  // --- Hover Handlers for User Dropdown --- 
  const handleUserMouseEnter = () => setIsUserDropdownOpen(true);
  const handleUserMouseLeave = () => {
    setTimeout(() => {
         if (userDropdownRef.current && !userDropdownRef.current.matches(':hover')) {
           setIsUserDropdownOpen(false);
         }
    }, 100);
  };

  // --- Hover Handlers for Device Plans Mega Menu --- 
   const handleDevicePlansMouseEnter = () => setIsDevicePlansOpen(true);
   const handleDevicePlansMouseLeave = () => {
     setTimeout(() => {
       // Check hover on both trigger and menu
       const triggerLink = document.getElementById('device-plans-trigger');
       if (devicePlansRef.current && !devicePlansRef.current.matches(':hover') && (!triggerLink || !triggerLink.matches(':hover'))) {
         setIsDevicePlansOpen(false);
       }
     }, 150); // Slightly longer delay might be needed for larger menus
   };


  return (
    <header className="bg-white text-gray-800 shadow-md relative"> {/* Added relative positioning */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-indigo-600">
              ComfortWay
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6 lg:space-x-8">
            {/* Device & Plans Trigger */}
             <div 
                className="relative"
                onMouseEnter={handleDevicePlansMouseEnter}
                onMouseLeave={handleDevicePlansMouseLeave}
             >
                <Link
                    id="device-plans-trigger" // Added ID for hover check
                    to="/devices" // Main link path
                    className="flex items-center text-sm lg:text-base font-medium text-gray-600 hover:text-indigo-600"
                >
                    Device & Plans
                    <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isDevicePlansOpen ? 'rotate-180' : ''}`} />
                </Link>
             </div>

            {/* Other Navigation Links */}
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

          {/* Icons & Sign In */}
          <div className="flex items-center space-x-6">
            {/* User Sign In Dropdown */}
            <div 
              className="relative"
              ref={userDropdownRef}
              onMouseEnter={handleUserMouseEnter}
              onMouseLeave={handleUserMouseLeave}
            > 
              <button
                className="hidden md:flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <User className="mr-2 h-5 w-5 text-indigo-600" />
                Sign In
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-20"> {/* Increased z-index */}
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
            {/* Cart Icon */}
            <Link to="/cart" className="text-gray-600 hover:text-indigo-600">
              <ShoppingCart className="h-6 w-6" />
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */} 
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            {/* ... (Mobile nav needs update to include device plans expansion) ... */}
             <p className="px-2 text-center text-red-500 text-sm"> (Mobile Device Plans Menu TBD) </p>
          </div>
        )}
      </nav>

       {/* --- Device & Plans Mega Menu --- */} 
      {isDevicePlansOpen && (
        <div 
          ref={devicePlansRef}
          onMouseEnter={handleDevicePlansMouseEnter} // Keep open when hovering menu
          onMouseLeave={handleDevicePlansMouseLeave} // Close when leaving menu
          className="absolute left-0 right-0 top-full bg-white shadow-lg border-t border-gray-200 z-10"
        >
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-0 md:grid-cols-4">
              {devicePlansData.map((column, colIndex) => (
                <div key={colIndex} className={`space-y-6 p-6 ${colIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}>
                  {column.map((item) => (
                    <div key={item.name}>
                      {/* Heading Part */}
                      <div className="mb-2">
                        <div
                          className="block text-base font-bold text-gray-900 relative"
                        >
                          {item.name}
                          {item.new && (
                              <span className="ml-2 text-xs align-middle font-semibold text-white bg-red-500 px-1.5 py-0.5 rounded-full">NEW</span>
                          )}
                        </div>
                        <div className="mt-1 h-0.5 w-10 bg-teal-400"></div>
                      </div>

                      {/* Sublinks Part */}
                      <ul className="mt-2 space-y-1.5">
                        {item.subLinks.map((subLink) => (
                          <li key={subLink} className="text-sm text-gray-600 hover:text-indigo-600 hover:underline cursor-pointer">
                            {subLink}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 