import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function CustomScrollbar() {
  const { scrollYProgress } = useScroll();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const rafId = useRef<number | null>(null);

  // Color transition matching the high-end neo-glow
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ['#bfdbfe', '#3b82f6', '#1d4ed8', '#d8b4fe']
  );

  // Directly map the scroll 1:1 with Y position bounded strictly to viewport scaling
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '80vh']);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    document.body.style.userSelect = 'none'; // Prevent stray highlighting text across document during scroll loop hauling
  };

  useEffect(() => {
    if (!isDragging) {
      document.body.style.userSelect = 'auto';
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      if (!trackRef.current) return;
      
      const trackRect = trackRef.current.getBoundingClientRect();
      const clientY = e.clientY;
      const trackTop = trackRect.top;
      const trackHeight = trackRect.height;
      
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
      
      rafId.current = requestAnimationFrame(() => {
        const thumbHeight = trackHeight * 0.2; // Derived linearly mirroring the 20vh thumb CSS 
        
        // Calculate Y position physically relative to bounding box top edge
        let newY = clientY - trackTop - (thumbHeight / 2);
        
        // Strict constraints bounding dragging to the screen extremes accurately preventing jump-overs
        newY = Math.max(0, Math.min(newY, trackHeight - thumbHeight));
        
        const percentage = newY / (trackHeight - thumbHeight);
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
        window.scrollTo(0, percentage * maxScroll);
      });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    // Attach global window listeners rather than local div constraints so the user can freely drift their cursor wildly while scrolling without it snapping aborts!
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    const trackRect = trackRef.current.getBoundingClientRect();
    const trackHeight = trackRect.height;
    const thumbHeight = trackHeight * 0.2;
    
    // Jump straight targeting the center of the click impact point
    let newY = e.clientY - trackRect.top - (thumbHeight / 2);
    newY = Math.max(0, Math.min(newY, trackHeight - thumbHeight));
    
    const percentage = newY / (trackHeight - thumbHeight);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = percentage * maxScroll;
    
    // Animate smoothly to area jumps using framer-motion instead of native behavior that lags
    animate(window.scrollY, targetScroll, {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom smooth easing
      onUpdate: (latest) => window.scrollTo(0, latest)
    });
  };

  return (
    <div 
      ref={trackRef}
      className="fixed right-0 top-0 bottom-0 w-[16px] z-[100] hidden md:flex justify-center cursor-pointer"
      onClick={handleTrackClick}
    >
      {/* Visual glowing bar restricted intentionally narrow inside the comfortable 16px wide hitbox to vastly improve physical clicking ease. */}
      <motion.div
        className={`absolute w-[4px] h-[20vh] rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)] transition-colors duration-150 ${isDragging ? 'cursor-grabbing shadow-[0_0_20px_rgba(59,130,246,1)]' : 'cursor-grab'}`}
        style={{ y, backgroundColor }}
        onPointerDown={handlePointerDown}
        onClick={(e) => e.stopPropagation()} // Securely intercept and neutralize empty track jumps when simply clicking on the physical thumb handle.
      />
    </div>
  );
}
