import React from 'react';
import './css/Tetimonials.css';

// eslint-disable-next-line react/prop-types
const TestimonialItem = ({ src, alt }) => (
  <div className="testimonials-item">
    <img src={src} alt={alt || 'Testimonial image'} />
  </div>
);
const TestimonialsSection = () => {
  const testimonials = [
    'img/testimonials1.webp',
    'img/testimonials4.webp',
    'img/testimonials22.webp',
    'img/testimonials8.webp',
    'img/testimonials19.webp',
    'img/testimonials11.webp',
    'img/testimonials21.webp',
    'img/testimonials2.webp',
    'img/testimonials16.webp',
    'img/testimonials17.webp',
    'img/testimonials9.webp',
    'img/testimonials10.webp',
    'img/testimonials13.webp',
    'img/testimonials3.webp',
    'img/testimonials5.webp',
    'img/testimonials18.webp',
    'img/testimonials6.webp',
    'img/testimonials20.webp',
    'img/testimonials12.webp',
    'img/testimonials14.webp',
  ];

  return (
    <section className="section-tetimonials pb-65">
      <div className="container-3 mx-auto pl-2 pr-2 text-center mb-30">
        <h2 className="heading-h2 mb-28">
          This is what happens when you erase your bad betting habits and adopt a proven strategy.
        </h2>
        <p className="text-variation5">
          No one has ever created as many diverse value and disciplined bettors as us <br />
          that profit from the industry.
        </p>
      </div>
      <div className="container-1 mx-auto">
        <div className="testimonials">
          {testimonials.map((src, index) => (
            <TestimonialItem key={index} src={src} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
