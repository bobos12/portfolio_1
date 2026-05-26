import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { About, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import Galaxy from "./components/Galaxy";
import Footer from "./components/Footer";
import IntroScreen from "./components/IntroScreen";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <BrowserRouter>
      <Cursor />
      <ScrollProgress />
      {!introDone && <IntroScreen onComplete={() => setIntroDone(true)} />}

      <motion.div
        className="fixed inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Galaxy
          mouseInteraction={!isMobile}
          mouseRepulsion={false}
          density={isMobile ? 0.9 : 1.3}
          glowIntensity={0.28}
          saturation={0}
          hueShift={0}
          starSpeed={0.3}
          speed={0.7}
          twinkleIntensity={0.5}
          rotationSpeed={0.015}
          repulsionStrength={2}
          transparent={true}
        />
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Navbar />
        <Hero />
        <About />
        <Tech />
        <Works />
        <Experience />
        <Contact />
        <Footer />
      </motion.div>
    </BrowserRouter>
  );
};

export default App;
