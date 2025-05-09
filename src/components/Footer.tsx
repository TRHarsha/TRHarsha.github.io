import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 bg-surface-2 border-t border-border">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Harsha T R</h3>
            <p className="text-muted mb-4 max-w-md">
              AI Engineer, Full-Stack Developer, and Researcher with a passion for creating innovative solutions to complex problems.
            </p>
            
            <div className="flex space-x-4">
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
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-muted hover:text-foreground transition-colors">Home</a>
              <a href="#about" className="text-muted hover:text-foreground transition-colors">About</a>
              <a href="#projects" className="text-muted hover:text-foreground transition-colors">Projects</a>
              <a href="#publications" className="text-muted hover:text-foreground transition-colors">Publications</a>
              <a href="#contact" className="text-muted hover:text-foreground transition-colors">Contact</a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <nav className="flex flex-col space-y-2">
              <a href="/resume.pdf" download className="text-muted hover:text-foreground transition-colors">Resume</a>
              <a href="https://blog.harshatr.com" className="text-muted hover:text-foreground transition-colors">Blog</a>
              <a href="https://github.com/harshatr" className="text-muted hover:text-foreground transition-colors">GitHub</a>
            </nav>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted text-sm">
            &copy; {new Date().getFullYear()} Harsha T R. All rights reserved.
          </p>
          
          <p className="text-muted text-sm flex items-center mt-4 md:mt-0">
            Built with <Heart size={14} className="mx-1 text-error" /> using React & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
}