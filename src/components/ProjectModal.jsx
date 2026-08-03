import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import {
  HiXMark,
  HiArrowUpRight,
  HiChevronLeft,
  HiChevronRight,
  HiCheck,
} from "react-icons/hi2";

import { BrowserFrame, StatusBadge } from "./ProjectPreview";

const Label = ({ children }) => (
  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/30">
    {children}
  </p>
);

const MetaRow = ({ label, children }) => (
  <div className="flex items-start justify-between gap-4 border-b border-white/[0.05] py-2.5 last:border-0 last:pb-0">
    <span className="shrink-0 text-[12px] text-white/35">{label}</span>
    <span className="text-right text-[12px] font-medium text-white/75">
      {children}
    </span>
  </div>
);

/* Primary actions — surfaced directly under the hero on mobile, in the sidebar on desktop */
const Actions = ({ project, className = "" }) => {
  if (!project.live_demo_link && !project.source_code_link) return null;

  return (
    <div className={`flex flex-col gap-2.5 sm:flex-row lg:flex-col ${className}`}>
      {project.live_demo_link && (
        <a
          href={project.live_demo_link}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-[13px] font-semibold text-black transition-colors duration-200 hover:bg-white/85"
        >
          {project.status === "dev" ? "View Demo" : "Visit Live Site"}
          <HiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      )}
      {project.source_code_link && (
        <a
          href={project.source_code_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-[13px] font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white"
        >
          <FaGithub className="h-4 w-4" />
          View Source Code
        </a>
      )}
    </div>
  );
};

const ProjectModal = ({ project, index, total, onClose, onPrev, onNext }) => {
  const scrollRef = useRef(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [handleKeyDown]);

  /* Jump back to the top whenever the user pages to another project */
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [index]);

  if (!project) return null;

  const num = String(index + 1).padStart(2, "0");
  const tot = String(total).padStart(2, "0");

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6"
      >
        {/* Desktop side navigation */}
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous project"
          className="absolute left-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-white/[0.08] active:scale-95 xl:flex"
        >
          <HiChevronLeft className="h-5 w-5 text-white/60" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next project"
          className="absolute right-4 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-white/[0.08] active:scale-95 xl:flex"
        >
          <HiChevronRight className="h-5 w-5 text-white/60" />
        </button>

        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, y: 26, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0a] shadow-card"
        >
          {/* ── Sticky header ── */}
          <div className="flex shrink-0 items-center gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-8">
            <span className="hidden font-mono text-[13px] font-bold tracking-[0.18em] text-white/70 sm:block">
              {num}
            </span>

            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-white/30">
                {project.categories?.join(" · ")}
              </p>
              <h3 className="truncate text-[17px] font-bold leading-tight text-white sm:text-[19px]">
                {project.name}
              </h3>
            </div>

            <StatusBadge project={project} className="hidden shrink-0 sm:inline-flex" />

            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 transition-all duration-200 hover:scale-105 hover:border-white/30 hover:bg-white/[0.06] active:scale-95"
            >
              <HiXMark className="h-4 w-4 text-white/70" />
            </button>
          </div>

          {/* ── Scrollable body ── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
            <BrowserFrame project={project}>
              <img
                src={project.image}
                alt={project.name}
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
            </BrowserFrame>

            {/* Mobile: primary actions sit directly under the hero, not buried at the bottom */}
            <Actions project={project} className="mt-5 lg:hidden" />

            <div className="mt-7 grid gap-8 lg:mt-8 lg:grid-cols-3">
              {/* Main column */}
              <div className="space-y-8 lg:col-span-2">
                <section>
                  <Label>Overview</Label>
                  <p className="text-[14px] leading-[25px] text-white/55">
                    {project.description}
                  </p>

                  {project.status === "dev" && (
                    <p className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-4 py-3 text-[12.5px] leading-[20px] text-amber-200/80">
                      <span className="live-dot mt-1.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      This project is still in its development phase — the live
                      link is a work-in-progress demo, so some features are
                      incomplete or subject to change.
                    </p>
                  )}
                </section>

                {project.features?.length > 0 && (
                  <section>
                    <Label>Key Features</Label>
                    <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-[13px] leading-[21px] text-white/55"
                        >
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04]">
                            <HiCheck className="h-2.5 w-2.5 text-white/60" />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {/* Sidebar */}
              <aside className="space-y-5">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Label>Details</Label>
                  <MetaRow label="Type">{project.categories?.[0]}</MetaRow>
                  <MetaRow label="Stack">{project.tags.length} technologies</MetaRow>
                  <MetaRow label="Status">
                    {!project.live_demo_link ? (
                      <span className="text-white/45">Source only</span>
                    ) : project.status === "dev" ? (
                      <span className="text-amber-300">In development</span>
                    ) : (
                      <span className="text-emerald-300">Live</span>
                    )}
                  </MetaRow>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                  <Label>Tech Stack</Label>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className={`rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium ${tag.color}`}
                      >
                        #{tag.name}
                      </span>
                    ))}
                  </div>
                </div>

                <Actions project={project} className="hidden lg:flex" />
              </aside>
            </div>
          </div>

          {/* ── Sticky footer nav ── */}
          <div className="flex shrink-0 items-center justify-between border-t border-white/[0.07] px-5 py-3.5 sm:px-8">
            <button
              onClick={onPrev}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-medium text-white/50 transition-colors duration-200 hover:text-white active:scale-95"
            >
              <HiChevronLeft className="h-4 w-4" />
              Prev
            </button>

            <span className="font-mono text-[11px] tracking-[0.18em] text-white/30">
              {num} / {tot}
            </span>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-[12.5px] font-medium text-white/50 transition-colors duration-200 hover:text-white active:scale-95"
            >
              Next
              <HiChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
