import CanvasContainer from './components/CanvasContainer';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import ScrollProgress from './components/ScrollProgress';
import ScrollToTop from './components/ScrollToTop';
import CustomScrollbar from './components/CustomScrollbar';

function App() {
  return (
    <div className="relative min-h-screen bg-background text-white selection:bg-primary/30 antialiased font-sans">
      <CustomCursor />
      <ScrollProgress />
      <CustomScrollbar />
      <ScrollToTop />
      
      {/* 3D Background */}
      <CanvasContainer />
      
      {/* UI Overlayed layers */}
      <div className="relative z-10 flex flex-col pointer-events-none">
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </main>
      </div>
    </div>
  );
}

export default App;
