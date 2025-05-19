import React from 'react';

// Partner logos
const partners = [
  { name: 'Amazon', logoUrl: 'https://dummyimage.com/300x100/000000/ffffff&text=Amazon' },
  { name: 'Croma', logoUrl: 'https://dummyimage.com/300x100/1a75ff/ffffff&text=Croma' },
  { name: 'Vijay Sales', logoUrl: 'https://dummyimage.com/300x100/e60000/ffffff&text=Vijay+Sales' },
  { name: 'ICICI Bank', logoUrl: 'https://dummyimage.com/300x100/ff8000/ffffff&text=ICICI+Bank' },
  { name: 'Delta', logoUrl: 'https://dummyimage.com/300x100/4d4dff/ffffff&text=Delta' },
  { name: 'LG', logoUrl: 'https://dummyimage.com/300x100/cc0099/ffffff&text=LG' },
  { name: 'Samsung', logoUrl: 'https://dummyimage.com/300x100/006600/ffffff&text=Samsung' },
  { name: 'Voltas', logoUrl: 'https://dummyimage.com/300x100/6600cc/ffffff&text=Voltas' },
  // Additional partners to fill the slider
  { name: 'Haier', logoUrl: 'https://dummyimage.com/300x100/996633/ffffff&text=Haier' },
  { name: 'Godrej', logoUrl: 'https://dummyimage.com/300x100/009999/ffffff&text=Godrej' },
];

const PartnersSection = () => {
  return (
    <div className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Partners
          </h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
        </div>

        {/* Marquee Partner Logo Row */}
        <div className="relative overflow-hidden w-full">
          <div className="flex items-center whitespace-nowrap animate-partner-marquee">
            {partners.concat(partners).map((partner, index) => (
              <div key={index} className="px-8 inline-block">
                <div className="flex justify-center items-center h-20">
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="max-h-12 max-w-full object-contain filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/placeholder.png';
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes partner-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-partner-marquee {
            animation: partner-marquee 40s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PartnersSection;
