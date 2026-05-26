import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-[#0d0d0d] border border-white/[0.07] p-8 rounded-2xl xs:w-[320px] w-full shadow-[0_8px_32px_rgba(0,0,0,0.7)] hover:border-white/[0.14] transition-colors duration-300'
  >
    <p className='text-white/20 font-black text-[52px] leading-none select-none'>"</p>

    <div className='mt-2'>
      <p className='text-white/80 tracking-wide text-[15px] leading-relaxed font-light'>
        {testimonial}
      </p>

      <div className='mt-6 flex justify-between items-center gap-2'>
        <div className='flex flex-col gap-0.5'>
          <p className='text-white font-semibold text-[14px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='text-secondary text-[12px]'>
            {designation} · {company}
          </p>
        </div>

        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover border border-white/10'
        />
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className='mt-12 bg-black rounded-2xl border border-white/[0.05]'>
      <div className={`bg-[#0d0d0d] rounded-2xl ${styles.padding} min-h-[260px] border border-white/[0.07]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>What others say</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-6`}>
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
