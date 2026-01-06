import React, { useRef, useEffect } from 'react';
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

const TestimonialsSection = () => {
  const scrollRef = useRef(null);
  const singleSetWidthRef = useRef(0);
  const isScrollingRef = useRef(false);

  // Calculate single set width
  useEffect(() => {
    if (scrollRef.current) {
      const firstCard = scrollRef.current.querySelector('.testimonial-card');
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 20;
        singleSetWidthRef.current = testimonials.length * (cardWidth + gap);
      }
    }
  }, []);

  // Set initial scroll position and handle infinite scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return undefined;
    }

    // Set initial scroll position to start of first set
    container.scrollLeft = 0;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollLeft = container.scrollLeft;
      const singleSetWidth = singleSetWidthRef.current;

      // If scrolled past the first set (reached duplicate set), jump back to start of first set
      if (scrollLeft >= singleSetWidth) {
        isScrollingRef.current = true;
        container.scrollTo({
          left: scrollLeft - singleSetWidth,
          behavior: 'auto',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
      // If scrolled before the start (scrolling left from beginning), jump to end of first set
      else if (scrollLeft <= 0) {
        isScrollingRef.current = true;
        container.scrollTo({
          left: singleSetWidth - (container.querySelector('.testimonial-card')?.offsetWidth || 0),
          behavior: 'auto',
        });
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Get the first card element to calculate its width
      const firstCard = scrollRef.current.querySelector('.testimonial-card');
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth;
        const gap = 20; // Gap between cards as defined in CSS
        const scrollAmount = cardWidth + gap;
        
        scrollRef.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="section-testimonials pb-65">
      <div className="container-3 mx-auto text-center mb-65">
        <div className="features-badge">Testimonials From Members</div>

        <h5 className="heading-h5">
          Messages from members applying the <br /> method day to day
        </h5>

        <h2 className="heading-h2">
          This is what happens when you replace emotional betting with structure.
        </h2>
      </div>

      <div className="testimonials-wrapper">
        <div className="testimonials-row" ref={scrollRef}>
          {[...testimonials, ...testimonials].map((item, index) => (
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
