import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Smoothly interpolate the color from light blue -> blue -> dark blue -> light purple
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#bfdbfe', '#3b82f6', '#1e3a8a', '#d8b4fe']
  );

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress, backgroundColor }}
    />
  );
}
