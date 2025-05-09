import { useState, useRef, useEffect } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { Github, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
}

export default function Projects() {
  const { persona } = usePersona();
  const [activeProject, setActiveProject] = useState<string | null>(null);
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
  
  // Reset active project when persona changes
  useEffect(() => {
    setActiveProject(null);
  }, [persona]);
  
  const getProjects = (): Project[] => {
    switch (persona) {
      case 'ai-engineer':
        return [
          {
            id: 'yolo-v11',
            title: 'YOLO V11 Object Detection',
            description: 'Advanced object detection system using YOLO V11 architecture. Implemented for real-time detection with high accuracy and low latency.',
            tags: ['Computer Vision', 'PyTorch', 'YOLO', 'Python'],
            image: 'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/yolo-v11',
            demo: 'https://demo.yolov11.ai'
          },
          {
            id: 'anpr',
            title: 'Automatic Number Plate Recognition',
            description: 'End-to-end ANPR system for traffic monitoring and security applications. Uses custom trained CNN models for plate detection and OCR.',
            tags: ['Computer Vision', 'TensorFlow', 'OCR', 'Python'],
            image: 'https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/anpr-system'
          },
          {
            id: 'voice-clone',
            title: 'Voice Cloning with Deepgram',
            description: 'Voice cloning system built with Deepgram API. Generate natural-sounding speech that mimics specific voice characteristics.',
            tags: ['Audio Processing', 'Deepgram', 'Python', 'TTS'],
            image: 'https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/voice-clone',
            demo: 'https://voice-clone-demo.app'
          },
          {
            id: 'llm-chatbot',
            title: 'Domain-Specific LLM Chatbot',
            description: 'Fine-tuned LLM for specialized domain knowledge in healthcare. Includes RAG system for up-to-date information retrieval.',
            tags: ['NLP', 'LLM', 'Azure ML', 'Python'],
            image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/healthcare-llm'
          }
        ];
      case 'full-stack':
        return [
          {
            id: 'cafe-app',
            title: 'Full-Stack Cafe Management App',
            description: 'Complete cafe management system with inventory tracking, order management, and customer loyalty features.',
            tags: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
            image: 'https://images.pexels.com/photos/1813466/pexels-photo-1813466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/cafe-manager',
            demo: 'https://cafe-manager.app'
          },
          {
            id: 'chat-app',
            title: 'Real-time Chat Application',
            description: 'Full-featured chat platform with real-time messaging, file sharing, and user presence indicators.',
            tags: ['React', 'Socket.io', 'MongoDB', 'Express'],
            image: 'https://images.pexels.com/photos/4549416/pexels-photo-4549416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/realtime-chat'
          },
          {
            id: 'legal-dashboard',
            title: 'Legal Tech Dashboard',
            description: 'Dashboard for legal professionals to track case progress, manage documents, and monitor client interactions.',
            tags: ['React', 'Node.js', 'PostgreSQL', 'Redux'],
            image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/legal-dashboard',
            demo: 'https://legal-tech-dashboard.app'
          },
          {
            id: 'ecommerce',
            title: 'E-commerce Platform',
            description: 'Scalable e-commerce solution with product management, cart functionality, payment processing, and admin controls.',
            tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/ecommerce-platform'
          }
        ];
      case 'researcher':
        return [
          {
            id: 'nlp-book',
            title: 'Book Chapter: Advanced NLP Techniques',
            description: 'Comprehensive book chapter on state-of-the-art NLP techniques and their applications in various domains.',
            tags: ['NLP', 'Research', 'Academic Writing'],
            image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            demo: 'https://publisher.com/advanced-nlp-techniques'
          },
          {
            id: 'ai-ethics',
            title: 'Research Paper: AI Ethics Framework',
            description: 'Peer-reviewed research paper proposing a novel framework for ethical AI development and deployment.',
            tags: ['AI Ethics', 'Research', 'Publication'],
            image: 'https://images.pexels.com/photos/4040012/pexels-photo-4040012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/ai-ethics-framework',
            demo: 'https://journal.ai/ethics-framework'
          },
          {
            id: 'ml-survey',
            title: 'Survey Paper: ML in Healthcare',
            description: 'Comprehensive survey of machine learning applications in healthcare, focusing on diagnostic tools and treatment planning.',
            tags: ['ML', 'Healthcare', 'Survey'],
            image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            demo: 'https://medical-journal.org/ml-survey'
          },
          {
            id: 'hackathon',
            title: 'Hackathon: Sustainable AI Solutions',
            description: 'First-place project at the International Sustainable AI Hackathon, focusing on reducing the carbon footprint of large language models.',
            tags: ['Hackathon', 'Green AI', 'LLM'],
            image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            github: 'https://github.com/harshatr/sustainable-llm'
          }
        ];
    }
  };
  
  const projects = getProjects();
  
  // Set initial active project
  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0].id);
    }
  }, [projects, activeProject]);
  
  const activeProjectData = projects.find(p => p.id === activeProject);
  
  const handleNext = () => {
    const currentIndex = projects.findIndex(p => p.id === activeProject);
    const nextIndex = (currentIndex + 1) % projects.length;
    setActiveProject(projects[nextIndex].id);
  };
  
  const handlePrev = () => {
    const currentIndex = projects.findIndex(p => p.id === activeProject);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setActiveProject(projects[prevIndex].id);
  };
  
  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 bg-surface persona-transition"
    >
      <div className={`max-w-6xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Featured Projects</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Project list */}
          <div className="md:col-span-1 space-y-3">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(project.id)}
                className={`w-full text-left p-4 rounded-lg transition-all ${
                  activeProject === project.id 
                    ? 'bg-surface-2 shadow-sm' 
                    : 'hover:bg-surface-2/50'
                }`}
              >
                <h3 className="font-medium truncate">{project.title}</h3>
                <p className="text-sm text-muted truncate">{project.description.substring(0, 60)}...</p>
              </button>
            ))}
          </div>
          
          {/* Project details */}
          <div className="md:col-span-2 bg-background rounded-lg shadow-sm overflow-hidden">
            {activeProjectData && (
              <div className="persona-transition">
                <div className="relative h-64">
                  <img 
                    src={activeProjectData.image} 
                    alt={activeProjectData.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold">{activeProjectData.title}</h3>
                      <div className="flex mt-2 flex-wrap gap-2">
                        {activeProjectData.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs px-2 py-1 rounded-full bg-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation arrows */}
                  <button 
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-muted mb-6">{activeProjectData.description}</p>
                  
                  <div className="flex flex-wrap gap-3">
                    {activeProjectData.github && (
                      <a 
                        href={activeProjectData.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-surface-2 text-foreground rounded-md hover:bg-surface-2/80 transition-colors"
                      >
                        <Github size={16} />
                        View Source
                      </a>
                    )}
                    
                    {activeProjectData.demo && (
                      <a 
                        href={activeProjectData.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}