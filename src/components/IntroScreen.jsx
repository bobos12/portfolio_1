import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const WORD1 = "AHMED".split("");
const WORD2 = "SHARAF".split("");

const CORNERS = [
  { pos: "top-7 left-7",     border: "border-t border-l" },
  { pos: "top-7 right-7",    border: "border-t border-r" },
  { pos: "bottom-7 left-7",  border: "border-b border-l" },
  { pos: "bottom-7 right-7", border: "border-b border-r" },
];

const IntroScreen = ({ onComplete }) => {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden select-none"
      animate={leaving ? { opacity: 0, scale: 1.07 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.4, 0, 0.15, 1] }}
      onAnimationComplete={() => leaving && onComplete()}
    >
      {/* Scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 38% at 50% 50%, rgba(255,255,255,0.055) 0%, transparent 70%)",
        }}
      />

      {/* Corner brackets */}
      {CORNERS.map(({ pos, border }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-7 h-7 ${border} border-white/20`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: "easeOut" }}
        />
      ))}

      {/* Center content */}
      <div className="flex flex-col items-center z-10 px-6">

        {/* Tag */}
        <motion.p
          className="text-white/20 text-[9px] sm:text-[10px] tracking-[0.6em] uppercase mb-7"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Portfolio
        </motion.p>

        {/* Name — two words stacked, each character slides up independently */}
        <div className="flex flex-col items-center gap-0.5">
          {[WORD1, WORD2].map((word, wi) => (
            <div key={wi} className="flex">
              {word.map((char, ci) => {
                const globalIdx = wi === 0 ? ci : WORD1.length + ci;
                return (
                  <div key={ci} style={{ overflow: "hidden", display: "inline-block" }}>
                    <motion.span
                      className="block text-white font-bold"
                      style={{
                        fontSize: "clamp(40px, 11vw, 76px)",
                        letterSpacing: "0.18em",
                        lineHeight: 1.05,
                      }}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.32 + globalIdx * 0.055,
                        duration: 0.62,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Underline sweep */}
        <div className="w-full mt-5 overflow-hidden">
          <motion.div
            className="h-px bg-white/18"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ delay: 1.2, duration: 0.7, ease: "easeOut" }}
          />
        </div>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-white/30 text-[10px] sm:text-[11px] tracking-[0.42em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.75, duration: 0.8 }}
        >
          Full Stack Developer
        </motion.p>

      </div>

      {/* Progress bar */}
      <div className="absolute bottom-10 flex flex-col items-center gap-2.5">
        <div className="w-28 h-px bg-white/[0.07] overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-white/35 rounded-full"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.35, duration: 2.4, ease: "linear" }}
          />
        </div>
        <motion.span
          className="text-white/15 text-[9px] tracking-[0.3em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading
        </motion.span>
      </div>

    </motion.div>
  );
};

export default IntroScreen;
