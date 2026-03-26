import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools } from 'react-icons/fa';

const skills = [
  { icon: <FaCode className="w-8 h-8 text-primary" />, title: 'Languages & Web', desc: 'Java, Python, HTML, CSS, JavaScript, React', glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border-white/5 hover:border-primary/50' },
  { icon: <FaServer className="w-8 h-8 text-secondary" />, title: 'Backend Frameworks', desc: 'Spring Boot, Spring MVC, Hibernate', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] border-white/5 hover:border-secondary/50' },
  { icon: <FaDatabase className="w-8 h-8 text-accent" />, title: 'Databases & Concepts', desc: 'MySQL, MongoDB, OOP, DSA, REST APIs, MVC Architecture', glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] border-white/5 hover:border-accent/50' },
  { icon: <FaTools className="w-8 h-8 text-green-500" />, title: 'Development Tools', desc: 'Git, GitHub, VS Code, Postman, Eclipse', glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] border-white/5 hover:border-green-500/50' },
];

const GlassCube = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="relative w-16 h-16 mb-8 [perspective:1000px]">
      <motion.div
        className="w-full h-full relative [transform-style:preserve-3d]"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        {/* Core Icon Suspended in Center (Counter-Rotating to stay perfectly upright) */}
        <div className="absolute inset-0 flex items-center justify-center [transform:translateZ(0px)]">
          <motion.div
            animate={{ rotateX: [360, 0], rotateY: [360, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            {icon}
          </motion.div>
        </div>

        {/* 6 Transparent Glass Faces of the Cube */}
        <div className="absolute inset-0 bg-white/5 border border-white/20 [transform:translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.15)] rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 border border-white/10 [transform:rotateY(180deg)_translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 border border-white/10 [transform:rotateY(90deg)_translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 border border-white/10 [transform:rotateY(-90deg)_translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 border border-white/10 [transform:rotateX(90deg)_translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-md"></div>
        <div className="absolute inset-0 bg-white/5 border border-white/10 [transform:rotateX(-90deg)_translateZ(32px)] shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] rounded-md"></div>
      </motion.div>
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="relative z-10 py-32 px-6 pointer-events-auto">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-primary">Me</span></h2>
          <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
            Aspiring Software Engineer with hands-on experience in Java full-stack development and modern web technologies. Skilled in building responsive, scalable applications using Spring Boot, React, and MongoDB. Passionate about problem-solving, clean coding, and continuous learning, with a strong interest in developing impactful software solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 border ${skill.glow}`}
            >
              <GlassCube icon={skill.icon} />
              
              <h3 className="text-xl font-semibold mb-3">{skill.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
