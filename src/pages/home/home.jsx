import React from 'react';
import HeroCarousel from '../../components/home/HeroCarousel';
import SearchSection from '../../components/home/SearchSection';
import ServicesSection from '../../components/home/ServicesSection';
import WhyChooseUsSection from '../../components/home/WhyChooseUsSection';
import ServiceRequestBanner from '../../components/home/ServiceRequestBanner';
import FeaturedServiceSection from '../../components/home/FeaturedServiceSection';
import QuickRepairsSection from '../../components/home/QuickRepairsSection';
import PromoBanner from '../../components/home/PromoBanner';
import ProtectionPlansSection from '../../components/home/ProtectionPlansSection';
import CustomerReviewsSection from '../../components/home/CustomerReviewsSection';
import PartnersSection from '../../components/home/PartnersSection';

const Home = () => {
  return (
    <main>
      <HeroCarousel />
      <SearchSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ServiceRequestBanner />
      <FeaturedServiceSection />
      <QuickRepairsSection />
      <PromoBanner />
      <ProtectionPlansSection />
      <CustomerReviewsSection />
      <PartnersSection />
    </main>
  );
}; 

export default Home;