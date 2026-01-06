import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './css/Tetimonials.css';

const TestimonialItem = ({ src, label }) => (
  <div className="testimonial-card">
    <div className="testimonial-image-box">
      <img src={src} alt={label} />
    </div>
    <div className="testimonial-footer">
      {/* LABEL BELOW IMAGE */}
      <div className="testimonial-label">{label}</div>
    </div>
  </div>
);


TestimonialItem.propTypes = {
  src: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const TestimonialsSection = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const testimonials = [
    {
      src: '/img/test1.png',
      label: 'Feb 2025 · Silver Member',
    },
    {
      src: '/img/test2.png',
      label: 'Mar 2025 · Gold Member',
    },
    {
      src: '/img/test3.png',
      label: 'Feb 2025 · Gold Member',
    },
    {
      src: '/img/test4.png',
      label: 'Jan 2025 · Silver Member',
    },
    {
      src: '/img/test1.png',
      label: 'Mar 2025 · Gold Member',
    },
  ];

  return (
    <section className="section-testimonials pb-65">
      <div className="container-3 mx-auto text-center mb-65">
        <div className="features-badge">Testimonials From Members</div>

        <h5 className="heading-h5">
          Messages from members applying the <br /> method day to day
        </h5>

        <h2 className="heading-h2 hide-mob">
          This is what happens when you replace emotional betting with structure.
        </h2>
      </div>

      <div className="testimonials-wrapper">
        <div className="testimonials-row" ref={scrollRef}>
          {testimonials.map((item, index) => (
            <TestimonialItem
              key={index}
              src={item.src}
              label={item.label}
            />
          ))}
        </div>

        <div className="scroll-controls">
          <button type="button" className="scroll-btn prev" onClick={() => scroll('left')}>
            <img src="/img/prev-scroll.svg" alt="Previous" />
          </button>
          <button type="button" className="scroll-btn next" onClick={() => scroll('right')}>
            <img src="/img/next-scroll.svg" alt="Next" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
