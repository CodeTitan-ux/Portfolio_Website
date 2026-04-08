import { motion, useAnimation, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useState, useRef } from 'react';

const experiences = [
  {
    role: "Software Development Intern",
    company: "Edunet Foundation",
    period: "Feb 2025 - Mar 2025",
    description: [
      "Built Online Auction Platform using MERN stack",
      "Designed RESTful APIs for backend services",
      "Improved application performance through testing and debugging"
    ],
  },
  {
    role: "AI & Python Intern",
    company: "TechSaksham",
    period: "Feb 2025 - Mar 2025",
    description: [
      "Developed AI Resume Screening & Candidate Ranking System in Python",
      "Implemented algorithms for candidate data extraction and evaluation",
      "Enhanced model logic and testing for accurate ranking"
    ],
  }
];

const ProfilePlaceholder = () => {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleClick = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // The entire container transforms and spins 720 degrees (two full 360 orbits)
    await controls.start({
      rotateY: [0, 360, 720],
      rotateZ: [0, -10, 0], // A slight dramatic tilt during the spin
      scale: [1, 0.8, 1],
      transition: { duration: 1.8, ease: "easeInOut" }
    });

    setIsAnimating(false);
  };

  return (
    <motion.div
      animate={controls}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center cursor-pointer"
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {/* 
        Artsy Architectural Pattern (Wireframe Globe)
        Only fades in and simultaneously counter-spins structurally when the animation is active.
      */}
      <motion.div
        className="absolute -inset-6 md:-inset-10 rounded-full opacity-0 pointer-events-none"
        animate={{ 
          opacity: isAnimating ? 1 : 0, 
          rotateX: isAnimating ? 360 : 0 
        }}
        transition={{ 
          opacity: { duration: 0.3 }, 
          rotateX: { duration: 1.8, ease: "linear" } 
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Latitudes & Longitudes in blazing neon blue/purple */}
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateY(45deg)]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateY(90deg)]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateY(135deg)]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateX(45deg)]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateX(90deg)]" />
        <div className="absolute inset-0 rounded-full border-[2px] border-[#60a5fa] shadow-[0_0_20px_#3b82f6] [transform:rotateX(135deg)]" />
        <div className="absolute inset-0 rounded-full border-[3px] border-[#c084fc] shadow-[0_0_30px_#a855f7]" />
      </motion.div>

      {/* 
        Main profile container:
        Dynamically becomes a brightly glowing frameless glass sphere during animation.
      */}
      <motion.div 
        className="w-full h-full rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] relative z-20 bg-background"
        animate={{ 
          borderWidth: isAnimating ? '0px' : '3px',
          borderColor: 'rgba(59,130,246,0.4)',
          boxShadow: isAnimating ? '0px 0px 100px rgba(59,130,246,1), inset 0px 0px 50px rgba(59,130,246,0.8)' : '0px 0px 30px rgba(0,0,0,0.8)'
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.img 
          src="/photo.jpg" 
          alt="Profile" 
          className="w-full h-full object-cover"
          animate={{ scale: isHovered && !isAnimating ? 1.08 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        
        {/* Glass reflection overlay turning the photo into a 3D highly reflective glowing glass globe */}
        <motion.div 
          className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_0_-20px_40px_rgba(59,130,246,0.6),_inset_0_30px_60px_rgba(255,255,255,0.9)] bg-primary/20 mix-blend-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* 
        Single Neon/Technical Blue Halo:
        Sticks precisely to the border edge (inset-[-3px] covers exactly the 3px border).
      */}
      <motion.div 
        className="absolute inset-[-3px] rounded-full border-[3px] border-transparent border-t-primary border-r-primary opacity-0 z-30 pointer-events-none drop-shadow-[0_0_15px_rgba(59,130,246,1)]"
        animate={{ 
          rotate: isHovered && !isAnimating ? 360 : 0,
          opacity: isHovered && !isAnimating ? 1 : 0
        }}
        transition={{ 
          rotate: { duration: isHovered ? 1.5 : 0.6, repeat: isHovered ? Infinity : 0, ease: "linear" },
          opacity: { duration: 0.3 }
        }}
      />
    </motion.div>
  );
};

// A wrapper to safely apply scroll-linked 3D rotations uniformly to the entire Profile system
const ProfileScrollWrapper = ({ scrollProgress }: { scrollProgress: MotionValue<number> }) => {
  // Apply a heavily damped physics spring to the native scroll position to eliminate choppy mouse wheel events
  const smoothProgress = useSpring(scrollProgress, { damping: 20, stiffness: 60, mass: 0.5 });
  
  // Rotate the profile portrait organically up/down and left/right based on how deep the user is into the section
  const rotateX = useTransform(smoothProgress, [0, 1], [30, -30]);
  const rotateY = useTransform(smoothProgress, [0, 1], [-25, 25]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <ProfilePlaceholder />
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  return (
    <section ref={containerRef} id="experience" className="relative z-10 py-32 px-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} // Only run entrance anim once
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Professional <span className="text-primary">Experience</span></h2>
          <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center lg:items-start">
          
          {/* Left Side: Timeline */}
          <div className="w-full lg:w-1/2 xl:w-3/5">
            <div className="relative pl-8 md:pl-12 space-y-16">
              
              {/* Background dull timeline line */}
              <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-white/10 rounded-full" />
              
              {/* Active glowing neon scroll-synced line */}
              <motion.div 
                className="absolute left-0 top-2 bottom-0 w-[2px] bg-primary origin-top shadow-[0_0_15px_rgba(59,130,246,1)] rounded-full z-0 pointer-events-none"
                style={{ scaleY: scrollYProgress }}
              />

              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative group cursor-default"
                >
                  {/* Timeline dot */}
                  <div className="absolute -left-[40px] md:-left-[56px] top-1 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-transform duration-300 z-10" />
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm font-mono text-gray-400">
                    <span className="text-primary">{exp.company}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>{exp.period}</span>
                  </div>
                  <ul className="space-y-2 text-gray-400 max-w-2xl">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-primary mt-1.5 text-sm leading-none">•</span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Interactive Image circle */}
          <div className="w-full lg:w-1/2 xl:w-2/5 flex justify-center lg:sticky lg:top-40 [perspective:1200px]">
            <ProfileScrollWrapper scrollProgress={scrollYProgress} />
          </div>

        </div>
      </div>
    </section>
  );
}
