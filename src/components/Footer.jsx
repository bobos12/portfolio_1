import { motion } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const NAV = [
  { label: "About",      href: "#about"      },
  { label: "Experience", href: "#work"        },
  { label: "Tech",       href: "#tech"        },
  { label: "Projects",   href: "#projects"    },
  { label: "Contact",    href: "#contact"     },
];

const SOCIAL = [
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/ahmed-sharaf-505b3a291/", icon: FaLinkedin,  color: "#0A66C2" },
  { name: "GitHub",    href: "https://github.com/SHARAF-32",                         icon: FaGithub,    color: "#ffffff"  },
  { name: "WhatsApp",  href: "https://wa.me/+201115655645",                          icon: FaWhatsapp,  color: "#25D366"  },
  { name: "Instagram", href: "https://instagram.com/sharaf__999__",                  icon: FaInstagram, color: "#E1306C"  },
  { name: "Gmail",     href: "mailto:aahmedsharaff@gmail.com",                       icon: SiGmail,     color: "#EA4335"  },
];

const Footer = () => (
  <footer className="relative border-t border-white/[0.06] mt-0">
    <div className="max-w-7xl mx-auto px-6 sm:px-16 py-10 sm:py-14 flex flex-col items-center gap-8">

      {/* Name */}
      <motion.p
        className="text-white/90 text-[18px] sm:text-[22px] font-bold tracking-tight"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Ahmed Sharaf
      </motion.p>

      {/* Nav links */}
      <motion.nav
        className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {NAV.map((n) => (
          <a
            key={n.label}
            href={n.href}
            className="text-white/35 hover:text-white text-[12px] uppercase tracking-[0.12em] transition-colors duration-200"
          >
            {n.label}
          </a>
        ))}
      </motion.nav>

      {/* Social icons */}
      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {SOCIAL.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              title={s.name}
              className="text-white/30"
              whileHover={{ color: s.color, y: -4, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ color: "rgba(255,255,255,0.30)" }}
            >
              <Icon className="w-[20px] h-[20px]" />
              <span className="sr-only">{s.name}</span>
            </motion.a>
          );
        })}
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.05]" />

      {/* Copyright */}
      <p className="text-white/20 text-[11px] tracking-wide text-center">
        © {new Date().getFullYear()} Ahmed Sharaf. All rights reserved.
      </p>

    </div>
  </footer>
);

export default Footer;
