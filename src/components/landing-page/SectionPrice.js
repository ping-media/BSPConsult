/* eslint-disable react/no-unescaped-entities */
import './css/PriceSection.css';

import { loadStripe } from '@stripe/stripe-js';
import { CircleCheck } from 'lucide-react';
import { useNavigate } from 'react-router';
import { paths } from 'src/routes/paths';

// Stripe must stay OUTSIDE component
const stripePromise = loadStripe("pk_live_51NAUESCf4YXq1rsyBMpbCD1Yqi5kocGdjxYqcqknpppNXXnUKKCVxar7NqInLJRCJTCEVkbqQPppP7nvve8E053I00P0pVQI8d");

const programs = [
  {
    id: 'silver',
    name: 'Silver Program',
    description:
      'For bettors who want a simple, disciplined foundation built on structured bets, clear analysis and repeatable execution. Designed to replace emotional decisions and bad habits with consistency.',
    priceAmount: '€397',
    pricePeriod: '/year',
    note: 'Best for starting with structure.',
    button: 'Get Silver Program',
    highlightCount: 4,
  },
  {
    id: 'advanced',
    name: 'Advanced Program',
    description:
      'For bettors who want structured bets backed by game-changing data and access to the BSP Betting Model to consistently identify mispriced odds. From year two, maintain full access for €397 annually.',
    priceAmount: '€597',
    pricePeriod: ' one-time fee',
    note: 'Lock in pricing before the next platform update.',
    button: 'Get Advanced Program',
    highlightCount: 7,
  },
  {
    id: 'gold',
    name: 'Gold Program',
    description:
      'For bettors who want to master high-level decision-making, advanced strategies and real-world study cases to operate at their highest potential. From year two, maintain full access for just €397 annually.',
    priceAmount: '€997',
    pricePeriod: ' one-time fee',
    note: 'Secure current Gold pricing.',
    button: 'Get Gold Program',
    highlightCount: 10,
  },
];


const includes = [
  'Structured Bets',
  'Detailed Bet Analysis',
  'Tournament Previews',
  'Live Betting Opportunities',
  'Advanced Data Insights (BSP App)',
  'BSP Tennis Betting Model',
  'Essential Video Content',
  'High-Stakes Betting Frameworks',
  'BSP Masterclass (20+ Hours of Video)',
  'Real Time Study Cases',
];

export default function PriceSection() {
  const navigate = useNavigate();

  //  Shared click handler (ready for Stripe later)
  const handleProgramClick = async (programId) => {
    // Later: create Stripe checkout session here
    // For now: navigate user
    navigate(paths.register, {
      replace: true,
      state: { program: programId },
    });
  };

  return (
    <section className="section-price" id="SectionPrice">
      <div className="container-1 mx-auto pl-2 pr-2 text-center mb-65">
        <div className="features-badge">
          Betting Programs
        </div>
        <h5 className="heading-h5">Choose Your Program</h5>
        <h2 className="heading-h2">There is real opportunity in tennis betting only through structure,discipline and a clear strategy.</h2>
      </div>
      <div className="price-grid">
        {programs.map((program) => (
          <div
            key={program.id}
            className={`price-card ${program.id === 'advanced' ? 'is-featured' : ''}`}
          >

            {/* BLACK INNER BOX */}
            <div className="price-inner">
             <div className="program-headers">
  <h3 className="program-title">{program.name}</h3>

  {program.id === 'advanced' && (
    <span className="best-value-badge">Best Value</span>
  )}
</div>

              <p className="program-desc">{program.description}</p>
              

              <div className="program-price">
                <span className="price-amount">{program.priceAmount}</span>
                <span className="price-period">{program.pricePeriod}</span>
              </div>

              <div className="program-note">{program.note}</div>

              <button
                type="button"
                className="program-btn"
                onClick={() => handleProgramClick(program.id)}
              >
                {program.button}
              </button>
            </div>

            {/* INCLUDES */}
            <div className="program-includes">
              <h4>{program.name.split(' ')[0]} Includes</h4>
              <ul>
                {includes.map((item, i) => (
                  <li
                    key={item}
                    className={i < program.highlightCount ? 'active' : 'inactive'}
                  >
                    <img src="img/check-circle.svg" alt="check" />
                    <span className="include-text">{item}</span>
                  </li>

                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
