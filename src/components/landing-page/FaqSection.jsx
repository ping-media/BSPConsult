import React, { useState } from 'react';
import './css/FaqSection.css';

const faqs = [
  {
    q: 'How many betting opportunities will I receive?',
    a: `You’ll receive regular ATP betting opportunities — only when the strategy aligns and a clear edge is present.
We don’t push 5 bets per day like Telegram groups.
Expect 20–40 high-quality plays per month, with long-term consistency as the goal.`,
  },
  {
    q: 'How much bankroll do I need to start?',
    a: `You can start with a modest bankroll. What matters most is disciplined staking and consistency.
The strategy scales with your bankroll — not the other way around.`,
  },
  {
    q: 'What is the difference between Silver and Gold Membership?',
    a: `Silver gives you structure, core betting logic and consistency.
Gold unlocks advanced data, high-stakes frameworks, real study cases and full mastery of the method.`,
  },
  {
    q: 'What is your strategy based on?',
    a: `The strategy is based on structured market inefficiencies, disciplined bankroll management,
advanced data modeling and long-term EV+ decision making.`,
  },
  {
    q: 'Do you only bet on tennis?',
    a: `Yes. Tennis offers the most repeatable inefficiencies when approached with structure.
Specialization is the reason the method works.`,
  },
  {
    q: 'What about the €14K study case — is it real?',
    a: `Yes. It’s a documented real-money study case showing how the strategy performs
when executed with discipline over time.`,
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section-faq pb-85">
      <div className="container-3 mx-auto text-center mb-30">

              <div className="features-badge">
              FAQS
        </div>
      <h5 className="heading-h5">Before You Get Started</h5>
      <h2 className="heading-h2 hide-mob">Frequently Asked Questions Regarding BSP Consult</h2>

        <div className="faq-box">
  {faqs.map((item, index) => {
    const isOpen = openIndex === index;

    return (
      <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="faq-question-row"
          onClick={() => toggle(index)}
          aria-expanded={isOpen}
        >
          <span>{item.q}</span>
          <span className={`faq-icon ${isOpen ? 'open' : ''}`}>{isOpen ? '−' : '+'}</span>
        </button>

        {isOpen && (
          <div className="faq-answer">
            {item.a}
          </div>
        )}
      </div>
    );
  })}
</div>



{/* CTA BOX */}
<div className="faq-cta">
  <div className="faq-cta-overlay">
    <h3>
      Stop Betting Emotionally.
      <br />
      Start Betting With Structure.
    </h3>

    <p>
      If you keep betting based on emotions, impulse and frustration,
      the outcome will always be the same: loss of hard-earned money and no progress.
      Change it now or accept the same results.
    </p>

    {/* CTA Button */}
    <a href="#" className="cta-btn">
      <span>Apply the BSP Method</span>
      <img src="/img/cta-btn-icon.svg" alt="arrow" />
    </a>
  </div>
</div>





      </div>
    </section>
  );
}
