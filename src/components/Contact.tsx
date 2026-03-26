import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  return (
    <section id="contact" className="relative z-10 pt-32 pb-8 px-6 pointer-events-auto">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="glass p-12 md:p-24 rounded-[3rem] border-t border-white/20"
        >
          <div className="text-accent font-mono text-sm mb-6 tracking-widest uppercase">What's Next?</div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
            Whether you have a question, a project proposal, or just want to connect, I'm always open to discussing new opportunities or creative ideas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <a 
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${import.meta.env.VITE_EMAIL_ADDRESS || ""}`} 
              target="_blank" rel="noopener noreferrer"
              data-cursor="purple"
              className="group flex flex-col items-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-colors border border-white/5 w-48"
            >
              <FaEnvelope className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-300 font-mono">Email Me</span>
            </a>
            
            <button 
              onClick={() => {
                const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
                if (phoneNumber) {
                  window.location.href = `tel:${phoneNumber}`;
                  navigator.clipboard.writeText(phoneNumber);
                  alert("Phone number copied to clipboard and dialer opened!");
                }
              }}
              data-cursor="purple"
              className="group flex flex-col items-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-colors border border-white/5 w-48"
            >
              <FaPhone className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-300 font-mono">Call Me</span>
            </button>

            <a 
              href={
                import.meta.env.VITE_INSTAGRAM_URL 
                  ? (import.meta.env.VITE_INSTAGRAM_URL.startsWith('http') 
                      ? import.meta.env.VITE_INSTAGRAM_URL 
                      : `https://${import.meta.env.VITE_INSTAGRAM_URL}`) 
                  : "#"
              } 
              target="_blank" rel="noopener noreferrer"
              data-cursor="purple"
              className="group flex flex-col items-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-colors border border-white/5 w-48"
            >
              <FaInstagram className="w-8 h-8 text-pink-500 group-hover:scale-110 transition-transform" />
              <span className="text-sm text-gray-300 font-mono">Instagram</span>
            </a>
          </div>
        </motion.div>

        <footer className="mt-20 text-gray-500 text-sm flex flex-col items-center gap-2">
          <p>Crafted in code, powered by React & Three.js</p>
          <p>© {new Date().getFullYear()} — All Rights Reserved</p>
        </footer>
      </div>
    </section>
  );
}
