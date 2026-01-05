import React from 'react';
import '../../../components/landing-page/css/globals.css';
// components
import ScrollProgress from 'src/components/scroll-progress';
import {
  Header,
  EnrollNowSection,
  FeaturesSection,
  TennisBettingSection,
  SectionConnect,
  SectionPrice,
  TestimonialsSection,
} from 'src/components/landing-page';

// ----------------------------------------------------------------------

export default function LandingView() {
  return (
    <>
      <div >
        <Header />
        <FeaturesSection />
        <EnrollNowSection />
        <TennisBettingSection />
        <SectionPrice />
        <TestimonialsSection />
        <SectionConnect />
      </div>
      <ScrollProgress />
    </>
  );
}
