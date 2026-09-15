import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";

import {
  hero,
  multidevice,
  inboxLight,
  dashboard,
  deals,
  analytics,
  automation,
  broadcasts,
  aiConfig,
  contacts,
  team,
  phoneInbox,
  phoneChat,
} from "../assets/whatsapp-crm";

/* The one place on this site that is allowed to use colour.
   Everything else stays monochrome, which is exactly why this reads as the
   flagship. */
const WA = "#25d366";

const LINKS = {
  live: "",
  code: "",
};

const STACK = [
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "WebSockets",
  "WhatsApp Cloud API",
  "OpenAI",
  "Docker",
];

/* how many stack chips survive below the sm breakpoint */
const STACK_FOLD = 5;

const METRICS = [
  { value: 68, suffix: "%", label: "Chats resolved", sub: "without an agent" },
  { value: 8, suffix: "s", label: "AI first reply", sub: "vs 2m 14s team avg" },
  { value: 1254, label: "Messages today", sub: "sent & received" },
  { value: 2847, label: "Contacts", sub: "under management" },
];

const CAPABILITIES = [
  {
    id: "inbox",
    label: "Shared Inbox",
    kicker: "One inbox. Every conversation.",
    body: "A real-time multi-agent inbox over WebSockets — assignment, tags, saved replies and read receipts, with the full customer record docked beside every thread.",
    image: inboxLight,
    proof: [
      ["38", "open threads"],
      ["5", "agents live"],
    ],
  },
  {
    id: "ai",
    label: "AI Agent",
    kicker: "Support that never sleeps.",
    body: "An AI layer that reads the thread, answers from your knowledge base, qualifies the lead and hands off to a human the moment it should — with every decision written to the audit trail.",
    image: aiConfig,
    proof: [
      ["68%", "auto-resolved"],
      ["8s", "first reply"],
    ],
  },
  {
    id: "crm",
    label: "Contacts & CRM",
    kicker: "Know who you're talking to.",
    body: "Every contact enriched straight from conversation history — lifecycle stage, tags, lead score, deal value and owner, all kept in step with the inbox.",
    image: contacts,
    proof: [
      ["2,847", "contacts"],
      ["92", "top lead score"],
    ],
  },
  {
    id: "pipeline",
    label: "Deal Pipeline",
    kicker: "Turn conversations into revenue.",
    body: "Drag-and-drop stages wired directly to the inbox: a reply moves the deal, the deal moves the forecast. No one re-types anything into a second system.",
    image: deals,
    proof: [
      ["4", "stages"],
      ["Drag & drop", "reordering"],
    ],
  },
  {
    id: "automation",
    label: "Automation",
    kicker: "Automate the follow-up.",
    body: "A visual rule builder — triggers, conditions and actions that run on every inbound message, so routing, tagging and nudges happen without anyone watching.",
    image: automation,
    proof: [
      ["14", "active rules"],
      ["24/7", "always on"],
    ],
  },
  {
    id: "broadcasts",
    label: "Broadcasts",
    kicker: "Reach everyone, one at a time.",
    body: "Segment-targeted campaigns with template approval, send throttling and per-message delivery state — built to respect the WhatsApp rate limits rather than fight them.",
    image: broadcasts,
    proof: [
      ["1,254", "messages/day"],
      ["Template", "approved"],
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    kicker: "Measure everything.",
    body: "Response times, resolution rates, agent workload and revenue attribution — the numbers the whole platform is optimised against, in one view.",
    image: analytics,
    proof: [
      ["7d", "live window"],
      ["441", "peak messages"],
    ],
  },
];

const GALLERY = [
  { src: dashboard, label: "Dashboard" },
  { src: inboxLight, label: "Conversations" },
  { src: contacts, label: "Contacts" },
  { src: deals, label: "Pipeline" },
  { src: automation, label: "Automation" },
  { src: broadcasts, label: "Broadcasts" },
  { src: analytics, label: "Analytics" },
  { src: aiConfig, label: "AI Config" },
  { src: team, label: "Teams" },
];

const PHONES = [
  { src: phoneInbox, label: "Inbox" },
  { src: phoneChat, label: "Conversation" },
];

const ROTATE_MS = 6000;

/* ──────────────────────────── bits ──────────────────────────── */

const Eyebrow = ({ children }) => (
  <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
    {children}
  </span>
);

/** Counts from 0 to `value` once the tile scrolls into view. */
const Metric = ({ value, prefix = "", suffix = "", label, sub, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);

    let raf;
    const start = performance.now() + delay;
    const tick = (t) => {
      const p = Math.min(1, Math.max(0, (t - start) / 1400));
      /* easeOutExpo — fast off the line, long settle */
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay, reduce]);

  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5 transition-colors sm:p-6 duration-500 hover:border-white/15"
    >
      <span
        className="pointer-events-none absolute inset-x-0 -top-px h-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(90deg, transparent, ${WA}, transparent)` }}
      />
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
        {label}
      </p>
      <p className="mt-3 text-[38px] font-black leading-none tracking-[-0.02em] text-white tabular-nums sm:text-[44px]">
        {prefix}
        {n.toLocaleString("en-US")}
        <span style={{ color: WA }}>{suffix}</span>
      </p>
      <p className="mt-2 text-[12.5px] leading-[18px] text-white/35">{sub}</p>
    </div>
  );
};

/* ──────────────────────────── hero stage ──────────────────────────── */

/** Tailwind's `md` breakpoint, as a value the render can branch on. */
const useIsWide = () => {
  const query = "(min-width: 768px)";
  const [wide, setWide] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e) => setWide(e.matches);
    setWide(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return wide;
};

/**
 * Phone-width hero.
 *
 * The desktop hero is a 2400x1350 landing composition — at 342px wide every
 * word in it is gone. So the small screen gets the product's own mobile
 * client, which is portrait and stays legible, with the proof numbers lifted
 * out of the render and set as real text beside it.
 */
const MobileHero = () => (
  <div className="relative mt-10 flex justify-center">
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[6%] -z-10 h-[76%] w-[130%] -translate-x-1/2 rounded-[50%] blur-[70px]"
      style={{ background: `radial-gradient(ellipse at center, ${WA}30, transparent 70%)` }}
    />

    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      className="w-[200px] shrink-0 xs:w-[224px]"
    >
      <div
        className="rounded-[34px] border border-white/[0.16] bg-[#141414] p-1.5"
        style={{ boxShadow: `0 34px 80px -30px ${WA}5c, 0 24px 50px -24px #000` }}
      >
        <div className="overflow-hidden rounded-[28px] bg-black">
          <img
            src={phoneChat}
            alt="WhatsApp CRM — the AI assistant qualifying a lead in a live conversation"
            width={520}
            height={1125}
            fetchPriority="high"
            decoding="async"
            className="block w-full"
          />
        </div>
      </div>
    </motion.div>

    {/* proof cards, tucked against the phone */}
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="absolute -left-1 top-[13%] max-w-[124px] rounded-2xl border border-white/10 bg-black/80 px-3 py-2.5 backdrop-blur-md"
    >
      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/35">
        AI Assistant
      </p>
      <p className="mt-1 text-[22px] font-black leading-none text-white">68%</p>
      <p className="mt-1 text-[10px] leading-[14px] text-white/40">
        resolved with
        <br />
        no agent
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 14 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay: 0.38 }}
      className="absolute -right-1 bottom-[9%] max-w-[132px] rounded-2xl border border-white/10 bg-black/80 px-3 py-2.5 backdrop-blur-md"
    >
      <p className="font-mono text-[8.5px] uppercase tracking-[0.18em] text-white/35">
        Pipeline
      </p>
      <p className="mt-1 text-[19px] font-black leading-none" style={{ color: WA }}>
        Live
      </p>
      <p className="mt-1 text-[10px] leading-[14px] text-white/40">
        deals move as
        <br />
        replies land
      </p>
    </motion.div>
  </div>
);

const Stage = () => {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.25"],
  });

  /* The screen lies back, then stands up to meet you as it enters. */
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const lift = useTransform(scrollYProgress, [0, 1], [56, 0]);

  const rx = useSpring(rotateX, { stiffness: 120, damping: 26, mass: 0.6 });
  const sc = useSpring(scale, { stiffness: 120, damping: 26, mass: 0.6 });
  const ly = useSpring(lift, { stiffness: 120, damping: 26, mass: 0.6 });

  const motionStyle = reduce
    ? undefined
    : { rotateX: rx, scale: sc, y: ly, transformPerspective: 1600 };

  return (
    <div ref={ref} className="relative mt-12 sm:mt-16">
      {/* bloom behind the screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[8%] -z-10 h-[70%] w-[88%] -translate-x-1/2 rounded-[50%] blur-[90px]"
        style={{ background: `radial-gradient(ellipse at center, ${WA}2e, transparent 70%)` }}
      />

      <motion.div style={motionStyle} className="origin-bottom will-change-transform">
        <div
          className="overflow-hidden rounded-2xl border border-white/[0.09] sm:rounded-[20px]"
          style={{ boxShadow: `0 40px 120px -30px ${WA}26, 0 30px 90px -40px #000` }}
        >
          <img
            src={hero}
            alt="WhatsApp CRM — dashboard, AI assistant and pipeline overview"
            width={2000}
            height={1125}
            fetchPriority="high"
            decoding="async"
            className="block w-full"
          />
        </div>
      </motion.div>

      {/* fade the bottom of the screenshot into the page */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"
      />
    </div>
  );
};

/* ──────────────────────── capability explorer ──────────────────────── */

const Explorer = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(
      () => setActive((i) => (i + 1) % CAPABILITIES.length),
      ROTATE_MS
    );
    return () => clearTimeout(id);
  }, [running, active]);

  /* The pill rail is the only index on small screens, so the auto-rotation has
     to drag the rail along with it or the selection scrolls out of sight.
     Setting scrollLeft rather than calling scrollIntoView: the latter walks
     every scrollable ancestor, which drags the page itself sideways. */
  const railRef = useRef(null);
  useEffect(() => {
    const rail = railRef.current;
    const pill = rail?.children[active];
    if (!rail || !pill) return;
    rail.scrollTo({
      left: pill.offsetLeft - (rail.clientWidth - pill.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const cap = CAPABILITIES[active];

  return (
    <div
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="mt-20 sm:mt-32"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>What it does</Eyebrow>
          <h3 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.02em] text-white sm:text-[34px]">
            Seven surfaces, one data model.
          </h3>
        </div>
        <p className="max-w-sm text-[13.5px] leading-[22px] text-white/35">
          Every screen below reads from the same live store — reply in the inbox
          and the pipeline, the forecast and the dashboard all move with it.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-12 gap-6 lg:gap-10">
        {/* index */}
        <div className="col-span-12 lg:col-span-4">
          {/* mobile: pill rail */}
          <div
            ref={railRef}
            className="no-scrollbar -mx-6 flex gap-2 overflow-x-auto px-6 pb-1 lg:hidden"
          >
            {CAPABILITIES.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-colors duration-200 ${
                  i === active
                    ? "border-transparent text-black"
                    : "border-white/10 text-white/45"
                }`}
                style={i === active ? { background: WA } : undefined}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* desktop: stacked list with progress */}
          <div className="hidden flex-col lg:flex">
            {CAPABILITIES.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-current={on}
                  className="group relative overflow-hidden border-b border-white/[0.06] py-4 pl-4 pr-3 text-left"
                >
                  {on && (
                    <motion.span
                      layoutId="cap-bg"
                      transition={{ type: "spring", stiffness: 400, damping: 36 }}
                      className="absolute inset-0 -z-10 rounded-lg bg-white/[0.04]"
                    />
                  )}

                  <span className="flex items-center gap-3">
                    <span
                      className={`font-mono text-[10px] tracking-[0.16em] transition-colors duration-200 ${
                        on ? "" : "text-white/20"
                      }`}
                      style={on ? { color: WA } : undefined}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`text-[15px] font-semibold transition-colors duration-200 ${
                        on ? "text-white" : "text-white/45 group-hover:text-white/75"
                      }`}
                    >
                      {c.label}
                    </span>
                  </span>

                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.span
                        key="kicker"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="block overflow-hidden"
                      >
                        <span className="mt-1.5 block pl-[26px] text-[12.5px] leading-[20px] text-white/40">
                          {c.kicker}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* auto-advance progress */}
                  {on && (
                    <span className="absolute bottom-0 left-0 h-px w-full bg-white/[0.06]">
                      <span
                        key={`${active}-${running}`}
                        className="block h-full w-full origin-left"
                        style={{
                          background: WA,
                          transform: running ? undefined : "scaleX(1)",
                          animation: running
                            ? `waProgress ${ROTATE_MS}ms linear forwards`
                            : "none",
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* stage */}
        <div className="col-span-12 lg:col-span-8">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[40px] blur-[70px]"
              style={{ background: `radial-gradient(ellipse at 50% 40%, ${WA}1f, transparent 70%)` }}
            />

            <div className="relative overflow-hidden rounded-xl border border-white/[0.09] bg-[#0b0f0d] sm:rounded-2xl">
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:px-4 sm:py-2.5">
                <div className="flex shrink-0 gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-white/12 sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-white/12 sm:h-2.5 sm:w-2.5" />
                  <span className="h-2 w-2 rounded-full bg-white/12 sm:h-2.5 sm:w-2.5" />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-center">
                  <span className="truncate rounded-md bg-black/40 px-3 py-1 font-mono text-[9.5px] text-white/30 sm:text-[10.5px]">
                    app.whatsapp-crm.io/{cap.id}
                  </span>
                </div>
                <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
                  <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: WA }} />
                  <span
                    className="font-mono text-[9px] uppercase tracking-[0.14em]"
                    style={{ color: WA }}
                  >
                    Live
                  </span>
                </span>
              </div>

              {/* `contain`, not `cover` — the whole screen has to be visible at
                  every width rather than cropped to fill the frame. */}
              <div className="relative aspect-[1700/1063] overflow-hidden bg-[#0a0a0a]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.img
                    key={cap.id}
                    src={cap.image}
                    alt={`WhatsApp CRM — ${cap.label}`}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0 h-full w-full object-contain object-top"
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* copy under the stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={cap.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.28 }}
              className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="max-w-xl">
                <h4 className="text-[18px] font-bold text-white sm:text-[20px]">
                  {cap.kicker}
                </h4>
                <p className="mt-2 text-[13.5px] leading-[23px] text-white/40">
                  {cap.body}
                </p>
              </div>

              <div className="flex shrink-0 gap-8 sm:gap-10">
                {cap.proof.map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[19px] font-bold leading-none text-white">{v}</p>
                    <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/25">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────── surface marquee ──────────────────────── */

const Marquee = () => {
  /* Two identical tracks so the loop has no seam. */
  const track = (key) => (
    <div key={key} className="flex shrink-0 gap-5 pr-5" aria-hidden={key === "b"}>
      {GALLERY.map((g) => (
        <figure
          key={g.label}
          className="group relative w-[300px] shrink-0 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0a0a0a] sm:w-[380px]"
        >
          <img
            src={g.src}
            alt={g.label}
            loading="lazy"
            decoding="async"
            className="aspect-[1700/1063] w-full object-cover object-top opacity-90 transition-opacity duration-500 md:opacity-70 md:group-hover:opacity-100"
          />
          <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/60 to-transparent px-4 pb-3 pt-10 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
            {g.label}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <div className="mt-20 sm:mt-32">
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>The build</Eyebrow>
          <h3 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.02em] text-white sm:text-[34px]">
            Every screen, shipped.
          </h3>
        </div>
        <p className="hidden max-w-xs text-[13px] leading-[21px] text-white/30 sm:block">
          Nine desktop surfaces and a full mobile client, all on the same
          design system.
        </p>
      </div>

      <div className="wa-marquee relative mt-10 overflow-hidden">
        <div className="wa-marquee-track flex w-max">
          {track("a")}
          {track("b")}
        </div>
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-black to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-black to-transparent sm:w-28" />
      </div>
    </div>
  );
};

/* ──────────────────────────── section ──────────────────────────── */

const FeaturedProject = () => {
  const wide = useIsWide();

  return (
  <section className="relative isolate overflow-hidden">
    <span className="hash-span" id="featured">
      &nbsp;
    </span>

    {/* ambient: emerald grid + wash, masked so it never touches the neighbours */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      style={{
        backgroundImage: `linear-gradient(${WA}0d 1px, transparent 1px), linear-gradient(90deg, ${WA}0d 1px, transparent 1px)`,
        backgroundSize: "72px 72px",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 45% at 50% 18%, #000 0%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 70% 45% at 50% 18%, #000 0%, transparent 100%)",
      }}
    />
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[1100px] -translate-x-1/2 blur-[120px]"
      style={{ background: `radial-gradient(ellipse at center, ${WA}22, transparent 65%)` }}
    />

    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-16 sm:py-28">
      {/* ── header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: `${WA}40`, background: `${WA}12` }}
          >
            <span className="live-dot h-1.5 w-1.5 rounded-full" style={{ background: WA }} />
            <span
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: WA }}
            >
              Flagship build
            </span>
          </span>
          <Eyebrow>Full-stack · SaaS platform</Eyebrow>
        </div>

        <h2 className="mt-7 text-[44px] font-black leading-[1.02] tracking-[-0.035em] text-white xs:text-[54px] sm:text-[74px] lg:text-[88px]">
          WhatsApp CRM
          <span className="block" style={{ color: WA }}>
            Business Suite.
          </span>
        </h2>

        <p className="mt-7 max-w-2xl text-[15px] font-light leading-[28px] text-white/45 sm:text-[16.5px] sm:leading-[30px]">
          A production WhatsApp business platform: a shared real-time inbox, an
          AI agent that qualifies and answers on its own, a full CRM pipeline and
          campaign analytics — running as one system instead of five
          disconnected tools.
        </p>

        {/* the full stack runs to three rows on a phone, which eats the fold —
            below sm the tail collapses into a count */}
        <div className="mt-7 flex flex-wrap gap-2 sm:mt-8">
          {STACK.map((t, i) => (
            <span
              key={t}
              className={`rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11.5px] font-medium text-white/50 ${
                i >= STACK_FOLD ? "hidden sm:inline-block" : ""
              }`}
            >
              {t}
            </span>
          ))}
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11.5px] font-medium text-white/30 sm:hidden">
            +{STACK.length - STACK_FOLD}
          </span>
        </div>

        {(LINKS.live || LINKS.code) && (
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {LINKS.live && (
              <a
                href={LINKS.live}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[13.5px] font-bold text-black transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: WA, boxShadow: `0 16px 40px -14px ${WA}` }}
              >
                Open the platform
                <HiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {LINKS.code && (
              <a
                href={LINKS.code}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-6 py-3.5 text-[13.5px] font-medium text-white/60 transition-colors duration-200 hover:border-white/30 hover:text-white"
              >
                <FaGithub className="h-4 w-4" />
                Source
              </a>
            )}
          </div>
        )}
      </motion.div>

      {/* ── hero ── */}
      {wide ? <Stage /> : <MobileHero />}

      {/* ── metrics ── */}
      <div className="mt-16 grid grid-cols-2 gap-3 sm:mt-20 sm:gap-4 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <Metric key={m.label} {...m} delay={i * 110} />
        ))}
      </div>

      {/* ── capability explorer ── */}
      <Explorer />

      {/* ── "everywhere" poster ──
           showcase-multidevice is a finished composition and carries its own
           headline, so on wide screens it runs full-width with no competing
           heading of ours. A phone can't read that headline at 342px, so below
           md it is set as real text and the render becomes a swipeable strip. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative mt-20 sm:mt-32"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 blur-[90px]"
          style={{ background: `radial-gradient(ellipse at center, ${WA}1f, transparent 70%)` }}
        />

        <div className="md:hidden">
          <Eyebrow>Everywhere</Eyebrow>
          <h3 className="mt-3 text-[28px] font-black leading-tight tracking-[-0.02em] text-white">
            One platform.
            <span className="block text-white/30">Every screen.</span>
          </h3>
        </div>

        {/* Phone: the full width of the composition, with only its top band
            cropped away — that band is the render's own headline, which is the
            one already set as text above and is illegible at this size.
            `object-bottom` on a wider-than-source box trims from the top. */}
        <div className="relative mt-7 aspect-[2000/821] overflow-hidden rounded-2xl border border-white/[0.07] md:hidden">
          <img
            src={multidevice}
            alt="WhatsApp CRM running on a laptop, tablet and phone"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-bottom"
          />
        </div>

        <img
          src={multidevice}
          alt="WhatsApp CRM running on a laptop, tablet and phone — one platform, every screen"
          loading="lazy"
          decoding="async"
          className="hidden w-full rounded-[24px] border border-white/[0.07] md:block"
        />

        {/* the mobile client, as a caption to the poster rather than a new beat.
            Hidden on phones — the chat screen is already the hero up top. */}
        <div className="mt-9 hidden flex-col items-center gap-9 md:flex sm:mt-14 sm:flex-row sm:items-center sm:justify-center sm:gap-14">
          <div className="flex shrink-0 gap-5 sm:gap-6">
            {PHONES.map((ph, i) => (
              <motion.span
                key={ph.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="block w-[132px] sm:w-[156px]"
              >
                {/* device bezel — these screens are dark and need an edge */}
                <span
                  className="block rounded-[24px] border border-white/[0.14] bg-[#141414] p-[5px] sm:rounded-[28px]"
                  style={{ boxShadow: `0 26px 64px -26px ${WA}47, 0 18px 40px -22px #000` }}
                >
                  <span className="block overflow-hidden rounded-[20px] bg-black sm:rounded-[24px]">
                    <img
                      src={ph.src}
                      alt={`WhatsApp CRM mobile — ${ph.label}`}
                      loading="lazy"
                      decoding="async"
                      className="block w-full"
                    />
                  </span>
                </span>
                <span className="mt-3 block text-center font-mono text-[9px] uppercase tracking-[0.16em] text-white/25">
                  {ph.label}
                </span>
              </motion.span>
            ))}
          </div>

          <p className="max-w-sm text-center text-[14px] leading-[25px] text-white/40 sm:text-left">
            The mobile client is the same application, not a cut-down companion —
            one real-time store over WebSockets, so an agent starts a reply at
            their desk and finishes it on the road.
          </p>
        </div>
      </motion.div>

      {/* ── surface marquee ── */}
      <Marquee />

      {/* ── closing note ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative mt-20 overflow-hidden rounded-[24px] border border-white/[0.08] px-6 py-10 sm:mt-32 sm:px-14 sm:py-16"
        style={{
          background: `linear-gradient(135deg, ${WA}14 0%, transparent 55%), #050505`,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${WA}88, transparent)` }}
        />

        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <Eyebrow>Why it matters</Eyebrow>
            <h3 className="mt-4 text-[26px] font-black leading-[1.15] tracking-[-0.02em] text-white sm:text-balance sm:text-[32px]">
              Most teams run WhatsApp from one phone.
              <span className="block text-white/35">This replaces it.</span>
            </h3>
            <p className="mt-5 text-[14px] leading-[25px] text-white/40">
              Shared inbox, AI qualification, CRM, pipeline, broadcasts and
              analytics in a single multi-tenant platform — designed so a
              five-person sales team can handle the volume of twenty.
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-7 sm:grid-cols-4 lg:grid-cols-2">
            {[
              ["Multi-tenant", "workspace isolation"],
              ["Real-time", "websocket store"],
              ["AI-native", "not a bolt-on"],
              ["Audited", "every AI action logged"],
            ].map(([t, s]) => (
              <div key={t}>
                <p className="text-[14.5px] font-bold text-white">{t}</p>
                <p className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-white/25">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export default FeaturedProject;
