import { useRef, useEffect } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { Download, ArrowDown } from 'lucide-react';
import VisualBackground from './VisualBackground';

interface HeroProps {
  setShowHeader: (show: boolean) => void;
}

export default function Hero({ setShowHeader }: HeroProps) {
  const { personaInfo } = usePersona();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show header when hero is not fully visible
        setShowHeader(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, [setShowHeader]);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'harsha_tr_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      id="home"
    >
      <VisualBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 persona-transition">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span 
            className="persona-transition"
            style={{ color: personaInfo.color }}
          >
            {personaInfo.name}
          </span>
          <span className="block mt-2 text-foreground">
            {personaInfo.title}
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted mt-6 max-w-2xl mx-auto">
          {personaInfo.description}
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {personaInfo.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-3 py-1 text-sm rounded-full bg-surface-2 text-foreground"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={handleDownloadResume}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            <Download size={18} />
            Download Resume
          </button>
          
          <a
            href="#about"
            className="flex items-center gap-2 px-6 py-3 bg-surface-2 text-foreground rounded-md hover:bg-surface-2/80 transition-colors"
          >
            <ArrowDown size={18} />
            Learn More
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="text-muted" />
      </div>
    </div>
  );
}