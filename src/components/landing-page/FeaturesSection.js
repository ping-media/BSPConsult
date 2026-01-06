import React from "react";
import "./css/Features.css";
import RevealText from "./RevealText";

const FeaturesSection = () => (
  <section className="section-features">
    <div className="container pl-5 pr-5">
      <div className="features-content">

        <div className="features-badge">
          From Emotions to Structure
        </div>

      <div className="features-text">

  <RevealText
    className="features-description"
    text={`Chasing losses. Following random tips. Betting on instinct.
  The pattern is always the same: you win, you lose, you tilt and you bet again to recover. Most bettors don’t fail because they’re unlucky. They fail because they bet emotionally without structure and without properly evaluating the odds.Knowing a sport is not the same as beating the market.\n
      This is where our method replaces emotion. Not feelings. Not random bets. Betting becomes a process backed by a clear structure and the right tools. This is the foundation of how BSP works.
      `}
  />

 

</div>


      </div>
    </div>
  </section>
);

export default FeaturesSection;
