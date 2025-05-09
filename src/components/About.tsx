import { useRef, useEffect, useState } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { User, Code, BookOpen } from 'lucide-react';

export default function About() {
  const { persona, personaInfo } = usePersona();
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
  
  const getAboutContent = () => {
    switch (persona) {
      case 'ai-engineer':
        return {
          icon: <User size={24} className="text-primary" />,
          title: 'About Me as an AI Engineer',
          paragraphs: [
            "As an AI Engineer, I specialize in building intelligent systems that leverage computer vision, natural language processing, and machine learning to solve real-world problems.",
            "My expertise includes implementing YOLO-based object detection systems, automatic number plate recognition (ANPR), text-to-speech technologies, and voice cloning using platforms like Deepgram and Zonos.",
            "I've worked extensively with PyTorch, TensorFlow, and Azure ML to develop, train, and deploy production-ready AI models that balance performance and efficiency."
          ],
          stats: [
            { label: 'ML Projects', value: '15+' },
            { label: 'CV Models', value: '8+' },
            { label: 'TTS Systems', value: '3+' }
          ]
        };
      case 'full-stack':
        return {
          icon: <Code size={24} className="text-secondary" />,
          title: 'About Me as a Full-Stack Developer',
          paragraphs: [
            "As a Full-Stack Developer, I design and build end-to-end web applications that deliver exceptional user experiences while maintaining robust and scalable backend systems.",
            "I've developed several projects including full-stack cafe management applications, real-time chat platforms, and legal tech dashboards that streamline complex workflows.",
            "My technical stack includes React.js, Node.js, MongoDB, and PostgreSQL, allowing me to create seamless applications from the database layer to the user interface."
          ],
          stats: [
            { label: 'Web Apps', value: '10+' },
            { label: 'APIs Built', value: '12+' },
            { label: 'UI/UX Designs', value: '15+' }
          ]
        };
      case 'researcher':
        return {
          icon: <BookOpen size={24} className="text-accent" />,
          title: 'About Me as a Researcher/Author',
          paragraphs: [
            "As a Researcher and Author, I contribute to the academic community through publications focused on artificial intelligence and natural language processing.",
            "I've authored book chapters on emerging AI technologies and published papers in peer-reviewed journals that explore novel approaches to computational linguistics and machine learning algorithms.",
            "My research combines theoretical frameworks with practical implementations, aiming to advance the field while addressing real-world challenges in AI ethics and accessibility."
          ],
          stats: [
            { label: 'Publications', value: '5+' },
            { label: 'Book Chapters', value: '2' },
            { label: 'Hackathons Won', value: '4' }
          ]
        };
    }
  };
  
  const content = getAboutContent();
  
  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 persona-transition"
    >
      <div className={`max-w-5xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-center mb-12">
          {content.icon}
          <h2 className="text-3xl md:text-4xl font-bold ml-3">
            {content.title}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {content.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-muted leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="bg-surface rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-6">Quick Stats</h3>
            <div className="space-y-4">
              {content.stats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-3">
                  <span className="text-muted">{stat.label}</span>
                  <span 
                    className="text-lg font-semibold"
                    style={{ color: personaInfo.color }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}