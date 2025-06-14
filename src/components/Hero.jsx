import { useState, useEffect } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/+201115655645",
      icon: <FaWhatsapp className="w-5 h-5" />,
      hoverColor: "hover:text-green-400 hover:shadow-green-400/50",
      bgColor: "hover:bg-green-400/10"
    },
    {
      name: "Gmail",
      url: "mailto:aahmedsharaff@gmail.com",
      icon: <FaEnvelope className="w-5 h-5" />,
      hoverColor: "hover:text-red-400 hover:shadow-red-400/50",
      bgColor: "hover:bg-red-400/10"
    },
    {
      name: "Instagram",
      url: "https://instagram.com/sharaf__999__",
      icon: <FaInstagram className="w-5 h-5" />,
      hoverColor: "hover:text-pink-400 hover:shadow-pink-400/50",
      bgColor: "hover:bg-pink-400/10"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/ahmed-sharaf-505b3a291/", // Update with your LinkedIn
      icon: <FaLinkedin className="w-5 h-5" />,
      hoverColor: "hover:text-blue-400 hover:shadow-blue-400/50",
      bgColor: "hover:bg-blue-400/10"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
      {/* Replace the animated background gradient with a static one */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(145, 94, 255, 0.3) 0%, rgba(145, 94, 255, 0.1) 25%, transparent 50%)`
        }}
      />
      
      {/* Main content */}
      <motion.div 
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-8`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Animated indicator line */}
        <motion.div 
          className="flex flex-col justify-center items-center mt-5"
          variants={itemVariants}
        >
          <motion.div 
            className="w-5 h-5 rounded-full bg-[#915eff]"
            animate={{ 
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 0 0 rgba(145, 94, 255, 0.7)",
                "0 0 0 10px rgba(145, 94, 255, 0)",
                "0 0 0 0 rgba(145, 94, 255, 0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
          <div className="w-1 sm:h-80 h-40 violet-gradient opacity-80" />
        </motion.div>

        {/* Text content */}
        <div className="z-10 relative flex-1">
          <motion.h1 
            className={`${styles.heroHeadText} text-white`}
            variants={itemVariants}
          >
            Hi, I'm{" "}
            <motion.span 
              className="text-[#915eff] relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ahmed Sharaf
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#915eff]/20 to-transparent rounded-lg blur-sm"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.span>
          </motion.h1>
          
          <motion.p 
            className={`${styles.heroSubText} mt-4 text-white-100 max-w-3xl`}
            variants={itemVariants}
          >
            <span className="text-white font-semibold">One brain, two stacks. Making the internet a better place.</span>
            
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            variants={itemVariants}
          >
            
            
            <motion.a
              href="/Ahmed_Sharaf_CV.pdf" // Link to your CV
              download="Ahmed_Sharaf_CV.pdf"
              className="border-2 border-[#915eff] text-[#915eff] hover:bg-[#915eff] hover:text-white font-bold py-3 px-8 rounded-full transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="flex flex-wrap gap-4 mt-8"
            variants={itemVariants}
          >
            <p className="text-white-100 text-sm mb-3 w-full">Connect with me:</p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    relative p-3 rounded-full border border-white/20 text-white/70 
                    transition-all duration-300 backdrop-blur-sm
                    ${link.hoverColor} ${link.bgColor}
                    hover:border-current hover:shadow-lg hover:scale-110
                  `}
                  whileHover={{ 
                    y: -3,
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + index * 0.1 }
                  }}
                >
                  {link.icon}
                  <span className="sr-only">{link.name}</span>
                  
                  {/* Tooltip */}
                  <motion.div
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 pointer-events-none"
                    whileHover={{ opacity: 1, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/80"></div>
                  </motion.div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <ComputersCanvas />
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div
          className="w-[35px] h-[64px] rounded-3xl border-4 border-white/30 flex justify-center items-start p-2 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            const nextSection = document.getElementById('about');
            nextSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-white/70"
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#915eff]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;