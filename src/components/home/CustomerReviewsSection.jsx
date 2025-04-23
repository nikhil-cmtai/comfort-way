import React from 'react';
import { Star } from 'lucide-react'; // Using lucide-react for star icons

// Placeholder data
const testimonials = [
  {
    name: 'Rajesh Pradhan',
    location: 'Bangalore',
    image: 'https://via.placeholder.com/100?text=Rajesh',
    rating: 5,
    review: 'The team handled my request with utmost professionalism and ensured the service was done on time. I\'m glad the engineer came before time and followed all safety protocols.',
  },
  {
    name: 'Ashish Sharma',
    location: 'Mumbai',
    image: 'https://via.placeholder.com/100?text=Ashish',
    rating: 5,
    review: 'Booking an IR service for my AC was an easy process. The engineer was prompt and provided excellent service. All this, at very competitive rates.',
  },
  {
    name: 'Snehan P Rajan',
    location: 'Mumbai',
    image: 'https://via.placeholder.com/100?text=Snehan',
    rating: 5,
    review: 'A friend recommended your InstaRepair service so I booked a service online for my water purifier and it was a good experience. Service was cashless and convenient.',
  },
  {
    name: 'Shivani Choudhary',
    location: 'New Delhi',
    image: 'https://via.placeholder.com/100?text=Shivani',
    rating: 5,
    review: 'Good service. Your technician came with all tools and followed safety norms. He was polite and professional.',
  },
];

const platformRatings = [
  {
    platform: 'amazon',
    logo: 'a', // Placeholder for Amazon logo
    rating: 4.5,
    reviews: '6,000+',
  },
  {
    platform: 'facebook',
    logo: 'f', // Placeholder for Facebook logo
    rating: 4.5,
    reviews: '1,500+',
  },
  {
    platform: 'google',
    logo: 'G', // Placeholder for Google logo
    rating: 4.5,
    reviews: '2,200+',
  },
];

// Helper component for rendering stars
const StarRating = ({ rating }) => {
  const totalStars = 5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={16} className="text-yellow-400 fill-current" />
      ))}
      {hasHalfStar && <Star size={16} className="text-yellow-400 fill-current" />} {/* Simplification: showing full star for half */}
      {[...Array(totalStars - Math.ceil(rating))].map((_, i) => (
        <Star key={`empty-${i}`} size={16} className="text-gray-300 fill-current" />
      ))}
    </div>
  );
};

const CustomerReviewsSection = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-50">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Heading */}
        <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-2">
          Read Customer Reviews
        </p>
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">
          Living Up to the Promise
          <span className="text-teal-500">.</span><span className="text-teal-400">.</span><span className="text-teal-300">.</span>
        </h2>
        <p className="text-base text-gray-500 mb-12">
          Here's what our customers say about us.
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-left flex space-x-4">
              <img src={testimonial.image} alt={testimonial.name} className="h-16 w-16 rounded-full flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="text-sm font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{testimonial.location}</p>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-bold mr-1">{testimonial.rating}</span>
                  <StarRating rating={testimonial.rating} />
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  " {testimonial.review} "
                </p>
                <a href="#" className="text-sm font-medium text-teal-600 hover:text-teal-700">Read more</a>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Link */}
        <div className="mb-16">
          <a href="#" className="text-base font-medium text-yellow-600 hover:text-yellow-700">
            Read More...
          </a>
        </div>

        {/* Platform Ratings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {platformRatings.map((rating, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full border border-gray-200 bg-white flex items-center justify-center mb-3 text-2xl font-bold text-gray-600">
                {/* Replace with actual logos */} 
                {rating.logo}
              </div>
              <div className="flex items-center mb-1">
                 <span className="text-sm font-bold mr-1">{rating.rating}</span>
                 <StarRating rating={rating.rating} />
              </div>
              <p className="text-sm text-gray-500">{rating.reviews} Reviews</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CustomerReviewsSection; 