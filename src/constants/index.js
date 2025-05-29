import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  carrent,
  booking,
  tripguide,
  threejs,
} from "../assets";

import { CodeBracketIcon } from '@heroicons/react/24/solid';

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "UI/UX Designer",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Junior Web Developer",
    company_name: "Self-Initiated Projects & Open Source",
    icon: javascript,
    iconBg: "#383E56",
    date: "June 2022 - December 2022",
    points: [
      "Designed and developed responsive websites using HTML5, CSS3, and vanilla JavaScript.",
      "Built interactive components and practiced DOM manipulation for dynamic interfaces.",
      "Focused on accessibility, clean semantic code, and cross-device compatibility.",
      "Used Git and GitHub for version control and collaboration on small open-source contributions.",
    ],
  },
  {
    title: "React Developer",
    company_name: "University & Personal Projects",
    icon: reactjs,
    iconBg: "#E6DEDD",
    date: "January 2023 - July 2023",
    points: [
      "Built dynamic single-page applications using React.js with functional components and hooks.",
      "Developed a hotel booking app with search filters, authentication, and reusable UI components.",
      "Used Context API for state management and implemented React Router for smooth navigation.",
      "Followed best practices in folder structure, performance optimization, and responsive design.",
    ],
  },
  {
    title: "UI/UX & Web Application Developer",
    company_name: "SaaS Startup Project",
    icon: figma,
    iconBg: "#E6DEDD",
    date: "August 2023 - February 2024",
    points: [
      "Collaborating on a SaaS web app with a focus on clean UX, dashboard usability, and onboarding flows.",
      "Translating Figma designs into reusable and pixel-perfect React components.",
      "Implementing UI animations, visual hierarchy, and mobile responsiveness for better user engagement.",
      "Working in a small agile team, combining design and frontend development roles effectively.",
    ],
  },
  {
    title: "Full Stack Developer (MERN)",
    company_name: "Component-Based Computing Project",
    icon: mongodb,
    iconBg: "#383E56",
    date: "March 2024 - Present",
    points: [
      "Engineered a full-stack application using MongoDB, Express.js, React.js, and Node.js (MERN).",
      "Built modular components following principles of component-based design and separation of concerns.",
      "Implemented secure RESTful APIs, JWT-based authentication, and robust backend validation.",
      "Applied dependency injection and inversion of control concepts to improve code maintainability.",
    ],
  },
];


const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "LamaBooking – Hotel Booking System",
    description:
      "A full-stack web application that allows users to search and book hotels with real-time availability, secure authentication, and user-friendly UI. Admins can manage listings, rooms, and reservations.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "node.js",
        color: "green-text-gradient",
      },
      {
        name: "mongodb",
        color: "orange-text-gradient",
      },
      {
        name: "express",
        color: "pink-text-gradient",
      },
      {
        name: "jwt-auth",
        color: "red-text-gradient",
      },
    ],
    image: booking, // Replace 'booking' with your actual image import name
    source_code_link: "https://github.com/your-username/stayease-booking",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };