import React, { useState } from 'react';
import './css/FaqSection.css';
import { paths } from 'src/routes/paths'; 

const faqs = [
      {
    q: 'How much bankroll do I need to start?',
    a: `We recommend a minimum bankroll of around €500 to start the right way. It’s better to save and begin properly than to start undercapitalized and in a rush.`,
  },
//     {
//     q: 'How many betting opportunities will I receive?',
//     a: (
//       <>
//         <p>
//           You’ll receive regular ATP betting opportunities, but understand that we are not like most Telegram signal groups that push five bets a day. We only share plays that align with our strategy and where a clear edge and value are present. Expect between 15 and 40 high-quality bets per month, with long-term consistency as the primary objective.
//         </p>

//         <p>
//           The best traders in the market do not bet five times a day. Forget the old “volume-first” betting mindset and adopt a more selective, disciplined strategy focused on sustainable results.
//         </p>

       
//       </>
//     ),
//   },
//   {
//     q: 'What is the difference between Silver and Gold Membership?',
//     a: `We recommend a minimum bankroll of around €500 to start the right way. It’s better to save and begin properly than to start undercapitalized and in a rush.`,
//   },
//  {
//     q: 'How many betting opportunities will I receive?',
//     a: (
//       <>
      
//         <span>Silver Program</span>
    
//         <p>
          
//           Silver is the perfect starting point for bettors who want to eliminate emotional betting and follow a structured, disciplined approach. You’ll gain access to the bets we take ourselves, with detailed explanations. You will have access to the bets section of the BSP app, where the most interesting betting opportunities are posted, along with our Telegram live channel, where you receive real-time betting opportunities ready to copy and place. This program is designed for simplicity, clarity and execution.
//         </p>
//         <span>Advanced Program</span>
     
//         <p>
          
//           Advanced includes everything in the Silver Program, plus data-driven insights backed by market context in the second part of the BSP app. These insights allow you to stay informed before the mass market reacts, giving you a strategic edge. You’ll receive advanced statistical analysis, round-by-round tournament data to identify current betting trends, and access to the BSP Tennis Betting Model, which centralizes the most important metrics to identify bookmaker inefficiencies and monetize them.
//         </p>
 
//         <span>Gold Program</span>
     
//        <p>
//         Gold is designed for those who want an elite understanding of betting. It is ideal for those who want to make betting a real source of income, aiming to master the strategy in depth. This program includes access to private sources, daily market metrics, elite video education, real case-study recordings, and advanced techniques such as bypassing bookmaker limits, emerging crypto betting methods and personal walkthroughs of high-volume betting accounts. Gold is about long-term mastery, scalability and operating like a professional bettor.
//       </p>
       
//       </>
//     ),
//   },
  {
    q: 'What is your strategy based on?',
    a: `Our strategy combines objective data, subjective tennis knowledge, and player momentum and form. Value is important to target, but first you need to be able to follow a clear strategy before spotting value in the market. We apply 8 confirmations before entering a market. We only bet when everything in our strategy aligns — not based on emotions or intuition.`,
  },
  {
    q: 'Do you only bet on tennis?',
    a: `Yes, we exclusively focus on the ATP tennis market. Niche betting provides a stronger edge: deeper information, faster access to insights and more exploitable mistakes. Bookmakers concentrate on big sports where the people are; we focus on niche markets where bookmakers make mistakes.`,
  },
  {
    q: 'Should I update the BSP Tennis Betting Model myself?',
    a: `No. You will receive a copy linked to my master model, and I am the one who maintains and updates it. This means your version is automatically updated as well. You will always have access to the latest data and the most important ATP metrics of the moment.`,
  },
  {
    q: 'Can I cancel anytime?',
    a: `Yes, you can cancel your subscription whenever you want. No long-term obligation, no lock-in.`,
  },
    {
    q: 'What makes BSP Consult different from tipsters?',
    a: (
      <>
        <p>
          The betting space is full of hype, fake screenshots and people betting purely on what they see, without evaluating the prices and odds they receive.
        </p>

        <ul className="faq-list">
            
            We do it differently:
  <li>
    Full transparency (screen recordings, bookmaker switching, proof of withdrawals, real execution)
  </li>
  <li>
    One niche, one sport, one proven framework
  </li>
  <li>
    Real study cases, recorded live — not just claims
  </li>
</ul>

<p>
    We don’t just give bets — we show the entire process behind them.
</p>

       
      </>
    ),
  },
  {
    q: 'Do I need a specific bookmaker to follow your bets?',
    a: `No, you don’t. Our betting opportunities are mainly on the ATP market and we target only high-liquidity lines that are available on 95% of bookmakers. We also help our members by recommending the bookmakers that consistently offer the best odds in our markets.`,
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
        <h5 className="heading-h5" style={{ fontWeight: '600' }}>Before You Get Started</h5>
        <h2 className="heading-h2">Frequently Asked Questions Regarding BSP Consult</h2>

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
            <div className='view-program'>
              <a href="#SectionPrice" className="cta-gradient-btn">
                <span className="cta-text">Apply the BSP Method</span>
                <img
                  src="img/viewbtn.svg"
                  alt=""
                  className="cta-icon"
                />
              </a>
            </div>
          </div>
        </div>





      </div>
    </section>
  );
}
