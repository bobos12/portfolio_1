import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { motion } from 'framer-motion'
import 'react-vertical-timeline-component/style.min.css'
import { styles } from '../styles'
import { experiences } from '../constants'
import { SectionWrapper } from '../hoc'
import { textVariant } from '../utils/motion'

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: '#0d0d0d',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
        borderRadius: '16px',
      }}
      contentArrowStyle={{ borderRight: '7px solid rgba(255,255,255,0.07)' }}
      date={experience.date}
      dateClassName="text-secondary text-[13px]"
      iconStyle={{
        background: experience.iconBg,
        boxShadow: '0 0 0 3px rgba(255,255,255,0.08), 0 0 20px rgba(0,0,0,0.5)',
      }}
      icon={
        <div className='flex justify-center items-center w-full h-full'>
          <img
            src={experience.icon}
            alt={experience.company_name}
            className='w-[60%] h-[60%] object-contain'
          />
        </div>
      }
    >
      <div>
        <h3 className='text-white text-[20px] font-semibold tracking-tight'>{experience.title}</h3>
        <p className='text-secondary text-[14px] font-medium mt-1' style={{ margin: 0, marginTop: '4px' }}>
          {experience.company_name}
        </p>
      </div>

      <ul className='mt-5 list-disc ml-5 space-y-2'>
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className='text-white/70 text-[13px] pl-1 tracking-wide leading-relaxed'
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What I have done so far</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <div className='mt-16 flex flex-col'>
        <VerticalTimeline animate={false} lineColor='rgba(255,255,255,0.08)'>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "work")
