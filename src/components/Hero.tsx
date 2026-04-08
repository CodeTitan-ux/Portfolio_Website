import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaDownload } from 'react-icons/fa';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden z-10 px-6 pt-20">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        <div className="flex flex-col items-start text-left z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6 px-4 py-2 rounded-full glass inline-block border border-white/10"
          >
            <Typewriter />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight mb-4 leading-[1.1]"
          >
            Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Aman Jambhulkar</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-2xl md:text-3xl font-bold text-gray-200 mb-6"
          >
            Full-Stack Developer <span className="text-primary opacity-70 mx-1.5">•</span> Java & React
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-xl mb-10 leading-relaxed"
          >
            Crafting fast, scalable, and user-focused web applications.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#projects" className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/25 whitespace-nowrap">
              View Projects
              <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </a>
            
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Resume in a new tab"
              className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2 group shadow-xl backdrop-blur-md whitespace-nowrap"
            >
              Download Resume
              <FaDownload className="w-4 h-4 group-hover:translate-y-0.5 transition-transform flex-shrink-0" />
            </a>

            <div className="flex gap-3 items-center justify-center sm:justify-start">
              <SocialLink href={import.meta.env.VITE_GITHUB_URL || "#"} icon={<FaGithub className="w-5 h-5" />} />
              <SocialLink 
                href={
                  import.meta.env.VITE_LINKEDIN_URL 
                    ? (import.meta.env.VITE_LINKEDIN_URL.startsWith('http') 
                        ? import.meta.env.VITE_LINKEDIN_URL 
                        : `https://${import.meta.env.VITE_LINKEDIN_URL}`) 
                    : "#"
                } 
                icon={<FaLinkedin className="w-5 h-5" />} 
              />
              <SocialLink href={`https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL_ADDRESS || ""}`} icon={<FaEnvelope className="w-5 h-5" />} />
            </div>
          </motion.div>
        </div>
        
        {/* The right side is intentionally left empty to allow the fixed 3D canvas to show through clearly on desktop */}
        <div className="hidden lg:block pointer-events-none"></div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      data-cursor="purple"
      className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-gray-400 hover:text-white border border-white/5"
    >
      {icon}
    </a>
  );
}

function Typewriter() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = ['Software Developer','Coding Enthusiast','Open to Opportunities','Available for Hire'];

  useEffect(() => {
    let timer = setTimeout(() => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // pause before next word
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-sm font-medium text-primary font-mono inline-block min-w-[200px]">
      {text}<span className="animate-pulse">_</span>
    </span>
  );
}

