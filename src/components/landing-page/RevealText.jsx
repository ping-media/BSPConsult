import { m, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

const RevealText = ({ text, className }) => {
  const ref = useRef(null);
  const [revealedCount, setRevealedCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });

  const letters = text.split("");

  // ✅ Listen to scroll progress safely
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const count = Math.floor(latest * letters.length);
    setRevealedCount(count);
  });

  return (
    <p ref={ref} className={className}>
      {letters.map((char, i) => (
        <m.span
          key={i}
          animate={{
            color:
              i <= revealedCount
                ? "#ffffff"
                : "rgba(255,255,255,0.4)",
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {char === " " ? "\u00A0" : char}
        </m.span>
      ))}
    </p>
  );
};

RevealText.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default RevealText;
