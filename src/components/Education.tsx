import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { FaGraduationCap, FaUniversity, FaSchool, FaCode, FaServer, FaLaptopCode, FaFlagCheckered } from 'react-icons/fa';

const timelineNodes = [
  {
    year: "2020",
    education: {
      title: "Secondary School (SSC)",
      institution: "Sardar Dastur Hormazdiar High School",
      description: "Graduated with excellent academic performance."
    },
    milestones: [],
    icon: FaSchool
  },
  {
    year: "2022",
    education: {
      title: "Higher Secondary (HSC)",
      institution: "Nowrosjee Wadia College",
      description: "Completed science background."
    },
    milestones: [],
    icon: FaUniversity
  },
  {
    year: "2023",
    education: null,
    milestones: ["Learned OOPs, Python, and Git fundamentals."],
    icon: FaCode
  },
  {
    year: "2024",
    education: null,
    milestones: ["Began learning Java, web development, and software engineering fundamentals."],
    icon: FaServer
  },
  {
    year: "2025",
    education: null,
    milestones: [
      "Completed Software Development Internship at Edunet Foundation",
      "Earned multiple technical certifications"
    ],
    icon: FaLaptopCode
  },
  {
    year: "2026",
    education: {
      title: "Bachelor of Engineering",
      institution: "Sinhgad Academy of Engineering",
      description: "Information Technology degree."
    },
    milestones: [
      "Completed Full Stack Java Training at Kiran Academy",
      "Built several full-stack web applications"
    ],
    icon: FaGraduationCap
  }
];

/* Performance-optimized spring for layout */
const expandSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 0.5,
};

/* Fluid cubic-bezier for smooth transitions */
const smoothEase = {
  ease: [0.22, 1, 0.36, 1] as any,
  duration: 0.6
};

export default function Education() {
  const containerRef = useRef<HTMLElement>(null);
  
  const [isExpanded, setIsExpanded] = useState(false);

  const handleTimelineClick = () => {
    setIsExpanded(true);
  };

  const handleTimelineDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(false);
  };

  // Scroll Tracking & Animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 35,
    stiffness: 60,
    mass: 0.5
  });

  const scaleAxis = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const glowOpacity = useTransform(smoothProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // ─── 1) Scroll-Linked Content Transforms (Timeline) ───
  const timelineOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const timelineX = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [-80, 0, 0, 80]); // Left-to-Right

  // ─── 2) Scroll-Linked Heading Transforms (Unified Sync) ───
  const headingOpacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const headingX = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [-80, 0, 0, 80]); // Left-to-Right

  return (
    <section ref={containerRef} id="education" className="relative z-10 py-32 px-6 pointer-events-auto overflow-hidden">
      <style>{`
        /* ─── Continuous Breathing Pulse: smooth expand & contract ─── */
        @keyframes spherePulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.12); }
        }

        /* ─── Continuous Waving Flag Animation: Intensified ─── */
        @keyframes flagWave {
          0%, 100% { transform: rotate(-8deg) skew(4deg); }
          50%      { transform: rotate(8deg) skew(-4deg); }
        }

        .flag-animate {
          animation: flagWave 2.5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        /* ─── 3D Sphere Shell ─── */
        .sphere-3d {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          transform-style: preserve-3d;
          perspective: 400px;
          cursor: pointer;
          transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Sphere surface — realistic glass with specular highlights and depth */
        .sphere-3d .sphere-surface {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background:
            /* Primary specular highlight — top-left bright reflection */
            radial-gradient(ellipse 50% 40% at 32% 28%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 30%, transparent 70%),
            /* Secondary smaller highlight — gives curvature */
            radial-gradient(ellipse 30% 20% at 28% 22%, rgba(255,255,255,0.9) 0%, transparent 100%),
            /* Bottom-right rim catch light */
            radial-gradient(ellipse 40% 30% at 72% 78%, rgba(255,255,255,0.12) 0%, transparent 100%),
            /* Edge rim lighting — makes sphere pop */
            radial-gradient(circle at 50% 50%, transparent 58%, rgba(255,255,255,0.12) 68%, rgba(255,255,255,0.06) 78%, transparent 82%),
            /* Inner glass body — semi-transparent with subtle blue tint */
            radial-gradient(circle at 50% 60%, rgba(180,210,255,0.12) 0%, rgba(120,160,220,0.06) 40%, rgba(0,0,0,0.15) 100%);
          border: 1.5px solid rgba(255, 255, 255, 0.3);
          box-shadow:
            /* Inner top highlight */
            inset 0 6px 16px rgba(255,255,255,0.15),
            /* Inner bottom shadow for depth */
            inset 0 -10px 20px rgba(0,0,0,0.25),
            /* Outer soft shadow */
            0 8px 24px rgba(0,0,0,0.4),
            0 2px 6px rgba(0,0,0,0.2);
          -webkit-backdrop-filter: blur(12px);
          backdrop-filter: blur(12px);
          transform-style: preserve-3d;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backface-visibility: hidden;
        }

        /* ─── Hover: spin + white glow ─── */
        .sphere-3d:hover .sphere-surface,
        .group:hover .sphere-3d .sphere-surface,
        .sphere-3d:hover .sphere-icon-wrap,
        .group:hover .sphere-3d .sphere-icon-wrap {
          animation: spherePulse 2s ease-in-out infinite;
        }
        .sphere-3d:hover,
        .group:hover .sphere-3d {
          box-shadow:
            0 0 25px rgba(255, 255, 255, 0.5),
            0 0 50px rgba(255, 255, 255, 0.2),
            0 8px 24px rgba(0,0,0,0.5);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Icon stays centered and does NOT rotate */
        .sphere-3d .sphere-icon-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          pointer-events: none;
        }

        /* ─── Education Box: white glow on hover only ─── */
        .edu-box {
          transition: box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      border-color 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                      transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          contain: layout style paint;
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
        .edu-box:hover,
        .group:hover .edu-box {
          box-shadow:
            0 8px 32px rgba(0, 0, 0, 0.5),
            0 0 20px rgba(255, 255, 255, 0.4),
            0 0 40px rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateZ(0) translateY(-2px);
        }

        /* ─── GPU promotion for animated glass panels ─── */
        .glass-animate {
          contain: layout style paint;
          transform: translateZ(0);
          will-change: transform, opacity;
          backface-visibility: hidden;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        
        {/* Synchronized Heading Wrapper */}
        <motion.div
          style={{ opacity: headingOpacity, x: headingX, transform: 'translateZ(0)' }}
          className="mb-10 md:mb-16 flex flex-col items-start text-left will-change-transform"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Educational <span className="text-primary">Background</span></h2>
          <div className="h-1 w-20 bg-primary rounded-full mb-6"></div>
        </motion.div>

        {/* Synchronized Timeline Content Wrapper */}
        <motion.div
           style={{ opacity: timelineOpacity, x: timelineX, transform: 'translateZ(0)' }}
           className="will-change-transform"
        >
          {/* ============================================================== */}
          {/* DESKTOP TIMELINE                                               */}
          {/* ============================================================== */}
          <div 
             className="hidden lg:relative lg:flex w-full pb-10 -mt-6 justify-between items-start select-none cursor-pointer"
             onClick={handleTimelineClick}
             onDoubleClick={handleTimelineDoubleClick}
          >
            {/* Connecting Line */}
            <div className="absolute top-[250px] w-full px-[2%] xl:px-0 left-0 right-0 h-[80px] flex items-center justify-center z-0 pointer-events-none">
               <div className="absolute left-[8%] right-[8%] h-[2px] bg-white/10 rounded-full z-0" />
               <motion.div 
                 className="absolute left-[8%] right-[8%] h-[3px] bg-primary rounded-full shadow-[0_0_20px_rgba(59,130,246,0.8)] origin-center z-0" 
                 style={{ scaleX: scaleAxis, opacity: glowOpacity }} 
               />
            </div>

            <div className="flex w-full justify-between items-start z-10 px-[2%] xl:px-0">
               <AnimatePresence initial={false} mode="popLayout">
                 {timelineNodes.filter(node => isExpanded || node.education).map((node) => (
                      <motion.div 
                        layout="position"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          layout: { ...expandSpring },
                          opacity: { duration: 0.3, ease: "easeOut" },
                          scale: { duration: 0.3, ease: "easeOut" },
                        }}
                        key={`desktop-${node.year}`}
                        className="flex flex-col items-center relative w-[200px] xl:w-[220px] group"
                      >
                        {/* 1) Milestone Area */}
                        <div className="h-[250px] w-full flex justify-center items-end pb-[50px] relative overflow-visible">
                           <AnimatePresence initial={false} mode="popLayout">
                              {isExpanded && node.milestones.length > 0 && (
                                 <div className="flex flex-col gap-3 w-full items-center">
                                    {node.milestones.map((ms, idx) => (
                                       <motion.div 
                                         layout
                                         key={`desktop-${node.year}-ms-${idx}`}
                                         initial={{ opacity: 0, y: 12 }}
                                         animate={{ opacity: 1, y: 0 }}
                                         exit={{ opacity: 0, y: 8 }}
                                         transition={{
                                           layout: smoothEase,
                                           opacity: { duration: 0.25, ease: "easeOut" },
                                           y: smoothEase,
                                           delay: idx * 0.1
                                         }}
                                         className="glass-animate bg-black/40 backdrop-blur-xl p-5 rounded-2xl border border-white/10 w-[170px] xl:w-[190px] h-fit min-h-[100px] shadow-2xl flex flex-col items-center justify-center relative mt-auto z-10 overflow-hidden"
                                       >
                                          {/* Background Animated Icon */}
                                          <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] pointer-events-none z-0">
                                             <FaFlagCheckered className="w-20 h-20 text-primary flag-animate" />
                                          </div>

                                          <p className="text-gray-100 text-sm xl:text-base text-justify font-medium leading-relaxed font-mono tracking-tight z-10 w-full break-words hyphens-auto relative">
                                             {ms}
                                          </p>
                                          {idx === node.milestones.length - 1 && (
                                             <div className="absolute -bottom-[50px] left-1/2 w-[1px] h-[50px] bg-white/20 -translate-x-1/2 z-0" />
                                          )}
                                       </motion.div>
                                    ))}
                                 </div>
                              )}
                           </AnimatePresence>
                        </div>

                        {/* 2) 3D Sphere with Icon Enclosed */}
                        <div className="h-[80px] w-full flex justify-center items-center relative overflow-visible">
                           <div className="sphere-3d">
                             {/* 3D surface layer — rotates on hover */}
                             <div className="sphere-surface" />
                             {/* Icon — stays centered, doesn't rotate */}
                             <div className="sphere-icon-wrap">
                               <node.icon className="w-6 h-6 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]" />
                             </div>
                           </div>
                           <div className="absolute top-[110%] text-primary font-extrabold font-mono text-base xl:text-lg px-2 py-0.5 rounded leading-none pointer-events-none z-20 mt-2 text-center w-full">
                              {node.year}
                           </div>
                        </div>

                        {/* 3) Education Box Area */}
                        <div className="w-full flex justify-center mt-20 relative h-[250px]">
                           {node.education && (
                             <motion.div 
                               initial={{ opacity: 0, y: 20 }}
                               whileInView={{ opacity: 1, y: 0 }}
                               viewport={{ once: true }}
                               transition={{ duration: 0.5 }}
                               className="absolute top-0 glass bg-black/60 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 w-[180px] xl:w-[200px] min-h-[200px] shadow-2xl flex flex-col justify-start items-center text-center z-20 cursor-pointer edu-box"
                             >
                                <div className="absolute -top-[52px] left-1/2 w-[1px] h-[52px] bg-white/20 -translate-x-1/2 z-0" />
                                <h3 className="text-white text-lg xl:text-xl font-bold tracking-tight mb-1 w-full text-center">{node.education.title}</h3>
                                <p className="text-primary text-xs xl:text-sm font-semibold leading-relaxed w-full mb-3 text-center">{node.education.institution}</p>
                                <div className="w-full h-[1px] bg-white/10 my-1" />
                                <p className="text-gray-300 text-xs xl:text-sm leading-relaxed w-full mt-3 tracking-wide text-center">{node.education.description}</p>
                             </motion.div>
                           )}
                        </div>

                      </motion.div>
                    ))}
                </AnimatePresence>
            </div>
          </div>

          {/* ============================================================== */}
          {/* MOBILE & TABLET TIMELINE                                       */}
          {/* ============================================================== */}
          <div 
            className="lg:hidden relative flex flex-col w-full py-2 -mt-4 cursor-pointer select-none"
            onClick={handleTimelineClick}
            onDoubleClick={handleTimelineDoubleClick}
          >
            {/* Vertical Timeline Spine */}
            <div className="absolute top-0 bottom-0 left-[34px] w-[2px] bg-white/10 rounded-full z-0" />
            <motion.div 
              className="absolute top-0 bottom-0 left-[34px] w-[3px] origin-center bg-primary rounded-full z-0 shadow-[0_0_20px_rgba(59,130,246,0.9)]"
              style={{ scaleY: scaleAxis, opacity: glowOpacity }}
            />

            <div className="flex flex-col w-full">
              <AnimatePresence initial={false}>
              {timelineNodes.filter(node => isExpanded || node.education).map((node) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                    animate={{ opacity: 1, height: "auto", marginBottom: 48 }}
                    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                    transition={{
                      layout: { ...expandSpring },
                      opacity: { duration: 0.3, ease: "easeOut" },
                      height: { ...expandSpring },
                      marginBottom: { ...expandSpring },
                    }}
                    key={`mobile-${node.year}`}
                    className="relative flex items-start w-full group overflow-visible"
                  >
                  {/* 3D Sphere */}
                  <div className="absolute left-[34px] top-0 -translate-x-1/2 z-10">
                    <div className="sphere-3d">
                      <div className="sphere-surface" />
                      <div className="sphere-icon-wrap">
                        <node.icon className="w-6 h-6 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Container */}
                  <div className="pl-[84px] w-full flex flex-col gap-3 min-h-[64px] justify-center pt-4 pb-2 z-10">
                    <span className="text-primary font-extrabold font-mono text-base tracking-widest leading-none block -mt-1 group-hover:text-white transition-colors text-center sm:text-left">{node.year}</span>
                    
                    {/* Expandable Milestone Box */}
                    <AnimatePresence initial={false} mode="popLayout">
                      {(isExpanded && node.milestones.length > 0) && (
                        <div className="flex flex-col gap-2 w-full">
                          {node.milestones.map((ms, idx) => (
                            <motion.div 
                              layout
                              key={`mobile-${node.year}-ms-${idx}`}
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{
                                layout: smoothEase,
                                opacity: { duration: 0.2, ease: "easeOut" },
                                height: smoothEase,
                                delay: idx * 0.05
                              }}
                              className="overflow-hidden"
                            >
                              <div className="glass-animate bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 w-full relative mb-1 shadow-2xl overflow-hidden flex flex-col items-center justify-center">
                                {/* Background Animated Icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-[0.25] pointer-events-none z-0">
                                  <FaFlagCheckered className="w-16 h-16 text-primary flag-animate" />
                                </div>

                                <p className="text-sm sm:text-base text-gray-100 text-justify leading-relaxed font-mono w-full break-words hyphens-auto relative z-10">
                                  {ms}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </AnimatePresence>

                    {/* Education Box */}
                    {node.education && (
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="glass bg-black/60 backdrop-blur-2xl p-6 md:p-8 rounded-2xl border border-white/10 w-full min-h-[180px] mt-3 shadow-2xl flex flex-col items-center text-center cursor-pointer edu-box"
                      >
                        <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight mb-2 w-full text-center">{node.education.title}</h3>
                        <p className="text-primary text-base md:text-lg font-semibold leading-tight w-full mb-3 text-center">{node.education.institution}</p>
                        <div className="w-full h-[1px] bg-white/10 my-2" />
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed w-full mt-2 tracking-wide text-center">{node.education.description}</p>
                      </motion.div>
                    )}

                  </div>
                </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
