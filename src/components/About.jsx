import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.15, 0.6)}
    whileHover={{ y: -10, scale: 1.06 }}
    transition={{ type: "spring", stiffness: 260, damping: 20 }}
    className="flex flex-col items-center gap-4 cursor-default"
  >
    <motion.img
      src={icon}
      alt={title}
      className="w-20 h-20 object-contain"
      whileHover={{ filter: "drop-shadow(0 0 18px rgba(255,255,255,0.45))" }}
      transition={{ duration: 0.25 }}
      style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,0.12))" }}
    />
    <h3 className="text-white/70 text-[14px] font-medium text-center tracking-wide uppercase">
      {title}
    </h3>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-6 text-secondary text-[16px] max-w-3xl leading-[32px] font-light'
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
    </>
  );
};

export default SectionWrapper(About, "about");
