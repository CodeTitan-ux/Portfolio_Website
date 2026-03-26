import { motion, useScroll, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

export default function ScrollToTop() {
  const { scrollY } = useScroll();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 300) {
        setIsVisible(true);
        controls.start({ opacity: 1, scale: 1, y: 0 });
      } else {
        setIsVisible(false);
        controls.start({ opacity: 0, scale: 0.8, y: 20 });
      }
    });
  }, [scrollY, controls]);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={controls}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-6 md:right-8 z-[100] p-4 rounded-full bg-background/80 backdrop-blur-xl border border-primary/40 text-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:bg-primary/20 hover:text-white transition-all ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-5 h-5" />
    </motion.button>
  );
}
