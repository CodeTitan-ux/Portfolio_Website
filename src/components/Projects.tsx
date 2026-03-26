import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { useState } from 'react';

const projects = [
  {
    title: 'Nova Bank – Banking Web Application',
    description: 'A secure full-stack banking application that enables user authentication, account management, and transaction processing using MVC architecture.',
    tech: ['Java', 'Spring Boot', 'Hibernate', 'MySQL'],
    image: '/proj1.png',
    link: import.meta.env.VITE_PROJECT_1_DEMO || '#',
    github: import.meta.env.VITE_PROJECT_1_GITHUB || '#'
  },
  {
    title: 'Online Auction Platform',
    description: 'A full-stack web application that allows users to participate in real-time bidding with secure authentication and responsive user interface.',
    tech: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
    image: '/proj2.png',
    link: import.meta.env.VITE_PROJECT_2_DEMO || '#',
    github: import.meta.env.VITE_PROJECT_2_GITHUB || '#'
  },
  {
    title: 'Cricket Player Management System',
    description: 'A web-based system for managing player data with CRUD operations, role-based access, and secure authentication mechanisms.',
    tech: ['Python', 'Flask', 'MongoDB', 'HTML/CSS'],
    image: '/proj3.png',
    link: import.meta.env.VITE_PROJECT_3_DEMO || '#',
    github: import.meta.env.VITE_PROJECT_3_GITHUB || '#'
  }
];

const FlipImageCard = ({ project, index }: { project: typeof projects[0], index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // First (0) and Third (2) cards flip anti-clockwise (-180deg)
  const isAntiClockwise = index === 0 || index === 2;
  const targetRotation = isAntiClockwise ? -180 : 180;

  return (
    <div 
      className="w-full lg:w-1/2 relative" 
      style={{ perspective: '1200px' }}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="w-full h-[300px] md:h-[450px] relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? targetRotation : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 50, damping: 12 }}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 group rounded-2xl overflow-hidden shadow-2xl bg-background cursor-pointer"
          style={{ 
            backfaceVisibility: 'hidden',
            pointerEvents: isFlipped ? 'none' : 'auto',
            zIndex: isFlipped ? -1 : 1
          }}
          onClick={() => {
            setIsFlipped(true);
          }}
        >
          <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        </div>

        {/* Back Face: Matte Translucent Glass with Imprinted Image */}
        <div 
          className="absolute inset-0 rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/10 bg-black/10 backdrop-blur-md cursor-pointer"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: `rotateY(${targetRotation}deg)`,
            transformStyle: 'preserve-3d',
            pointerEvents: isFlipped ? 'auto' : 'none',
            zIndex: isFlipped ? 1 : -1
          }}
          onClick={() => {
            setIsFlipped(false);
          }}
        >
          {/* Internal wrapper for clipping the background image only */}
          <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
            <img 
              src={project.image} 
              alt={`${project.title} Background Imprint`} 
              className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay scale-x-[-1]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
          </div>
          
          <div className="text-center p-6 flex flex-col items-center relative z-30">
            <button 
              className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 shadow-xl border border-white/20 backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,255,255,1)] hover:bg-white/30 hover:scale-110 relative z-50 pointer-events-auto cursor-pointer"
              aria-label="View Live Demo"
              onClick={(e) => {
                e.stopPropagation();
                const url = project.link;
                if (url && url !== '#') {
                  window.open(url, '_blank', 'noopener,noreferrer');
                } else {
                  alert(`Demo link for "${project.title}" coming soon!`);
                }
              }}
            >
              <FaExternalLinkAlt className="w-6 h-6 text-white" />
            </button>
            <h4 className="text-2xl font-bold text-white mb-2 tracking-wide">Live Demo</h4>
            <p className="text-gray-400 mb-8 text-sm max-w-[200px] font-light">Experience the live interactive build of this project</p>
            <button 
              className="inline-flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/30 text-white font-medium rounded-full transition-all duration-300 shadow-xl border border-white/20 backdrop-blur-md hover:scale-110 active:scale-95 relative z-[60] pointer-events-auto cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                const url = project.link;
                if (url && url !== '#') {
                   window.open(url, '_blank', 'noopener,noreferrer');
                } else {
                  alert(`Demo link for "${project.title}" coming soon!`);
                }
              }} 
            >
              <span>Launch Demo</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 py-32 px-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured <span className="text-secondary">Work</span></h2>
          <div className="h-1 w-20 bg-secondary mb-8 rounded-full"></div>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
            >
              
              <FlipImageCard project={project} index={index} />

              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className="text-primary font-mono text-sm mb-4 tracking-wider">Featured Project</div>
                <h3 className="text-3xl font-bold mb-6 text-white">{project.title}</h3>
                <div className="glass p-6 md:p-8 rounded-2xl mb-8 relative z-20 transition-all duration-300">
                  <p className="text-gray-300 leading-relaxed">{project.description}</p>
                </div>
                
                <ul className="flex flex-wrap gap-4 mb-8 text-sm font-mono text-gray-400">
                  {project.tech.map((t, i) => {
                    const glowColors = [
                      'hover:shadow-[0_0_15px_rgba(255,255,255,1),_0_0_30px_rgba(255,255,255,0.6)] active:shadow-[0_0_25px_rgba(255,255,255,1)] hover:border-white/80 hover:bg-white/20', // 0: White
                      'hover:shadow-[0_0_15px_rgba(56,189,248,1),_0_0_30px_rgba(56,189,248,0.6)] active:shadow-[0_0_25px_rgba(56,189,248,1)] hover:border-sky-400/80 hover:bg-sky-400/20', // 1: Vivid Light Blue
                      'hover:shadow-[0_0_15px_rgba(59,130,246,1),_0_0_30px_rgba(59,130,246,0.6)] active:shadow-[0_0_25px_rgba(59,130,246,1)] hover:border-blue-500/80 hover:bg-blue-500/20', // 2: Vivid Dark Blue
                      'hover:shadow-[0_0_15px_rgba(168,85,247,1),_0_0_30px_rgba(168,85,247,0.6)] active:shadow-[0_0_25px_rgba(168,85,247,1)] hover:border-purple-500/80 hover:bg-purple-500/20' // 3: Vivid Purple
                    ];
                    const glowClass = glowColors[i % 4];

                    return (
                      <li 
                        key={i} 
                        className={`bg-white/5 px-4 py-1.5 rounded-full cursor-pointer transition-all duration-300 hover:text-white border border-transparent ${glowClass}`}
                      >
                        {t}
                      </li>
                    );
                  })}
                </ul>

                <div className="flex gap-6 items-center">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="View GitHub Repository" 
                    title="GitHub" 
                    data-cursor="purple" 
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <FaGithub className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
