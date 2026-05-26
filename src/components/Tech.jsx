import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import techVideo from "../assets/TechStack.mp4";

const ALL_TECH = [
  { name: "Python",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",                                       color: "#3776AB" },
  { name: "JavaScript",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",                               color: "#F7DF1E" },
  { name: "TypeScript",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",                               color: "#3178C6" },
  { name: "C",             url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",                                                 color: "#A8B9CC" },
  { name: "C++",           url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",                                 color: "#00599C" },
  { name: "HTML",          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",                                         color: "#E34F26" },
  { name: "CSS",           url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",                                           color: "#1572B6" },
  { name: "Bash",          url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg",                                           color: "#4EAA25" },
  { name: "React",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",                                         color: "#61DAFB" },
  { name: "Next.js",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",                                       color: "#ffffff" },
  { name: "Bootstrap",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",                                 color: "#7952B3" },
  { name: "Node.js",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",                                       color: "#339933" },
  { name: "Django",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",                                          color: "#44B78B" },
  { name: "Flask",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",                                         color: "#ffffff" },
  { name: "FastAPI",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",                                     color: "#009688" },
  { name: "TensorFlow",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",                               color: "#FF6F00" },
  { name: "PyTorch",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",                                     color: "#EE4C2C" },
  { name: "Scikit-learn",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg",                             color: "#F7931E" },
  { name: "OpenCV",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",                                       color: "#5C3EE8" },
  { name: "NumPy",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",                                         color: "#4DABCF" },
  { name: "Tailwind",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",                             color: "#06B6D4" },
  { name: "Pandas",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",                                       color: "#E70488" },
  { name: "MySQL",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",                                         color: "#4479A1" },
  { name: "PostgreSQL",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",                               color: "#4169E1" },
  { name: "MongoDB",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",                                     color: "#47A248" },
  { name: "Firebase",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",                                      color: "#FFCA28" },
  { name: "Redis",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",                                         color: "#DC382D" },
  { name: "Docker",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",                                       color: "#2496ED" },
  { name: "Azure",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",                                         color: "#0089D6" },
  { name: "Git",           url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                                             color: "#F05032" },
  { name: "GitHub",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",                                       color: "#ffffff" },
  { name: "Linux",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",                                         color: "#FCC624" },
  { name: "AWS",           url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",         color: "#FF9900" },
  { name: "VS Code",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",                                       color: "#007ACC" },
  { name: "Vercel",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg",                                       color: "#ffffff" },
  { name: "Jupyter",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",                                     color: "#F37626" },
  { name: "Figma",         url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",                                         color: "#F24E1E" },
  { name: "Postman",       url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",                                     color: "#FF6C37" },
  { name: "Photoshop",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg",                                 color: "#31A8FF" },
  { name: "Hugging F...",  url: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",                                                   color: "#FFD21E" },
  { name: "MS Office",     url: "https://img.icons8.com/color/48/microsoft-office-2019.png",                                                           color: "#D83B01" },
];

const TechIcon = ({ name, url, color, index, size = 72 }) => {
  const [hovered, setHovered] = useState(false);
  const pad = Math.round(size * 0.22);

  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      style={{ width: size }}
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.018, type: "spring", stiffness: 140 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="rounded-[18px] flex items-center justify-center"
        style={{
          width: size, height: size,
          padding: pad,
          border: "1px solid rgba(255,255,255,0.13)",
        }}
        animate={{
          y: hovered ? -5 : 0,
          scale: hovered ? 1.1 : 1,
          background: hovered ? `${color}18` : "rgba(255,255,255,0.07)",
          boxShadow: hovered
            ? `0 0 22px ${color}50, inset 0 1px 0 rgba(255,255,255,0.15)`
            : "inset 0 1px 0 rgba(255,255,255,0.08)",
          borderColor: hovered ? `${color}70` : "rgba(255,255,255,0.13)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <img src={url} alt={name} className="w-full h-full object-contain select-none" draggable={false} />
      </motion.div>

      <motion.span
        className="text-[10px] font-medium text-center leading-tight truncate"
        style={{ width: size }}
        animate={{ color: hovered ? color : "rgba(255,255,255,0.4)" }}
        transition={{ duration: 0.18 }}
      >
        {name}
      </motion.span>
    </motion.div>
  );
};

const DESKTOP_ROWS = [8, 8, 7, 6, 5, 4, 3];             // 41 total
const MOBILE_ROWS  = [7, 6, 5, 5, 5, 4, 5, 5, 3, 3]; // 41 total — 5→4→3 pyramid

const Tech = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const pyramidRows = useMemo(() => {
    const sizes = isMobile ? MOBILE_ROWS : DESKTOP_ROWS;
    let offset = 0;
    return sizes.map(n => {
      const row = ALL_TECH.slice(offset, offset + n);
      offset += n;
      return row;
    });
  }, [isMobile]);

  const iconSize = isMobile ? 50 : 72;

  return (
    <div
      className="relative overflow-hidden"
      style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
    >
      {/* Video — no filter, original colours */}
      <video
        src={techVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: "brightness(0.5)",
          opacity: 0.6,
          WebkitMaskImage: [
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            "linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          WebkitMaskComposite: "destination-in",
          maskImage: [
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
            "linear-gradient(to right,  transparent 0%, black 12%, black 88%, transparent 100%)",
          ].join(", "),
          maskComposite: "intersect",
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-16 md:px-24 lg:px-40 xl:px-56 py-16 sm:py-20">

        <motion.h2
          className="text-center text-white text-[30px] sm:text-[40px] font-bold uppercase tracking-[0.22em] mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          Tech Stack
        </motion.h2>

        {/* Pyramid — each row is shorter than the one above, all centered */}
        <div className={`flex flex-col items-center ${isMobile ? "gap-2" : "gap-3 sm:gap-4"}`}>
          {pyramidRows.map((row, ri) => (
            <div key={ri} className={`flex justify-center ${isMobile ? "gap-2" : "gap-3 sm:gap-4"}`}>
              {row.map((tech, ti) => (
                <TechIcon key={tech.name} {...tech} index={ri * 10 + ti} size={iconSize} />
              ))}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
