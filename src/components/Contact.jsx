import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("Eu6M5fbsrz-A077zF");
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Enhanced message template that includes sender's email
    const emailMessage = `
Message from: ${form.name}
Email: ${form.email}

Message:
${form.message}

---
This message was sent from your portfolio contact form.
Reply directly to: ${form.email}
    `.trim();

    emailjs
      .send(
        "service_7ahk31c",
        "template_2owo7h7",
        {
          from_name: form.name,
          to_name: "Ahmed Sharaf",
          from_email: form.email,
          to_email: "aahmedsharaf@gmail.com",
          message: emailMessage,
          reply_to: form.email, // This ensures you can reply directly
        }
      )
      .then(
        (result) => {
          setLoading(false);
          console.log('SUCCESS!', result.text);
          
          // Show success message
          setShowSuccess(true);
          
          // Reset form
          setForm({
            name: "",
            email: "",
            message: "",
          });

          // Hide success message after 5 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 5000);
        },
        (error) => {
          setLoading(false);
          console.error('FAILED...', error.text);
          alert(`Error sending message: ${error.text || 'Unknown error occurred'}`);
        }
      );
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='xl:w-[60%] bg-black-100 p-8 rounded-2xl'
      >
        {/* Success Message */}
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 bg-green-500 text-white p-3 sm:p-4 rounded-lg shadow-lg z-10"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base">✅ Message sent successfully! I'll get back to you soon.</span>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-white hover:text-gray-200 ml-2 sm:ml-4 text-lg"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-8 sm:mt-12 flex flex-col gap-6 sm:gap-8'
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base'>
              Your Name <span className="text-red-500">*</span>
            </span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className={`bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors text-sm sm:text-base ${
                errors.name ? 'border-red-500' : 'border-transparent focus:border-primary'
              }`}
            />
            {errors.name && (
              <span className="text-red-500 text-xs sm:text-sm mt-2">{errors.name}</span>
            )}
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base'>
              Your Email <span className="text-red-500">*</span>
            </span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email address?"
              className={`bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors text-sm sm:text-base ${
                errors.email ? 'border-red-500' : 'border-transparent focus:border-primary'
              }`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs sm:text-sm mt-2">{errors.email}</span>
            )}
          </label>

          <label className='flex flex-col'>
            <span className='text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base'>
              Your Message <span className="text-red-500">*</span>
            </span>
            <textarea
              rows={5}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What would you like to say?'
              className={`bg-tertiary py-3 sm:py-4 px-4 sm:px-6 placeholder:text-secondary text-white rounded-lg outline-none border-2 font-medium transition-colors resize-none text-sm sm:text-base ${
                errors.message ? 'border-red-500' : 'border-transparent focus:border-primary'
              }`}
            />
            {errors.message && (
              <span className="text-red-500 text-xs sm:text-sm mt-2">{errors.message}</span>
            )}
            <span className="text-secondary text-xs sm:text-sm mt-2">
              {form.message.length}/500 characters
            </span>
          </label>

          <button
            type='submit'
            disabled={loading}
          className={`py-3 sm:py-4 px-6 sm:px-8 rounded-xl outline-none w-full sm:w-fit text-white font-bold shadow-md transition-all duration-300 text-sm sm:text-base ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 shadow-blue-700 hover:shadow-lg transform hover:-translate-y-1'
            }`}

          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        <div className="mt-6 sm:mt-8 text-secondary text-xs sm:text-sm">
          <p className="mt-2">
            I typically respond within 24 hours. Feel free to reach out for any inquiries!
          </p>
        </div>

        {/* Contact Links */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-tertiary">
          <p className="text-white font-medium mb-3 sm:mb-4 text-sm sm:text-base">Or reach me directly:</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/+201115655645" // Replace with your WhatsApp number
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-3 bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base font-medium"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Gmail */}
            <a
              href="mailto:aahmedsharaff@gmail.com" // Replace with your Gmail
              className="flex items-center justify-center sm:justify-start gap-3 bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-sm sm:text-base font-medium"
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              <span>Gmail</span>
            </a>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:w-[80%] xl:h-auto md:h-[450px] h-[300px] mt-8 xl:mt-0'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");