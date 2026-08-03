import { useState, useMemo, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight, HiArrowRight } from "react-icons/hi2";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import ProjectModal from "./ProjectModal";
import { BrowserFrame, StatusBadge } from "./ProjectPreview";

const CATEGORIES = ["All", "Client Work", "Full-Stack", "Frontend"];

/* Renders only one layout tree at a time so project images aren't fetched twice */
const useIsDesktop = () => {
  const query = "(min-width: 1024px)";
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
};

/* ─────────────────────────── Desktop: split showcase ─────────────────────────── */

const Showcase = ({ items, active, setActive, onOpen }) => {
  const project = items[active];
  if (!project) return null;

  return (
    <div className="mt-8 grid grid-cols-12 gap-10">
      {/* Preview panel */}
      <div className="col-span-7">
        <div className="sticky top-24">
          <BrowserFrame project={project} className="shadow-card">
            <AnimatePresence mode="wait">
              <motion.img
                key={project.name}
                src={project.image}
                alt={project.name}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 h-full w-full cursor-pointer object-cover object-top"
                onClick={() => onOpen(active)}
              />
            </AnimatePresence>

            <span className="pointer-events-none absolute bottom-3 right-4 rounded-md bg-black/50 px-2 py-1 font-mono text-[10px] tracking-[0.18em] text-white/50 backdrop-blur-sm">
              {String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
          </BrowserFrame>

          {/* Meta */}
          <AnimatePresence mode="wait">
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="pt-6"
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                {project.categories[0]}
              </p>
              <h3 className="mb-3 text-[26px] font-bold leading-tight text-white">
                {project.name}
              </h3>
              <p className="mb-5 max-w-xl text-[13.5px] leading-[23px] text-white/45">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium ${tag.color}`}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {project.live_demo_link && (
                  <a
                    href={project.live_demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-black transition-colors duration-200 hover:bg-white/85"
                  >
                    Live Demo
                    <HiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                )}
                {project.source_code_link && (
                  <a
                    href={project.source_code_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-[13px] font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
                  >
                    <FaGithub className="h-4 w-4" />
                    View Code
                  </a>
                )}
                <button
                  onClick={() => onOpen(active)}
                  className="group inline-flex items-center gap-1.5 px-2 py-3 text-[13px] font-medium text-white/40 transition-colors duration-200 hover:text-white"
                >
                  Full details
                  <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Index list */}
      <div className="col-span-5">
        <div className="flex flex-col">
          {items.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.name}
                data-testid="project-row"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => onOpen(i)}
                className="group relative flex items-center gap-4 border-b border-white/[0.06] py-4 text-left transition-colors duration-200"
              >
                {isActive && (
                  <motion.span
                    layoutId="row-highlight"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    className="absolute inset-x-[-12px] inset-y-0 -z-10 rounded-lg bg-white/[0.045]"
                  />
                )}

                <span
                  className={`font-mono text-[11px] tracking-[0.16em] transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/25"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[15px] font-semibold transition-colors duration-200 ${
                      isActive ? "text-white" : "text-white/55"
                    }`}
                  >
                    {p.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-white/25">
                    {p.categories[0]}
                  </span>
                </span>

                {p.live_demo_link && (
                  <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                )}

                <HiArrowUpRight
                  className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                    isActive
                      ? "translate-x-0 text-white opacity-100"
                      : "-translate-x-1 text-white/40 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────── Mobile: snap carousel card ─────────────────────────── */

const ProjectCard = ({ project, number, onOpen }) => {
  const stop = (e) => e.stopPropagation();

  return (
    <article
      data-testid="project-card"
      onClick={onOpen}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0a0a] transition-colors duration-300 hover:border-white/20"
    >
      <div className="relative h-[165px] shrink-0 overflow-hidden sm:h-[205px]">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/15 to-transparent" />

        <span className="pointer-events-none absolute left-4 top-3.5 font-mono text-[11px] tracking-[0.2em] text-white/70">
          {number}
        </span>

        <StatusBadge project={project} className="absolute right-3 top-3" />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
          {project.categories[0]}
        </p>

        <h3 className="mb-2 text-[16px] font-bold leading-tight text-white">
          {project.name}
        </h3>

        <p className="mb-4 line-clamp-2 text-[12.5px] leading-[20px] text-white/40">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag.name}
              className={`rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10.5px] font-medium ${tag.color}`}
            >
              #{tag.name}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10.5px] font-medium text-white/35">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
          {project.live_demo_link && (
            <a
              href={project.live_demo_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[12px] font-semibold text-black transition-colors duration-200 hover:bg-white/85"
            >
              {project.status === "dev" ? "View Demo" : "Live Demo"}
              <HiArrowUpRight className="h-3.5 w-3.5" />
            </a>
          )}

          {project.source_code_link && (
            <a
              href={project.source_code_link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stop}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/12 bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              <FaGithub className="h-3.5 w-3.5" />
              Code
            </a>
          )}

          <span className="ml-auto inline-flex items-center gap-1 text-[12px] font-medium text-white/35 transition-colors duration-200 group-hover:text-white">
            Details
            <HiArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  );
};

/* ─────────────────────────────────── Section ─────────────────────────────────── */

const Works = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const trackRef = useRef(null);
  const isDesktop = useIsDesktop();

  const counts = useMemo(() => {
    const map = { All: projects.length };
    CATEGORIES.slice(1).forEach((c) => {
      map[c] = projects.filter((p) => p.categories.includes(c)).length;
    });
    return map;
  }, []);

  /* Client work leads, then anything else with a live site.
     Array.sort is stable, so the authored order holds within each group. */
  const filtered = useMemo(() => {
    const list =
      filter === "All"
        ? projects
        : projects.filter((p) => p.categories.includes(filter));

    const rank = (p) =>
      (p.categories.includes("Client Work") ? 0 : 2) + (p.live_demo_link ? 0 : 1);

    return [...list].sort((a, b) => rank(a) - rank(b));
  }, [filter]);

  const changeFilter = (cat) => {
    setFilter(cat);
    setActive(0);
    setSlide(0);
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  };

  const onTrackScroll = useCallback((e) => {
    const el = e.currentTarget;
    const card = el.children[0];
    if (!card) return;
    setSlide(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  }, []);

  const goToSlide = (i) => {
    const el = trackRef.current;
    const card = el?.children[0];
    if (!el || !card) return;
    el.scrollTo({ left: i * (card.offsetWidth + 16), behavior: "smooth" });
  };

  const openAt = (i) => setSelected(i);
  const close = () => setSelected(null);
  const prev = () => setSelected((i) => (i - 1 + filtered.length) % filtered.length);
  const next = () => setSelected((i) => (i + 1) % filtered.length);

  return (
    <>
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
        className="mt-4 max-w-2xl text-[15px] font-light leading-[28px] text-secondary"
      >
        Real-world problem solving and clean architecture — from full-stack apps
        and client websites to 3D web experiences.
      </motion.p>

      {/* ── Filter bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ delay: 0.22, duration: 0.5 }}
        className="mt-10"
      >
        <div className="no-scrollbar -mx-6 flex gap-2.5 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:px-0">
          {CATEGORIES.map((cat) => {
            const isOn = cat === filter;
            return (
              <button
                key={cat}
                onClick={() => changeFilter(cat)}
                aria-pressed={isOn}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ${
                  isOn ? "text-black" : "text-white/45 hover:text-white"
                }`}
              >
                {isOn && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-white"
                  />
                )}
                <span className="relative z-10 whitespace-nowrap">
                  {cat}
                  <span
                    className={`ml-2 font-mono text-[11px] ${
                      isOn ? "text-black/45" : "text-white/25"
                    }`}
                  >
                    {String(counts[cat]).padStart(2, "0")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {isDesktop ? (
        <Showcase
          items={filtered}
          active={Math.min(active, filtered.length - 1)}
          setActive={setActive}
          onOpen={openAt}
        />
      ) : (
        <div>
          <div
            ref={trackRef}
            onScroll={onTrackScroll}
            className="no-scrollbar -mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 sm:-mx-16 sm:px-16"
          >
            {filtered.map((project, i) => (
              <div
                key={project.name}
                className="w-[82%] shrink-0 snap-center xs:w-[74%] sm:w-[54%]"
              >
                <ProjectCard
                  project={project}
                  number={String(i + 1).padStart(2, "0")}
                  onOpen={() => openAt(i)}
                />
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {filtered.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to project ${i + 1}`}
                className="p-1"
              >
                <motion.span
                  className="block rounded-full bg-white"
                  animate={{
                    width: i === slide ? 18 : 6,
                    height: 6,
                    opacity: i === slide ? 1 : 0.22,
                  }}
                  transition={{ duration: 0.25 }}
                />
              </button>
            ))}
          </div>

          <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/20">
            Swipe to explore
          </p>
        </div>
      )}

      {selected !== null && filtered[selected] && (
        <ProjectModal
          project={filtered[selected]}
          index={selected}
          total={filtered.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
};

export default SectionWrapper(Works, "work");
