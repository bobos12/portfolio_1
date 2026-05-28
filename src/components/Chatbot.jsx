import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { HiXMark, HiPaperAirplane } from "react-icons/hi2";
import botVideo from "../assets/bot.mp4";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const SYSTEM_PROMPT = `You are Ahmed Sharaf's personal AI assistant on his 3D portfolio website. Your job is to help visitors learn about Ahmed, his skills, projects, and how to hire him. Be friendly, engaging, and concise (2-4 sentences per response max unless more detail is needed). Use a professional but personable tone.

PERSONAL INFO:
- Full Name: Ahmed Sharaf
- Roles: Full Stack Developer, React Engineer, Node.js Developer, UI Craftsman
- Experience: 3+ years, 20+ projects, 10+ clients
- Status: Open to work — available for hire (freelance or full-time)
- Location: Egypt (available for remote work globally)

SKILLS & TECH STACK:
- Frontend: HTML5, CSS3, JavaScript (ES6+), TypeScript, React.js, Redux Toolkit, Tailwind CSS, Framer Motion, Three.js
- Backend: Node.js, Express.js, MongoDB, JWT Authentication, RESTful APIs
- Tools & Other: Git, GitHub, Figma, Docker, Vite, EmailJS, SCSS

PROJECTS (with GitHub links):
1. Movies Flex — React movie discovery app using TMDB API with real-time search/filter. GitHub: https://github.com/bobos12/MOVIES-FLEX
2. 3D Portfolio — This website! React, Three.js, Tailwind CSS, Framer Motion. GitHub: https://github.com/bobos12/portfolio_1
3. LamaBooking — Full-stack MERN hotel booking system with admin panel, real-time availability, JWT auth. GitHub: https://github.com/bobos12/booooooooking
4. Startify — Modern hotel booking UI with dynamic search and clean component architecture. GitHub: https://github.com/bobos12/STARTIFY
5. GPT-4 Landing Page — High-conversion responsive landing page with smooth animations. GitHub: https://github.com/bobos12/gpt_3
6. Eye Clinic Management System — Full-stack MERN clinic app with patient records, prescriptions, role-based access. GitHub: https://github.com/bobos12/CLINIC-MANGMENT
7. ELITE GPT — AI-powered legal assistant built with React, MongoDB, Hugging Face API. GitHub: https://github.com/bobos12/ELITE-GPT

EXPERIENCE TIMELINE:
- Jun 2022 – Dec 2022: Junior Web Developer — HTML, CSS, JS, Git, semantic code, cross-device compatibility
- Jan 2023 – Jul 2023: React Developer — SPAs, hooks, React Router, Context API, hotel booking app
- Aug 2023 – Feb 2024: UI/UX & Web App Developer — Figma to React, SaaS startup, animations, mobile responsiveness
- Mar 2024 – Present: Full Stack Developer (MERN) — REST APIs, JWT auth, component-based architecture, MongoDB

CONTACT & SOCIAL LINKS:
- Email: aahmedsharaff@gmail.com
- LinkedIn: https://www.linkedin.com/in/ahmed-sharaf-505b3a291/
- GitHub: https://github.com/bobos12
- WhatsApp: https://wa.me/+201115655645
- Instagram: https://instagram.com/sharaf__999__
- CV/Resume: /Ahmed-Sharaf-CV.pdf (downloadable)

HIRING INFO:
Ahmed is actively seeking new opportunities — freelance projects, remote full-time roles, or collaborations. He brings strong MERN stack expertise, clean UI/UX sensibility, and a track record of shipping real-world products. Ideal for startups and product teams who value quality code and beautiful interfaces.

When someone asks about hiring or working with Ahmed, always provide his contact details (email, LinkedIn, WhatsApp). When asked about projects, mention GitHub links. If you don't know something, suggest reaching out directly via email.`;

const QUICK_REPLIES = [
  { label: "About Ahmed", msg: "Tell me about Ahmed Sharaf" },
  { label: "Skills", msg: "What are Ahmed's technical skills and stack?" },
  { label: "Projects", msg: "What are Ahmed's best projects?" },
  { label: "Hire Ahmed", msg: "How can I hire Ahmed?" },
  { label: "Contact", msg: "How can I contact Ahmed?" },
  { label: "Experience", msg: "What is Ahmed's work experience?" },
];

const SOCIAL = [
  { name: "LinkedIn",  url: "https://www.linkedin.com/in/ahmed-sharaf-505b3a291/", Icon: FaLinkedin,  color: "#0A66C2" },
  { name: "GitHub",    url: "https://github.com/bobos12",                          Icon: FaGithub,    color: "#ffffff"  },
  { name: "WhatsApp",  url: "https://wa.me/+201115655645",                         Icon: FaWhatsapp,  color: "#25D366"  },
  { name: "Instagram", url: "https://instagram.com/sharaf__999__",                 Icon: FaInstagram, color: "#E1306C"  },
  { name: "Gmail",     url: "mailto:aahmedsharaff@gmail.com",                      Icon: SiGmail,     color: "#EA4335"  },
];

const TypingDots = () => (
  <div className="flex items-center gap-1.5 px-4 py-3">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-[7px] h-[7px] rounded-full bg-white/35 block"
        animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const BOTTOM = 24;
const RIGHT  = 24;

const Chatbot = ({ introDone = false }) => {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [unread, setUnread]     = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);
  const [messages, setMessages] = useState([
    {
      id: 0,
      role: "assistant",
      content: "Hi there! 👋 I'm Ahmed's AI assistant. I can tell you about his skills, projects, experience, and how to work with him. What would you like to know?",
    },
  ]);

  const bottomRef  = useRef(null);
  const inputRef   = useRef(null);
  const hasUserMsg = messages.some((m) => m.role === "user");
  const btnSize    = isMobile ? 52 : 68;

  // Responsive sizing
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Show hint once: 5s after intro screen finishes
  useEffect(() => {
    if (!introDone || open) return;
    const t1 = setTimeout(() => setShowHint(true), 5000);
    const t2 = setTimeout(() => setShowHint(false), 11500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [introDone]); // eslint-disable-line react-hooks/exhaustive-deps

  // Hide hint immediately if user opens chat
  useEffect(() => {
    if (open) setShowHint(false);
  }, [open]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  const send = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg = { id: Date.now(), role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
          max_tokens: 350,
          temperature: 0.72,
        }),
      });

      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: data.choices[0].message.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Sorry, I'm having a connection issue. Please reach out to Ahmed directly at aahmedsharaff@gmail.com!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const windowBottom = BOTTOM + btnSize + 12;

  /* ─────────────────────────────────────────────────────────────── */
  return createPortal(
    <>
      {/* ── Chat window ──────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            style={{
              position: "fixed",
              bottom: windowBottom,
              right: RIGHT,
              zIndex: 9999,
              width: `min(390px, calc(100vw - 2.5rem))`,
              maxHeight: "min(560px, calc(100dvh - 8rem))",
              background: "rgba(5,5,5,0.94)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid rgba(255,255,255,0.09)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)",
              borderRadius: "16px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
          >
            {/* Header */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
              className="flex items-center justify-between px-5 py-3.5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-white/[0.12]">
                    <img src="/me.png" alt="Ahmed" className="w-full h-full object-cover object-top" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-[2px] border-[#050505]"
                    style={{ boxShadow: "0 0 7px rgba(52,211,153,0.85)" }} />
                </div>
                <div>
                  <p className="text-white text-[13px] font-semibold leading-tight">Ahmed Sharaf</p>
                  <p className="text-[11px] mt-0.5 text-emerald-400/75">● Online · Full Stack Dev</p>
                </div>
              </div>
              <motion.button onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white/30 hover:text-white/80 hover:bg-white/[0.07] transition-colors"
                whileTap={{ scale: 0.88 }}>
                <HiXMark className="w-[18px] h-[18px]" />
              </motion.button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
              {messages.map((msg) => (
                <motion.div key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}>
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed ${
                      msg.role === "user" ? "text-white rounded-br-md" : "text-white/82 rounded-bl-md"
                    }`}
                    style={msg.role === "user"
                      ? { background: "rgba(255,255,255,0.11)", border: "1px solid rgba(255,255,255,0.14)" }
                      : { background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.075)" }
                    }>
                    {msg.content}
                    {msg.role === "assistant" && msg.id === 0 && (
                      <div className="flex items-center gap-3.5 mt-3 pt-2.5"
                        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                        {SOCIAL.map(({ name, url, Icon, color }) => (
                          <motion.a key={name} href={url} target="_blank" rel="noopener noreferrer"
                            title={name} className="text-white/25"
                            whileHover={{ color, y: -2, scale: 1.25 }} whileTap={{ scale: 0.85 }}>
                            <Icon className="w-[15px] h-[15px]" />
                          </motion.a>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div className="flex justify-start"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="rounded-2xl rounded-bl-md"
                    style={{ background: "rgba(255,255,255,0.045)", border: "1px solid rgba(255,255,255,0.075)" }}>
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <AnimatePresence>
              {!hasUserMsg && (
                <motion.div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}>
                  {QUICK_REPLIES.map((r) => (
                    <motion.button key={r.label} onClick={() => send(r.msg)} disabled={loading}
                      className="text-[11px] text-white/50 px-3 py-1.5 rounded-full border border-white/[0.09] hover:border-white/20 hover:text-white/85 transition-all disabled:opacity-40"
                      style={{ background: "rgba(255,255,255,0.035)" }}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
                      {r.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* CV shortcut */}
            <div className="px-4 pb-2 shrink-0">
              <motion.a href="/Ahmed-Sharaf-CV.pdf" download="Ahmed-Sharaf-CV.pdf"
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-[11.5px] text-white/38 border border-white/[0.07] hover:text-white/70 hover:border-white/15 transition-all"
                style={{ background: "rgba(255,255,255,0.025)" }}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <span>↓</span> Download Ahmed's CV
              </motion.a>
            </div>

            {/* Input */}
            <div className="px-4 pb-4 pt-2 flex items-center gap-2 shrink-0"
              style={{ borderTop: "1px solid rgba(255,255,255,0.065)" }}>
              <input ref={inputRef} value={input}
                onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
                placeholder="Ask me anything..." disabled={loading}
                className="flex-1 bg-white/[0.055] border border-white/[0.09] rounded-xl px-4 py-2.5 text-[13px] text-white placeholder:text-white/22 outline-none focus:border-white/20 transition-colors disabled:opacity-50"
              />
              <motion.button onClick={() => send(input)} disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/[0.12] text-white/50 hover:text-white hover:bg-white/[0.1] hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                style={{ background: "rgba(255,255,255,0.07)" }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.9 }}>
                <HiPaperAirplane className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hint speech bubble ───────────────────────────────── */}
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            style={{
              position: "fixed",
              bottom: windowBottom,
              right: RIGHT,
              zIndex: 9999,
            }}
            initial={{ opacity: 0, y: 10, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div style={{
              position: "relative",
              background: "rgba(8,8,8,0.96)",
              border: "1px solid rgba(255,255,255,0.11)",
              borderRadius: "14px",
              padding: "12px 16px 12px 14px",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
              minWidth: "200px",
            }}>
              {/* Bot avatar + text row */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: 34, height: 34, borderRadius: "50%",
                  overflow: "hidden", border: "1px solid rgba(255,255,255,0.12)",
                  flexShrink: 0,
                }}>
                  <video src={botVideo} autoPlay loop muted playsInline
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.92)", fontSize: "12.5px", fontWeight: 600, lineHeight: 1.3 }}>
                    Hey! 👋 Ask me anything
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px", marginTop: "2px" }}>
                    about Ahmed — I'm his AI
                  </p>
                </div>
              </div>

              {/* Online status */}
              <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "8px" }}>
                <motion.span
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", flexShrink: 0 }}
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
                <span style={{ color: "rgba(52,211,153,0.7)", fontSize: "10px" }}>Online now · Replies instantly</span>
              </div>

              {/* Downward arrow pointing at button */}
              <div style={{
                position: "absolute",
                bottom: -7,
                right: 22,
                width: 12,
                height: 12,
                background: "rgba(8,8,8,0.96)",
                border: "1px solid rgba(255,255,255,0.11)",
                borderTop: "none",
                borderLeft: "none",
                transform: "rotate(45deg)",
              }} />

              {/* Dismiss button */}
              <button
                onClick={(e) => { e.stopPropagation(); setShowHint(false); }}
                style={{
                  position: "absolute", top: -9, right: -9,
                  width: 20, height: 20, borderRadius: "50%",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "13px", cursor: "pointer", lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bubble wrapper (owns fixed position) ─────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: BOTTOM,
          right: RIGHT,
          width: btnSize,
          height: btnSize,
          zIndex: 9999,
        }}
      >
        {/* Pulse rings — outside overflow:hidden */}
        {!open && (
          <>
            <motion.span
              style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: "1.5px solid rgba(255,255,255,0.28)",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 1.7], opacity: [0.55, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.span
              style={{
                position: "absolute", inset: 0,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.16)",
                pointerEvents: "none",
              }}
              animate={{ scale: [1, 2.2], opacity: [0.38, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
            />
          </>
        )}

        {/* Button */}
        <motion.button
          onClick={() => { setOpen((v) => !v); setUnread(false); setShowHint(false); }}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.65), 0 0 20px rgba(255,255,255,0.04)",
            cursor: "pointer",
            background: "transparent",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Bot video */}
          <video src={botVideo} autoPlay loop muted playsInline
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
            }}
          />

          {/* X overlay when open */}
          <AnimatePresence>
            {open && (
              <motion.div
                style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "rgba(0,0,0,0.58)",
                  backdropFilter: "blur(3px)",
                }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.17 }}
              >
                <HiXMark style={{ width: 22, height: 22, color: "white" }} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Unread badge */}
        <AnimatePresence>
          {unread && !open && (
            <motion.span
              style={{
                position: "absolute", top: -4, right: -4, zIndex: 10,
                width: 18, height: 18, borderRadius: "50%",
                background: "#34d399", border: "2px solid #050505",
                fontSize: "9px", fontWeight: "bold", color: "black",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              1
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>,
    document.body
  );
};

export default Chatbot;
