import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, tags, image, source_code_link }) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.4, 0.75)}>
      <Tilt
        options={{ max: 20, scale: 1, speed: 400 }}
        className='bg-[#0d0d0d] border border-white/[0.07] p-5 rounded-2xl sm:w-[340px] w-full shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:shadow-[0_8px_40px_rgba(255,255,255,0.04)] hover:border-white/[0.14] transition-all duration-300'
      >
        <div className='relative w-full h-[210px] rounded-xl overflow-hidden'>
          <img
            src={image}
            alt={name}
            className='w-full h-full object-cover'
          />
          {/* Dark overlay on hover */}
          <div className='absolute inset-0 bg-gradient-to-t from-[#090d1f]/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
            <span className='text-white/70 text-xs'>View project</span>
          </div>

          {/* GitHub button */}
          <div className='absolute top-3 right-3'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='w-9 h-9 rounded-full bg-black/70 backdrop-blur-sm border border-white/10 flex justify-center items-center cursor-pointer hover:bg-white/10 hover:border-white/30 transition-all duration-200'
            >
              <img src={github} alt='github' className='w-4 h-4 object-contain' />
            </div>
          </div>
        </div>

        <div className='mt-4'>
          <h3 className='text-white font-semibold text-[18px] tracking-tight'>{name}</h3>
          <p className='mt-2 text-secondary text-[13px] leading-[22px] line-clamp-3'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[12px] font-medium ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-4 text-secondary text-[16px] max-w-3xl leading-[30px] font-light'
        >
          Each project below reflects real-world problem solving, clean architecture,
          and attention to detail — from full-stack apps to 3D web experiences.
        </motion.p>
      </div>

      <div className='mt-16 flex flex-wrap gap-6 justify-start'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
