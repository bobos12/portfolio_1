import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const WA_NUMBER = "201115655645";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const contact = form.phone ? `${form.email} | ${form.phone}` : form.email;
    const text = `Hi Ahmed! 👋\n\nI'm ${form.name} (${contact}).\n\n${form.message}`;
    const url  = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setShowSuccess(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setShowSuccess(false), 6000);
  };

  const inputBase =
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-white text-[14px] font-light placeholder:text-white/20 outline-none transition-all duration-200 focus:bg-white/[0.06]";

  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-8 xl:gap-12 overflow-hidden">

      {/* ── Form panel ─────────────────────────────────────────────────── */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="xl:flex-1 w-full"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            <span className="text-emerald-400 text-[11px] font-medium uppercase tracking-[0.16em]">
              Available for work
            </span>
          </div>
          <h2 className="text-white text-[36px] sm:text-[44px] font-bold leading-tight">
            Let's work<br />
            <span className="text-white/30">together.</span>
          </h2>
          <p className="mt-3 text-white/35 text-[13px] leading-relaxed max-w-sm">
            Have a project in mind or just want to say hi?
            Drop me a message — I reply within 24 hours.
          </p>
        </div>

        {/* Success banner */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 px-4 py-3.5 rounded-xl text-[13px]"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>WhatsApp opened — see you there!</span>
            <button onClick={() => setShowSuccess(false)} className="ml-auto text-emerald-400/50 hover:text-emerald-400">✕</button>
          </motion.div>
        )}

        {/* Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Name + Email row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="text-white/50 text-[11px] font-medium uppercase tracking-[0.14em]">Your Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ahmed Sharaf"
                className={`${inputBase} ${errors.name ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`}
              />
              {errors.name && <span className="text-red-400/80 text-[11px] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-white/50 text-[11px] font-medium uppercase tracking-[0.14em]">Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`${inputBase} ${errors.email ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`}
              />
              {errors.email && <span className="text-red-400/80 text-[11px] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{errors.email}</span>}
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <span className="text-white/50 text-[11px] font-medium uppercase tracking-[0.14em]">Phone <span className="normal-case text-white/25">(optional)</span></span>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
              className={`${inputBase} border-white/[0.08] focus:border-white/25`}
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <span className="text-white/50 text-[11px] font-medium uppercase tracking-[0.14em]">Message</span>
            <div className="relative">
              <textarea
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project or idea…"
                className={`${inputBase} resize-none ${errors.message ? "border-red-500/40 focus:border-red-500/60" : "border-white/[0.08] focus:border-white/25"}`}
              />
              <span className="absolute bottom-3 right-4 text-white/20 text-[10px] pointer-events-none">
                {form.message.length}/500
              </span>
            </div>
            {errors.message && <span className="text-red-400/80 text-[11px] flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400 inline-block" />{errors.message}</span>}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="group mt-2 w-full relative flex items-center justify-center gap-2.5 py-4 rounded-xl font-semibold text-[14px] tracking-widest uppercase overflow-hidden bg-[#25D366] text-white shadow-[0_0_0_0_rgba(37,211,102,0)] hover:shadow-[0_0_32px_rgba(37,211,102,0.35)] transition-all duration-300"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
            Send via WhatsApp
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </motion.button>
        </form>

        {/* Direct contact icons */}
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <p className="text-white/25 text-[11px] uppercase tracking-[0.14em] mb-5 text-center">
            Or reach me directly
          </p>
          <div className="flex justify-center gap-10">

            <motion.a
              href="https://wa.me/201115655645"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08, y: -4, filter: "drop-shadow(0 0 14px #25D36688)" }}
              whileTap={{ scale: 0.93 }}
              title="WhatsApp"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <svg className="w-14 h-14" fill="#25D366" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[#25D366] text-[12px] font-medium">WhatsApp</span>
                <span className="text-white/30 text-[11px]">+20 111 565 5645</span>
              </div>
            </motion.a>

            <motion.a
              href="mailto:aahmedsharaff@gmail.com"
              whileHover={{ scale: 1.08, y: -4, filter: "drop-shadow(0 0 14px #EA433588)" }}
              whileTap={{ scale: 0.93 }}
              title="Gmail"
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex flex-col items-center gap-2"
            >
              <svg className="w-14 h-14" viewBox="0 0 48 48">
                <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
                <path fill="#1e88e5" d="M3 16.2l3.614 3.48L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
                <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
                <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
              </svg>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[#EA4335] text-[12px] font-medium">Gmail</span>
                <span className="text-white/30 text-[11px]">aahmedsharaff@gmail.com</span>
              </div>
            </motion.a>

          </div>
        </div>
      </motion.div>

      {/* ── Earth panel ────────────────────────────────────────────────── */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 h-[460px] xs:h-[520px] sm:h-[580px] xl:h-auto xl:min-h-[650px]"
      >
        <EarthCanvas />
      </motion.div>

    </div>
  );
};

export default SectionWrapper(Contact, "contact");
