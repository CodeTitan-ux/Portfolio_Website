import { motion } from 'framer-motion';
import { FaCode, FaServer, FaDatabase, FaTools, FaTerminal, FaLightbulb, FaStar } from 'react-icons/fa';

const skills = [
  { icon: <FaCode className="w-8 h-8 text-primary" />, title: 'Frontend', desc: 'React, Next.js, TypeScript, HTML5, CSS3, Tailwind', glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] border-white/5 hover:border-primary/50' },
  { icon: <FaServer className="w-8 h-8 text-secondary" />, title: 'Backend', desc: 'Java, Spring Boot, Spring MVC, Hibernate', glow: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] border-white/5 hover:border-secondary/50' },
  { icon: <FaDatabase className="w-8 h-8 text-accent" />, title: 'Databases', desc: 'MySQL, MongoDB', glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.3)] border-white/5 hover:border-accent/50' },
  { icon: <FaTerminal className="w-8 h-8 text-yellow-500" />, title: 'Programming Languages', desc: 'Java, JavaScript', glow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] border-white/5 hover:border-yellow-500/50' },
  { icon: <FaLightbulb className="w-8 h-8 text-orange-500" />, title: 'Concepts', desc: 'OOP, REST APIs, MVC Architecture, JWT Authentication', glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] border-white/5 hover:border-orange-500/50' },
  { icon: <FaTools className="w-8 h-8 text-green-500" />, title: 'Tools & IDEs', desc: 'Git, GitHub, Postman, Eclipse, VS Code, WordPress, Docker, Figma, Vercel', glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] border-white/5 hover:border-green-500/50' },
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
          className="mb-10 lg:mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-primary">Me</span></h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-start mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="text-lg text-gray-400 max-w-xl leading-relaxed space-y-6">
              <p className="text-xl text-gray-200 font-medium">
                Software Engineer passionate about building , 
                <br />
                scalable and impactful web applications.
              </p>
              
              <div>
                <h4 className="text-white font-semibold mb-2">Specialization:</h4>
                <ul className="space-y-1.5 ml-1">
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> Java full-stack development</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> Building responsive interfaces</li>
                  <li className="flex items-center gap-2"><span className="text-primary">•</span> REST API integration & database design</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm mx-auto lg:ml-auto lg:mr-0 -mt-2 lg:-mt-4"
          >
            <div className="bg-white/5 border border-primary/20 rounded-2xl p-8 glass shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-300">
              <div className="flex items-center gap-3 text-primary font-bold text-2xl uppercase tracking-wider mb-6 pb-4 border-b border-white/10">
                <FaStar className="w-6 h-6" />
                <span>Top Skills</span>
              </div>
              <ul className="flex flex-col gap-4 text-gray-200 font-semibold text-lg">
                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.8)]"></span>Java</li>
                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>React</li>
                <li className="flex items-center gap-3"><span className="w-2.5 h-2.5 rounded-full bg-accent shadow-[0_0_10px_rgba(244,63,94,0.8)]"></span>Spring Boot</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold mb-6">My <span className="text-primary">Skills</span></h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
