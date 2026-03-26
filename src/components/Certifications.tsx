import { motion } from 'framer-motion';
import { FaClipboardCheck, FaPython, FaGitAlt, FaCode } from 'react-icons/fa';

const certs = [
  { name: "Software Testing", issuer: "Quality Assurance • NPTEL (IIT Kharagpur)", year: "Feb 2025", icon: FaClipboardCheck },
  { name: "Python for Data Science", issuer: "Data Science • NPTEL (IIT Madras)", year: "Aug 2025", icon: FaPython },
  { name: "Git & GitHub Training", issuer: "Version Control • IIT Bombay (Spoken Tutorial)", year: "Apr 2025", icon: FaGitAlt },
  { name: "C & C++ Programming", issuer: "Programming • IIT Bombay (Spoken Tutorial)", year: "Apr 2024", icon: FaCode },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative z-10 py-32 px-6 pointer-events-auto">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col items-end text-right"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Licenses & <span className="text-secondary">Certifications</span></h2>
          <div className="h-1 w-20 bg-secondary mb-8 rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass p-8 rounded-2xl flex items-start gap-6 hover:bg-white/5 transition-colors border border-white/5"
            >
              <div className="bg-secondary/20 p-4 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-secondary/30 relative flex items-center justify-center overflow-hidden shrink-0">
                <div className="absolute inset-0 blur-md bg-secondary/10"></div>
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  className="relative z-10"
                >
                  <cert.icon className="w-8 h-8 text-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{cert.name}</h3>
                <p className="text-gray-400 font-mono text-sm mb-1">{cert.issuer}</p>
                <p className="text-gray-500 text-sm">{cert.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
