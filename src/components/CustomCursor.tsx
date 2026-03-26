import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPurple, setIsPurple] = useState(false);
  
  // Use springs for smooth following
  const cursorX = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorY = useSpring(0, { stiffness: 1000, damping: 50 });
  const cursorXOuter = useSpring(0, { stiffness: 300, damping: 40 });
  const cursorYOuter = useSpring(0, { stiffness: 300, damping: 40 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorXOuter.set(e.clientX);
      cursorYOuter.set(e.clientY);
      
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements or 3D canvas
      setIsHovering(
        window.getComputedStyle(target).cursor === 'pointer' || 
        target.closest('a') !== null || 
        target.closest('button') !== null ||
        target.tagName.toLowerCase() === 'canvas'
      );

      // Check if the current target explicitly requests a purple cursor override
      setIsPurple(target.closest('[data-cursor="purple"]') !== null);
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [cursorX, cursorY, cursorXOuter, cursorYOuter]);

  // Handle cursor visibility on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[9998] mix-blend-screen overflow-hidden flex items-center justify-center back transition-colors duration-300 ${isPurple ? 'border-purple-500/50' : 'border-primary/50'}`}
        style={{
          x: cursorXOuter,
          y: cursorYOuter,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering 
            ? (isPurple ? 'rgba(168, 85, 247, 0.15)' : 'rgba(59, 130, 246, 0.1)') 
            : 'rgba(0, 0, 0, 0)',
        }}
      >
        <div className={`absolute inset-0 blur-md transition-colors duration-300 ${isPurple ? 'bg-purple-500/30' : 'bg-primary/20'}`}></div>
      </motion.div>
      <motion.div
        className={`fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] mix-blend-screen transition-colors duration-300 ${isPurple ? 'bg-purple-500 shadow-[0_0_15px_4px_rgba(168,85,247,0.8)]' : 'bg-primary shadow-[0_0_15px_4px_rgba(59,130,246,0.8)]'}`}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
        }}
      />
    </>
  );
}
