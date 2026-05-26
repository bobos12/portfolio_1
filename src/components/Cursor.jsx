import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

const TRAIL = 7;

const Cursor = () => {
  const [hovered,  setHovered]  = useState(false);
  const [clicked,  setClicked]  = useState(false);
  const [visible,  setVisible]  = useState(false);
  const [isTouch,  setIsTouch]  = useState(false);
  const [trail,    setTrail]    = useState([]);
  const trailRef = useRef([]);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // dot — instant
  const dx = useSpring(mx, { stiffness: 3000, damping: 80 });
  const dy = useSpring(my, { stiffness: 3000, damping: 80 });

  // ring — lags with spring
  const rx = useSpring(mx, { stiffness: 110, damping: 16 });
  const ry = useSpring(my, { stiffness: 110, damping: 16 });

  // outer orbit — slower lag
  const ox = useSpring(mx, { stiffness: 55, damping: 12 });
  const oy = useSpring(my, { stiffness: 55, damping: 12 });

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setIsTouch(true); return; }

    document.body.style.cursor = "none";

    const move = (e) => {
      const { clientX: x, clientY: y } = e;
      mx.set(x); my.set(y);
      setVisible(true);

      const now = Date.now();
      trailRef.current = [...trailRef.current, { x, y, t: now }]
        .filter(p => now - p.t < 220)
        .slice(-TRAIL);
      setTrail([...trailRef.current]);
    };

    const leave  = () => setVisible(false);
    const enter  = () => setVisible(true);
    const down   = () => setClicked(true);
    const up     = () => setClicked(false);

    const bindHover = () => {
      document.querySelectorAll("a, button, [role=button], input, textarea, label, select").forEach(el => {
        el.addEventListener("mouseenter", () => setHovered(true));
        el.addEventListener("mouseleave", () => setHovered(false));
      });
    };

    document.addEventListener("mousemove",  move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    document.addEventListener("mousedown",  down);
    document.addEventListener("mouseup",    up);

    bindHover();
    const obs = new MutationObserver(bindHover);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.style.cursor = "";
      document.removeEventListener("mousemove",  move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      document.removeEventListener("mousedown",  down);
      document.removeEventListener("mouseup",    up);
      obs.disconnect();
    };
  }, []);

  if (isTouch) return null;

  const now = Date.now();

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">

      {/* ── Stardust trail ─────────────────────────────────────── */}
      {trail.map((p, i) => {
        const age  = (now - p.t) / 220;          // 0 (fresh) → 1 (old)
        const size = 3 - age * 2.2;
        const op   = (1 - age) * 0.55;
        return (
          <span
            key={p.t + i}
            style={{
              position: "fixed",
              left: p.x,
              top:  p.y,
              width:  Math.max(size, 0.5),
              height: Math.max(size, 0.5),
              transform: "translate(-50%,-50%)",
              borderRadius: "50%",
              background: `rgba(160, 210, 255, ${op})`,
              boxShadow: `0 0 ${4 - age * 3}px rgba(120,180,255,${op * 0.8})`,
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* ── Slow outer orbit ring ─────────────────────────────── */}
      <motion.div
        style={{
          x: ox, y: oy,
          translateX: "-50%", translateY: "-50%",
          position: "fixed",
          top: 0, left: 0,
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          style={{
            width:  hovered ? 68 : 56,
            height: hovered ? 68 : 56,
            borderRadius: "50%",
            border: "1px dashed rgba(120,180,255,0.18)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* ── Inner glowing ring ────────────────────────────────── */}
      <motion.div
        style={{
          x: rx, y: ry,
          translateX: "-50%", translateY: "-50%",
          position: "fixed",
          top: 0, left: 0,
        }}
        animate={{
          opacity: visible ? 1 : 0,
          width:   hovered ? 48 : clicked ? 24 : 34,
          height:  hovered ? 48 : clicked ? 24 : 34,
          borderColor: hovered
            ? "rgba(180,225,255,0.9)"
            : "rgba(140,195,255,0.5)",
          boxShadow: hovered
            ? "0 0 18px rgba(100,180,255,0.45), inset 0 0 10px rgba(100,180,255,0.15)"
            : clicked
            ? "0 0 24px rgba(120,190,255,0.6)"
            : "0 0 10px rgba(100,170,255,0.22), inset 0 0 6px rgba(100,170,255,0.08)",
          backgroundColor: hovered ? "rgba(100,180,255,0.06)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="rounded-full border"
      >
        {/* crosshair lines on hover */}
        {hovered && (
          <>
            <motion.span
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute top-1/2 left-0 right-0 h-px origin-center"
              style={{ background: "rgba(180,225,255,0.55)", transform: "translateY(-50%) scaleX(1)" }}
            />
            <motion.span
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
              transition={{ duration: 0.15 }}
              className="absolute left-1/2 top-0 bottom-0 w-px origin-center"
              style={{ background: "rgba(180,225,255,0.55)", transform: "translateX(-50%) scaleY(1)" }}
            />
          </>
        )}
      </motion.div>

      {/* ── Center dot / star ─────────────────────────────────── */}
      <motion.div
        style={{
          x: dx, y: dy,
          translateX: "-50%", translateY: "-50%",
          position: "fixed",
          top: 0, left: 0,
        }}
        animate={{
          opacity: visible && !hovered ? 1 : 0,
          width:   clicked ? 7 : 4,
          height:  clicked ? 7 : 4,
          boxShadow: clicked
            ? "0 0 14px rgba(255,255,255,0.9), 0 0 28px rgba(140,200,255,0.6)"
            : "0 0 8px rgba(220,240,255,0.85), 0 0 16px rgba(120,185,255,0.4)",
        }}
        transition={{ duration: 0.12 }}
        className="rounded-full bg-white"
      />
    </div>
  );
};

export default Cursor;
