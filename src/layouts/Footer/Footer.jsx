import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const footerData = {
    companyInfo: {
      logoText: "ComfortWay",
      description: "Expert Care For Your Devices",
      socials: [
        { icon: Facebook, path: 'https://facebook.com' },
        { icon: Twitter, path: 'https://twitter.com' },
        { icon: Instagram, path: 'https://instagram.com' },
        { icon: Youtube, path: 'https://youtube.com' },
      ],
      referral: {
        title: "Refer & Earn",
        text: "Refer to win a fitness band & many rewards!",
        buttonText: "REFER NOW",
        buttonPath: "/refer",
      },
    },
    // Row 1: Company + 3 Product Columns
    row1Links: [
      {
        title: "Company",
        links: [
          { name: "About Us", path: "/about" },
          { name: "Blog", path: "/blog" },
          { name: "Careers", path: "/careers" },
          { name: "In The Media", path: "/media" },
          { name: "Whitepapers", path: "/whitepapers" },
          { name: "Contact Us", path: "/contact" },
          { name: "Sitemap", path: "/sitemap" },
        ],
      },
      {
        title: "Products",
        links: [
          { name: "Mobile Phones", path: "/products/mobiles" },
          { name: "Laptops", path: "/products/laptops" },
          { name: "Tablets", path: "/products/tablets" },
          { name: "Digital Cameras", path: "/products/cameras" },
          { name: "Printers & Scanners", path: "/products/printers" },
          { name: "Water Purifiers", path: "/products/purifiers" },
        ],
      },
      {
        title: " ", // Invisible title for layout
        links: [
          { name: "Air Conditioners", path: "/products/ac" },
          { name: "Washing Machine", path: "/products/washing-machines" },
          { name: "Refrigerators", path: "/products/refrigerators" },
          { name: "Microwaves", path: "/products/microwaves" },
          { name: "Televisions", path: "/products/tv" },
          { name: "Fitness Tracker", path: "/products/fitness" },
        ],
      },
      {
        title: " ", // Invisible title for layout
        links: [
          { name: "Desktop", path: "/products/desktop" },
          { name: "Smartwatch", path: "/products/smartwatch" },
          { name: "HomeCare", path: "/products/homecare" },
        ],
      },
    ],
    // Row 2: Policies + 2 Warranty Columns + Lending
    row2Links: [
       {
        title: "Policies",
        links: [
          { name: "Terms of Use", path: "/terms-of-use" },
          { name: "Privacy Policy", path: "/privacy" },
          { name: "Terms of Service", path: "/terms-of-service" },
          { name: "Annual Returns", path: "/annual-returns" },
        ],
      },
      {
        title: "Warranty Check",
        links: [
          { name: "Apple Warranty Check", path: "/warranty/apple" },
          { name: "iPhone Warranty Check", path: "/warranty/iphone" },
          { name: "Dell Warranty Check", path: "/warranty/dell" },
        ],
      },
      {
        title: " ", // Invisible title for layout
        links: [
          { name: "Sony Warranty Check", path: "/warranty/sony" },
          { name: "Lenovo Warranty Check", path: "/warranty/lenovo" },
          { name: "Samsung Warranty Check", path: "/warranty/samsung" },
        ],
      },
       {
        title: "Lending Service Provider",
        links: [
          { name: "Customer Consent", path: "/lending/consent" },
          { name: "Grievance Redressal", path: "/lending/grievance" },
          { name: "LSP Partners", path: "/lending/partners" },
        ],
      },
    ],
    bottomBar: {
      securePaymentText: "Secure Payment",
      paymentIcons: ['VISA', 'MasterCard', 'NetBanking', 'EasyEMI'],
      copyrightText: `© 2010-${new Date().getFullYear()} ComfortWay. All Rights Reserved.`,
    },
  };

  // Helper function to render a row of link columns
  const renderLinkRow = (linksData) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-8">
      {linksData.map((column, colIndex) => (
        <div key={colIndex}>
          <h3 className={`text-base font-semibold text-teal-400 mb-4 uppercase tracking-wider ${column.title.trim() === '' ? 'invisible' : ''}`}>{column.title || ' '}</h3>
          <ul className="space-y-2">
            {column.links.map((link, linkIndex) => (
              <li key={linkIndex}>
                <Link
                  to={link.path}
                  className="text-sm text-gray-400 hover:text-white hover:underline transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );


  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Grid: Company Info | Link Rows */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* Column 1: Company Info, Socials, Referral */} 
          <div className="lg:col-span-3 xl:col-span-3"> {/* Adjusted span slightly */}
            <h2 className="text-2xl font-bold text-white mb-2">{footerData.companyInfo.logoText}</h2>
            <p className="text-sm text-gray-400 mb-4">{footerData.companyInfo.description}</p>
            {/* Social Links */}
            <div className="flex space-x-3 mb-6">
              {footerData.companyInfo.socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors bg-gray-700 p-2 rounded-full"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            {/* Referral Section */}
            <div className="bg-gray-800 p-4 rounded-lg text-left relative overflow-hidden">
              <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-lg">
                {footerData.companyInfo.referral.title}
              </span>
              <div className="float-right ml-2 h-12 w-12 bg-gray-700 rounded-full mb-2"></div> {/* Placeholder image */}
              <p className="text-sm text-gray-400 mb-3">{footerData.companyInfo.referral.text}</p>
              <Link
                to={footerData.companyInfo.referral.buttonPath}
                className="inline-block bg-yellow-500 text-gray-900 font-bold py-1.5 px-4 rounded-full text-xs hover:bg-yellow-400 transition-colors"
              >
                {footerData.companyInfo.referral.buttonText}
              </Link>
            </div>
          </div>

          {/* Column 2: Link Rows Container */}
          <div className="lg:col-span-9 xl:col-span-9 space-y-10"> {/* Adjusted span slightly */}
             {/* --- Row 1 --- */} 
             {renderLinkRow(footerData.row1Links)}

             {/* --- Row 2 --- */} 
             {renderLinkRow(footerData.row2Links)}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span className="text-gray-400">{footerData.bottomBar.securePaymentText}:</span>
            <div className="flex space-x-2">
              {footerData.bottomBar.paymentIcons.map(icon => (
                  <span key={icon} className="text-[10px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{icon}</span>
              ))}
            </div>
          </div>
          <p className="text-gray-400 text-center md:text-right">{footerData.bottomBar.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 