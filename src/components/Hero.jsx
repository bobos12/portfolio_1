import { useState, useEffect, useMemo, useRef } from "react";
import { styles } from "../styles";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import {
  motion, AnimatePresence, // eslint-disable-line no-unused-vars
  useMotionValue, useTransform, useSpring,
} from "framer-motion";

const ROLES = ["Full Stack Developer", "React Engineer", "Node.js Developer", "UI Craftsman"];

const SOCIAL = [
  { name: "LinkedIn",  url: "https://www.linkedin.com/in/ahmed-sharaf-505b3a291/", icon: FaLinkedin,  color: "#0A66C2" },
  { name: "GitHub",    url: "https://github.com/bobos12",                         icon: FaGithub,    color: "#ffffff"  },
  { name: "WhatsApp",  url: "https://wa.me/+201115655645",                          icon: FaWhatsapp,  color: "#25D366"  },
  { name: "Instagram", url: "https://instagram.com/sharaf__999__",                  icon: FaInstagram, color: "#E1306C"  },
  { name: "Gmail",     url: "mailto:aahmedsharaff@gmail.com",                       icon: SiGmail,     color: "#EA4335"  },
];

const STATS = [
  { value: "3+",  label: "Years Exp."  },
  { value: "20+", label: "Projects"    },
  { value: "10+", label: "Clients"     },
];

/* Thin animated underline on the name */
const AnimatedUnderline = () => (
  <motion.span
    className="absolute bottom-1 left-0 h-[3px] bg-white/25 rounded-full"
    initial={{ width: 0 }}
    animate={{ width: "100%" }}
    transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
  />
);

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  /* --- 3-D card tilt ------------------------------------------------- */
  const cardRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 30 });

  const onCardMove  = (e) => {
    const r = cardRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width  - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onCardLeave = () => { mx.set(0); my.set(0); };

  /* --- Role cycling -------------------------------------------------- */
  useEffect(() => {
    const t = setInterval(() => setRoleIndex(i => (i + 1) % ROLES.length), 2800);
    return () => clearInterval(t);
  }, []);

  /* --- Particles ----------------------------------------------------- */
  const particles = useMemo(() =>
    Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left:     `${(i * 5.3) % 100}%`,
      top:      `${(i * 7.1 + 8) % 92}%`,
      duration: 3 + (i % 5),
      delay:    (i * 0.28) % 2.5,
      size:     i % 4 === 0 ? 5 : 3,
    })), []);

  /* --- Animation variants -------------------------------------------- */
  const wrap = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { delayChildren: 0.15, staggerChildren: 0.1 } },
  };
  const item = {
    hidden:  { y: 28, opacity: 0 },
    visible: { y: 0,  opacity: 1, transition: { type: "spring", stiffness: 80 } },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <motion.div
        className={`${styles.paddingX} w-full max-w-7xl mx-auto pt-24 pb-16
                    flex flex-col md:flex-row items-center justify-between gap-14`}
        variants={wrap}
        initial="hidden"
        animate="visible"
      >

        {/* ══ LEFT — text content ══════════════════════════════════════ */}
        <div className="flex-1 flex items-start gap-5 z-10 order-1">

          {/* Pulse + vertical line */}
          <motion.div
            className="hidden sm:flex flex-col items-center mt-2 shrink-0"
            variants={item}
          >
            <motion.span
              className="w-4 h-4 rounded-full bg-white block"
              animate={{
                scale: [1, 1.35, 1],
                boxShadow: [
                  "0 0 0 0px rgba(255,255,255,0.5)",
                  "0 0 0 10px rgba(255,255,255,0)",
                  "0 0 0 0px rgba(255,255,255,0)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <div className="w-px h-52 bg-gradient-to-b from-white/25 to-transparent mt-2" />
          </motion.div>

          <div className="flex flex-col w-full max-w-xl items-center md:items-start text-center md:text-left">
            {/* Name */}
            <motion.h1
              className={`${styles.heroHeadText} text-white leading-[1.05]`}
              variants={item}
            >
              Hi, I'm
              <br />
              <span className="relative inline-block">
                Ahmed Sharaf
                <AnimatedUnderline />
              </span>
            </motion.h1>

            {/* Cycling role */}
            <motion.div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 h-7 overflow-hidden" variants={item}>
              <span className="w-1 h-1 rounded-full bg-white/30 shrink-0" />
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="text-white/50 text-[15px] sm:text-[17px] font-light tracking-wide"
                  initial={{ y: 18, opacity: 0 }}
                  animate={{ y: 0,  opacity: 1 }}
                  exit={{   y: -18, opacity: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p
              className="mt-5 text-white/40 text-[14px] max-w-md leading-relaxed font-light"
              variants={item}
            >
              One brain, two stacks — building scalable, performant, and
              visually stunning web experiences from idea to production.
            </motion.p>

            {/* Stats */}
            <motion.div className="hidden sm:flex gap-8 mt-7" variants={item}>
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-white text-[24px] font-bold leading-none">{s.value}</span>
                  <span className="text-white/30 text-[10px] mt-1 uppercase tracking-widest">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div className="flex flex-wrap justify-center md:justify-start gap-3 mt-8" variants={item}>
              <motion.a
                href="/Ahmed-Sharaf-CV.pdf"
                download="Ahmed-Sharaf-CV.pdf"
                className="inline-flex items-center gap-2 bg-white text-black font-semibold py-3 px-7 rounded-full text-[13px] tracking-wide"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                Download CV
              </motion.a>
              <motion.a
                href="#work"
                className="inline-flex items-center gap-2 border border-white/20 text-white/70 font-semibold py-3 px-7 rounded-full text-[13px] tracking-wide hover:border-white/40 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                View Work
              </motion.a>
            </motion.div>

            {/* Social icons — branded colors */}
            <motion.div className="flex items-center justify-center md:justify-start gap-5 mt-7" variants={item}>
              {SOCIAL.map((s, i) => {
                const SocialIcon = s.icon;
                return (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="flex items-center justify-center"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                    whileHover={{ color: s.color, y: -5, scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.65 + i * 0.07 } }}
                  >
                    <SocialIcon className="w-[26px] h-[26px]" />
                    <span className="sr-only">{s.name}</span>
                  </motion.a>
                );
              })}
            </motion.div>

          </div>
        </div>

        {/* ══ RIGHT — photo card ═══════════════════════════════════════ */}
        <motion.div
          ref={cardRef}
          className="shrink-0 z-10 order-2"
          onMouseMove={onCardMove}
          onMouseLeave={onCardLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          variants={item}
        >
          <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[390px] md:w-[340px] md:h-[440px]">

            {/* Glow */}
            <div className="absolute -inset-5 rounded-[2.5rem] bg-white/[0.035] blur-2xl" />

            {/* Card */}
            <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
              <img
                src="/me.png"
                alt="Ahmed Sharaf"
                className="w-full h-full object-cover object-top"
              />

              {/* Bottom glass strip */}
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-center justify-between"
                style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
              >
                <div>
                  <p className="text-white text-[13px] font-semibold leading-tight">Ahmed Sharaf</p>
                  <p className="text-white/40 text-[11px] mt-0.5">Full Stack Developer</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              </div>
            </div>

            {/* Open to work tag */}
            <div
              className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/65 border border-white/10"
              style={{ background: "rgba(8,8,8,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
            >
              Open to work
            </div>

          </div>
        </motion.div>

      </motion.div>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
    <motion.div
      className="absolute bottom-6 w-full flex justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className="flex flex-col items-center"
      >
        <div className="w-5 h-5 border-r-2 border-b-2 border-white/60 rotate-45" />
      </motion.div>
    </motion.div>

      {/* ── Floating particles ───────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/[0.06] block"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [-8, -80], opacity: [0, 0.55, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

    </section>
  );
};

export default Hero;
