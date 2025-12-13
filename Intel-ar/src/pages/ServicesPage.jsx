import React from 'react';
import Services from '../components/Services';
import ContactUs from '../components/ContactUs';

export default function ServicesPage() {
  return (
    <div className="pt-20"> {/* Padding for fixed navbar */}
      <Services />
      <ContactUs />
    </div>
  );
}