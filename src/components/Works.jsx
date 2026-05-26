import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";

const Works = () => {
  const [current, setCurrent] = useState(0);
  const dirRef = useRef(1);
  const [touchStart, setTouchStart] = useState(null);

  const total = projects.length;

  const go = (idx) => {
    dirRef.current = idx > current ? 1 : -1;
    setCurrent(idx);
  };

  const prev = () => go((current - 1 + total) % total);
  const next = () => go((current + 1) % total);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  const dir = dirRef.current;
  const project = projects[current];
  const num = String(current + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  const infoVariants = {
    enter:  { opacity: 0, x: dir > 0 ? 48 : -48 },
    center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   { opacity: 0, x: dir > 0 ? -48 : 48, transition: { duration: 0.25 } },
  };

  const imgVariants = {
    enter:  { opacity: 0, scale: 1.06, x: dir > 0 ? 60 : -60 },
    center: { opacity: 1, scale: 1,    x: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit:   { opacity: 0, scale: 1.03, x: dir > 0 ? -40 : 40, transition: { duration: 0.3 } },
  };

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6 }}
      >
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mt-4 text-secondary text-[15px] max-w-2xl leading-[28px] font-light"
      >
        Each project reflects real-world problem solving and clean architecture — from full-stack apps to 3D web experiences.
      </motion.p>

      {/* Slider */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-12"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden border border-white/[0.07] bg-[#0a0a0a] min-h-[420px] lg:min-h-[460px]">

          {/* ── Left: Info ── */}
          <div className="relative lg:w-[45%] flex flex-col justify-between p-7 sm:p-10 overflow-hidden order-2 lg:order-1">

            {/* Ghost number */}
            <span className="absolute -bottom-4 -left-2 text-[120px] font-black text-white/[0.025] leading-none select-none pointer-events-none">
              {num}
            </span>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                variants={infoVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative z-10 flex flex-col h-full justify-between"
              >
                <div>
                  {/* Counter */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-white text-[13px] font-bold tracking-widest">{num}</span>
                    <span className="flex-1 h-px bg-white/10" />
                    <span className="text-white/25 text-[12px] tracking-widest">{tot}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-[24px] sm:text-[28px] font-bold leading-tight mb-4">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-white/45 text-[13px] leading-[22px] mb-6 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] ${tag.color}`}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* GitHub button */}
                <a
                  href={project.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-2.5 border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.07] px-5 py-3 rounded-xl text-white/60 hover:text-white text-[13px] font-medium transition-all duration-200 w-fit"
                >
                  <img src={github} alt="github" className="w-4 h-4 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  View on GitHub
                  <svg className="w-3.5 h-3.5 -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right: Image ── */}
          <div className="lg:w-[55%] relative overflow-hidden order-1 lg:order-2 h-[220px] sm:h-[280px] lg:h-auto">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current}
                src={project.image}
                alt={project.name}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent hidden lg:block pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent lg:hidden pointer-events-none" />
          </div>
        </div>

        {/* ── Navigation ── */}
        <div className="mt-6 flex items-center justify-between">

          {/* Dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                aria-label={`Go to project ${i + 1}`}
                className="p-1"
              >
                <motion.span
                  className="block rounded-full bg-white"
                  animate={{ width: i === current ? 20 : 6, height: 6, opacity: i === current ? 1 : 0.25 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-white/12 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Previous project"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-white/12 hover:border-white/30 bg-white/[0.04] hover:bg-white/[0.08] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Next project"
            >
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "");
