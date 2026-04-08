import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const controls = useAnimation();
  const [displayText, setDisplayText] = useState("Portfolio");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['About', 'Education', 'Experience', 'Projects', 'Certifications', 'Contact'];
      // Trigger the active state when the section reaches the top 1/3rd of the screen
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section.toLowerCase());
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      }
      
      // Clear active state if near the very top of the page
      if (window.scrollY < 100) {
        current = '';
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Smooth scroll to the absolute top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Step 1: 3D Flip up and fade out (terminal roll)
    await controls.start({
      rotateX: 90,
      y: -20,
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" }
    });

    // Step 2: Swap text to developer code view
    setDisplayText("<Portfolio />");

    // Step 3: 3D Flip in from below rapidly with a green tech glow
    await controls.start({
      rotateX: [-90, 0],
      y: [20, 0],
      opacity: 1,
      color: "#10b981", // Matrix/terminal green
      textShadow: "0px 0px 15px rgba(16, 185, 129, 0.8)",
      transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 15 }
    });

    // Step 4: Wait, then roll back
    setTimeout(async () => {
      await controls.start({
        rotateX: 90,
        y: -20,
        opacity: 0,
        transition: { duration: 0.15, ease: "easeIn" }
      });

      setDisplayText("Portfolio");

      await controls.start({
        rotateX: [-90, 0],
        y: [20, 0],
        opacity: 1,
        color: "#ffffff",
        textShadow: "none",
        transition: { duration: 0.2, type: "spring", stiffness: 400, damping: 15 }
      });
    }, 800);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 px-6 py-4 glass pointer-events-auto"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center [perspective:1000px]">
        <motion.a 
          href="#" 
          onClick={handleLogoClick}
          animate={controls}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          data-cursor="purple"
          className="text-2xl font-bold tracking-tighter text-white inline-block origin-center [transform-style:preserve-3d]"
        >
          {displayText === "Portfolio" ? (
            <>Portfolio<span className="text-primary">.</span></>
          ) : (
            <span className="font-mono">{displayText}</span>
          )}
        </motion.a>
        <div className="hidden md:flex ml-auto justify-end gap-4 lg:gap-6">
          {['About', 'Education', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => {
            const isActive = activeSection === item;
            return (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveSection(item)}
                data-cursor="purple"
                className={`text-sm md:text-base font-bold transition-all group flex items-center ${isActive ? 'text-white [text-shadow:0_0_4px_#bfdbfe,0_0_8px_#3b82f6,0_0_12px_#3b82f6]' : 'text-gray-400 hover:text-white'}`}
              >
                <span className={`text-primary transition-all duration-300 mr-2 font-mono font-bold text-lg ${isActive ? 'opacity-100 translate-x-0 [text-shadow:0_0_4px_#3b82f6,0_0_8px_#3b82f6]' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>&lt;</span>
                {item}
                <span className={`text-primary transition-all duration-300 ml-2 font-mono font-bold text-lg ${isActive ? 'opacity-100 translate-x-0 [text-shadow:0_0_4px_#3b82f6,0_0_8px_#3b82f6]' : 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'}`}>/&gt;</span>
              </a>
            );
          })}
        </div>
        <button className="md:hidden text-white">
          {/* Mobile menu icon can go here */}
          <span className="text-xl">☰</span>
        </button>
      </div>
    </motion.nav>
  );
}
