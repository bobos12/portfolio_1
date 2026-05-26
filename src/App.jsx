import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";

import { About, Contact, Experience, Hero, Navbar, Tech, Works } from "./components";
import Galaxy from "./components/Galaxy";
import Footer from "./components/Footer";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <BrowserRouter>
      <div className="fixed inset-0 z-0">
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
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Tech />
        <Works />
        <Contact />
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
