import React from 'react';
import HeroSection from '../components/HeroSection';
import ImpactSection from '../components/ImpactSection';
import AboutUs from '../components/AboutUs';
import Services from '../components/Services';
import ExpertsSection from '../components/ExpertsSection';
import HomeBlog from '../components/HomeBlog'; 
import ContactUs from '../components/ContactUs';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ImpactSection />
      <AboutUs />
      <Services />
      <ExpertsSection />
      <HomeBlog />
      <ContactUs />
    </>
  );
}