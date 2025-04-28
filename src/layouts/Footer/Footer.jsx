import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  const footerData = {
    companyInfo: {
      logoText: "ComfortWay",
      description: "Expert Care For Your Devices",
      socials: [
        { icon: Facebook, path: 'https://www.facebook.com/comfortway.in/' },
        { icon: Linkedin, path: 'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Aorganization%3A14578646&keywords=comfort%20way&origin=RICH_QUERY_SUGGESTION&position=0&searchId=7c15b76e-a069-44b6-ae31-aca36a19890a&sid=qQ1&spellCorrectionEnabled=false' },
        { icon: Youtube, path: 'https://www.youtube.com/@comfortway3020' },
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
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "About Us", path: "/about" },
          { name: "Contact Us", path: "/contact" },
        ],
      },
      {
        title: "Products",
        links: [
          { name: "Water Purifiers", path: "/products/purifiers" },
          { name: "Air Conditioners", path: "/products/ac" },
          { name: "Washing Machine", path: "/products/washing-machines" },
          { name: "Refrigerators", path: "/products/refrigerators" },
          { name: "Microwaves", path: "/products/microwaves" },
          { name: "Chimneys", path: "/products/chimneys" },
        ],
      },
      {
        title: " ", // Invisible title for layout
        links: [
          { name: "Juicers", path: "/products/juicers" },
          { name: "Geysers", path: "/products/geysers" },
          { name: "Choppers", path: "/products/choppers" },
          { name: "Blenders", path: "/products/blenders" },
          { name: "Microwaves", path: "/products/microwaves" },
          { name: "Hobs", path: "/products/hobs" },
          { name: "Iron", path: "/products/irons" },
        ],
      },
      {
        title: "Policies",
        links: [
          { name: "Privacy Policy", path: "/privacy" },
          { name: "Terms of Service", path: "/terms" },
        ],
      },
    ],
    bottomBar: {
      copyrightText: `© ${new Date().getFullYear()} Comfort Way. All Rights Reserved.`,
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

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-center items-center text-xs">
          <p className="text-gray-400 text-center md:text-right">{footerData.bottomBar.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 