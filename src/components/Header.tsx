import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeProvider';
import { usePersona, Persona } from '../context/PersonaProvider';
import { Menu, X, Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { persona, setPersona, personaData } = usePersona();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePersonaChange = (newPersona: Persona) => {
    setPersona(newPersona);
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-surface/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold">Harsha T R</a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {Object.entries(personaData).map(([id, data]) => (
              <button
                key={id}
                onClick={() => handlePersonaChange(id as Persona)}
                className={`px-4 py-2 rounded-md transition-all duration-300 ${
                  persona === id 
                    ? 'bg-surface-2 text-foreground font-medium' 
                    : 'text-muted hover:text-foreground hover:bg-surface-2/50'
                }`}
              >
                {data.title}
              </button>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <a 
                href="https://github.com/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-surface-2 text-foreground hover:bg-surface-2/80 transition-colors"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md bg-surface-2 text-foreground hover:bg-surface-2/80 transition-colors"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {Object.entries(personaData).map(([id, data]) => (
              <button
                key={id}
                onClick={() => handlePersonaChange(id as Persona)}
                className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-300 ${
                  persona === id 
                    ? 'bg-surface-2 text-foreground font-medium' 
                    : 'text-muted hover:text-foreground hover:bg-surface-2/50'
                }`}
              >
                {data.title}
              </button>
            ))}
            
            <div className="flex items-center space-x-4 px-3 py-2">
              <a 
                href="https://github.com/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://twitter.com/harshatr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}