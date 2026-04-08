import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { FaEnvelope, FaPhone, FaInstagram, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaDownload } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const isSending = useRef(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [wordCount, setWordCount] = useState(0);

  const MAX_WORDS = 300;

  const sanitizeInput = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '').trim();
  };

  const getWordCount = (str: string) => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSending.current) return;
    isSending.current = true;

    const sanitizedMessage = sanitizeInput(formState.message);
    const words = getWordCount(sanitizedMessage);

    if (words > MAX_WORDS) {
      alert(`Message exceeds the ${MAX_WORDS} word limit.`);
      isSending.current = false;
      return;
    }

    // Zod validation
    const validation = contactSchema.safeParse(formState);
    if (!validation.success) {
      const errorMsg = validation.error.issues.map((err: z.ZodIssue) => err.message).join("\n");
      alert(errorMsg);
      isSending.current = false;
      return;
    }

    setStatus('submitting');

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
        {
          from_name: sanitizeInput(formState.name),
          reply_to: sanitizeInput(formState.email),
          message: sanitizedMessage,
          to_name: "Aman Jambhulkar",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ""
      );

      if (result.status === 200) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setWordCount(0);
      } else {
        setStatus('error');
      }
    } catch (error) {
      // Avoid logging sensitive error details in production
      setStatus('error');
    } finally {
      isSending.current = false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'message') {
      const words = getWordCount(value);
      setWordCount(words);
    }

    setFormState({
      ...formState,
      [name]: value
    });
  };

  return (
    <section id="contact" className="relative z-10 pt-32 pb-20 px-6 pointer-events-auto">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          transition={{ duration: 0.8 }}
          className="glass p-8 md:p-12 lg:p-16 rounded-[3rem] border-t border-white/20"
        >
          <div className="text-accent font-mono text-sm mb-6 tracking-widest uppercase">What's Next?</div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Get In Touch</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-16">
            Whether you have a question, a project proposal, or just want to connect, I'm always open to discussing new opportunities or creative ideas.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Icons Grid (2x2) */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  const user = "amansj15021";
                  const domain = "gmail.com";
                  const mailtoUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${user}@${domain}`;
                  window.open(mailtoUrl, '_blank', 'noopener,noreferrer');
                }}
                data-cursor="purple"
                className="group flex flex-col items-center justify-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-all border border-white/5 w-full aspect-square text-center"
              >
                <FaEnvelope className="w-8 h-8 sm:w-10 sm:h-10 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm text-gray-300 font-mono">Email Me</span>
              </a>
              
              <button 
                onClick={() => {
                  // Basic obfuscation for phone number
                  const parts = ["952", "982", "7833"];
                  const phoneNumber = parts.join("");
                  window.location.href = `tel:${phoneNumber}`;
                  navigator.clipboard.writeText(phoneNumber);
                  alert("Phone number copied and dialer opened!");
                }}
                data-cursor="purple"
                className="group flex flex-col items-center justify-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-all border border-white/5 w-full aspect-square text-center"
              >
                <FaPhone className="w-8 h-8 sm:w-10 sm:h-10 text-secondary group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm text-gray-300 font-mono">Call Me</span>
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
                className="group flex flex-col items-center justify-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-all border border-white/5 w-full aspect-square text-center"
              >
                <FaInstagram className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm text-gray-300 font-mono">Instagram</span>
              </a>

              <a 
                href="/resume.pdf" 
                target="_blank" rel="noopener noreferrer"
                aria-label="Open Resume in a new tab"
                data-cursor="purple"
                className="group flex flex-col items-center justify-center gap-3 p-6 glass rounded-2xl hover:bg-white/5 transition-all border border-white/5 w-full aspect-square text-center"
              >
                <FaDownload className="w-8 h-8 sm:w-10 sm:h-10 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs sm:text-sm text-gray-300 font-mono">Resume</span>
              </a>
            </div>

            {/* Right Column: Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5 text-left h-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-mono text-gray-400 ml-2">Name</label>
                  <input 
                    required
                    type="text" 
                    id="name" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="John Doe" 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary focus:outline-none transition-colors backdrop-blur-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-mono text-gray-400 ml-2">Email</label>
                  <input 
                    required
                    type="email" 
                    id="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary focus:outline-none transition-colors backdrop-blur-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <label htmlFor="message" className="text-sm font-mono text-gray-400 ml-2">Message</label>
                <textarea 
                  required
                  id="message" 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={5} 
                  placeholder="Hi, I'd like to talk about..." 
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl focus:border-primary focus:outline-none transition-colors resize-none backdrop-blur-sm h-full"
                ></textarea>
                <div className={`text-xs font-mono mt-1 ml-2 flex justify-between ${wordCount > MAX_WORDS ? 'text-red-400' : 'text-gray-500'}`}>
                  <span>{wordCount > MAX_WORDS ? 'Word limit exceeded!' : ''}</span>
                  <span>{wordCount}/{MAX_WORDS} words</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-2 px-2 leading-tight">
                  Your information will only be used to respond to your inquiry and will not be shared with third parties.
                </p>
              </div>
              
              <div className="mt-2 flex flex-col items-center gap-4">
                <button 
                  disabled={status === 'submitting' || status === 'success'}
                  type="submit" 
                  className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-105 active:scale-95 ${
                    status === 'submitting' || status === 'success' ? 'bg-gray-600' : 'bg-primary hover:bg-blue-600 shadow-lg shadow-primary/25'
                  }`}
                >
                  {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
                  {status === 'idle' && <FaPaperPlane className="w-4 h-4" />}
                </button>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 font-medium h-6">
                    <FaCheckCircle /> Message sent successfully!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-400 font-medium h-6">
                    <FaExclamationCircle /> Oops! Something went wrong.
                  </motion.div>
                )}
                {status === 'idle' && <div className="h-6"></div>}
                {status === 'submitting' && <div className="h-6"></div>}
              </div>
            </form>
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
