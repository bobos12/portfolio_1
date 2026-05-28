import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const [isMobile] = useState(() => window.innerWidth < 768);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-white/70 z-[9998] origin-left"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
