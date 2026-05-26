import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import star from "../assets/star.png";
import rocket from "../assets/rocket.png";

const ServiceCard = ({ index, title }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.6)}
    whileHover={{ y: -10, scale: 1.06 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="flex flex-col items-center gap-4"
  >
    <motion.img
      src={star}
      alt={title}
      className="w-20 h-20 object-contain"
      whileHover={{
        filter: "drop-shadow(0 0 22px rgba(255,220,80,0.7)) drop-shadow(0 0 8px rgba(255,255,255,0.4))",
        rotate: 18,
      }}
      transition={{ duration: 0.28 }}
      style={{ filter: "drop-shadow(0 0 6px rgba(255,200,50,0.2))" }}
    />
    <h3 className="text-white/70 text-[14px] font-medium text-center tracking-wide uppercase">
      {title}
    </h3>
  </motion.div>
);

const About = () => {
  const sectionRef = useRef(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, { stiffness: 200, damping: 22 });
  const y = useSpring(rawY, { stiffness: 200, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left - 20);
    rawY.set(e.clientY - rect.top - 20);
  };

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ cursor: cursorVisible ? "none" : "auto" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setCursorVisible(true)}
      onMouseLeave={() => setCursorVisible(false)}
    >
      {/* Rocket cursor */}
      <motion.img
        src={rocket}
        alt=""
        className="pointer-events-none absolute z-50 w-10 h-10 object-contain select-none"
        style={{ x, y, rotate: 45 }}
        animate={{ opacity: cursorVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.15 } }}
      />

      <motion.div variants={textVariant()} className="text-center">
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 text-secondary text-[16px] leading-[32px] font-light text-center max-w-2xl mx-auto"
      >
        I'm a passionate software developer with expertise in TypeScript,
        JavaScript, and modern frameworks like React, Node.js, and Three.js.
        I specialize in crafting scalable, performant, and visually engaging applications.
        I thrive on challenges, adapt quickly, and work closely with clients to
        transform ideas into real-world solutions. If you're looking for a developer
        who can deliver quality and creativity, let's build something remarkable together.
      </motion.p>

   <div className="mt-16 grid grid-cols-2 gap-6 place-items-center sm:flex sm:flex-wrap sm:gap-12 sm:justify-start">
  {services.map((service, index) => (
    <ServiceCard key={service.title} index={index} {...service} />
  ))}
</div>
    </div>
  );
};

export default SectionWrapper(About, "about");
