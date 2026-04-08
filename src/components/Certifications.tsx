import { motion } from 'framer-motion';
import { FaClipboardCheck, FaPython, FaGitAlt, FaCode } from 'react-icons/fa';

const certs = [
  { name: "Software Testing", exeName: "software_testing.exe", issuer: "Quality Assurance • NPTEL (IIT Kharagpur)", year: "Feb 2025", icon: FaClipboardCheck },
  { name: "Python for Data Science", exeName: "data_science.exe", issuer: "Data Science • NPTEL (IIT Madras)", year: "Aug 2025", icon: FaPython },
  { name: "Git & GitHub Training", exeName: "github_training.exe", issuer: "Version Control • IIT Bombay (Spoken Tutorial)", year: "Apr 2025", icon: FaGitAlt },
  { name: "C & C++ Programming", exeName: "c++_programming.exe", issuer: "Programming • IIT Bombay (Spoken Tutorial)", year: "Apr 2024", icon: FaCode },
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
          className="mb-16 md:mb-24"
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
              className="relative p-6 md:p-8 rounded-2xl flex flex-col bg-[#0a0a0a]/80 backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.15)] transition-all duration-300 border border-white/10 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              
              {/* Windows CMD Title Bar */}
              <div className="flex items-center justify-between bg-black/80 px-5 py-3 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 border-b border-white/20 relative z-10 font-mono shadow-sm">
                <span className="text-sm font-medium text-gray-100 tracking-wider">cmd.exe</span>
                <div className="flex items-center gap-2.5 md:gap-3">
                  <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#28c840] text-black active:scale-90 active:bg-[#1faa32] active:shadow-inner text-sm md:text-base font-black cursor-pointer transition-all duration-100 pb-1.5 md:pb-2">_</span>
                  <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#ffbd2e] text-black active:scale-90 active:bg-[#e5a929] active:shadow-inner text-[11px] md:text-xs font-black cursor-pointer transition-all duration-100 pb-px">□</span>
                  <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#ff5f56] text-black active:scale-90 active:bg-[#e04f46] active:shadow-inner text-sm md:text-base font-black cursor-pointer transition-all duration-100 pb-0.5 md:pb-1">×</span>
                </div>
              </div>

              {/* Command Prompt Line */}
              <div className="mb-8 relative z-10 font-mono text-sm md:text-base text-gray-100">
                <span className="text-primary font-bold">C:\Users\Aman\Certificates&gt;</span> start <span className="text-white">{cert.exeName}</span>
              </div>

              <div className="flex items-start gap-4 md:gap-6 relative z-10">
                <div className="bg-secondary/10 p-3 md:p-4 rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.15)] border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors duration-300">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  >
                    <cert.icon className="w-6 h-6 md:w-8 md:h-8 text-secondary drop-shadow-[0_0_8px_rgba(139,92,246,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(139,92,246,0.8)] transition-all" />
                  </motion.div>
                </div>
                <div className="font-mono">
                  <h3 className="text-lg md:text-xl font-bold text-gray-200 mb-2 group-hover:text-white transition-colors">{cert.name}</h3>
                  <p className="text-secondary/90 text-xs md:text-sm mb-1">{cert.issuer}</p>
                  <p className="text-gray-500 text-xs md:text-sm">{cert.year}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
