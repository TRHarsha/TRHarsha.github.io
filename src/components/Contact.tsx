import { useState, useRef, useEffect } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { Send, Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Contact() {
  const { personaInfo } = usePersona();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setName('');
      setEmail('');
      setMessage('');
      
      // Reset success message after delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'harsha_tr_resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 bg-surface persona-transition"
    >
      <div className={`max-w-5xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Get In Touch</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact form */}
          <div className="bg-background rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            
            {isSubmitted ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 text-green-800 dark:text-green-300 rounded-md p-4 mb-6">
                <p>Thank you for your message! I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    required
                    className="w-full px-4 py-2 rounded-md border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ backgroundColor: personaInfo.color }}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-md text-white font-medium transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Contact info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="text-muted mb-6">
                Feel free to reach out to me through the contact form or connect with me on social media. I'm always open to discussing new projects, opportunities, or ideas.
              </p>
              
              <div className="flex items-center mb-3">
                <Mail size={18} className="text-muted mr-3" />
                <a href="mailto:harsha@example.com" className="text-foreground hover:underline">
                  harsha@example.com
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/harshatr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-2 rounded-full text-foreground hover:bg-surface-2/80 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/harshatr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-2 rounded-full text-foreground hover:bg-surface-2/80 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="https://twitter.com/harshatr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-2 rounded-full text-foreground hover:bg-surface-2/80 transition-colors"
                >
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="bg-surface-2 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold mb-3">Looking for collaboration?</h3>
              <p className="text-muted mb-4">
                I'm open to collaborating on interesting projects related to AI, full-stack development, or research initiatives.
              </p>
              <button 
                onClick={handleDownloadResume}
                style={{ backgroundColor: personaInfo.color }}
                className="inline-block px-4 py-2 text-white rounded-md hover:opacity-90 transition-opacity"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}