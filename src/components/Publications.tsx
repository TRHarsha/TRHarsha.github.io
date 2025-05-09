import { useState, useRef, useEffect } from 'react';
import { usePersona } from '../context/PersonaProvider';
import { FileText, Calendar, ExternalLink } from 'lucide-react';

interface Publication {
  id: string;
  title: string;
  abstract: string;
  venue: string;
  date: string;
  link?: string;
  authors: string[];
  category: string;
}

export default function Publications() {
  const { persona } = usePersona();
  const [filter, setFilter] = useState('all');
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
  
  // Reset filter when persona changes
  useEffect(() => {
    setFilter('all');
  }, [persona]);
  
  // Only show publications for researcher persona
  if (persona !== 'researcher') {
    return null;
  }
  
  const publications: Publication[] = [
    {
      id: 'pub-1',
      title: 'Towards Ethical and Transparent AI: A Framework for Responsible Development',
      abstract: 'This paper proposes a comprehensive framework for the ethical development and deployment of AI systems, focusing on transparency, fairness, and accountability.',
      venue: 'Journal of AI Ethics',
      date: 'December 2024',
      link: 'https://journal.ai/ethics-framework',
      authors: ['Harsha T R', 'Dr. Jane Smith', 'Prof. Robert Johnson'],
      category: 'ethics'
    },
    {
      id: 'pub-2',
      title: 'Advanced NLP Techniques for Low-Resource Languages',
      abstract: 'A comprehensive book chapter covering state-of-the-art NLP techniques for processing low-resource languages, with practical examples and case studies.',
      venue: 'Handbook of Natural Language Processing (3rd Edition)',
      date: 'August 2024',
      link: 'https://publisher.com/advanced-nlp-techniques',
      authors: ['Dr. Michael Brown', 'Harsha T R', 'Dr. Lisa Chen'],
      category: 'book'
    },
    {
      id: 'pub-3',
      title: 'Machine Learning Applications in Healthcare: A Systematic Review',
      abstract: 'This survey paper provides a comprehensive overview of current applications of machine learning in healthcare, focusing on diagnostic tools and treatment planning.',
      venue: 'International Medical Journal of AI',
      date: 'March 2024',
      link: 'https://medical-journal.org/ml-survey',
      authors: ['Harsha T R', 'Dr. Sarah Williams'],
      category: 'survey'
    },
    {
      id: 'pub-4',
      title: 'Optimizing Large Language Models for Resource-Constrained Environments',
      abstract: 'A novel approach to optimize large language models for deployment in resource-constrained environments without significant performance degradation.',
      venue: 'Conference on Neural Information Processing Systems (NeurIPS)',
      date: 'January 2024',
      authors: ['Prof. David Lee', 'Harsha T R', 'Dr. Emily Taylor'],
      category: 'conference'
    },
    {
      id: 'pub-5',
      title: 'Voice Cloning: Techniques, Applications, and Ethical Considerations',
      abstract: 'This book chapter explores the technical aspects of voice cloning, its applications across industries, and the ethical implications of synthetic voice technology.',
      venue: 'Digital Audio Processing: Theory and Applications',
      date: 'October 2023',
      link: 'https://publisher.com/voice-cloning-chapter',
      authors: ['Harsha T R', 'Dr. James Wilson'],
      category: 'book'
    },
    {
      id: 'pub-6',
      title: 'Carbon-Efficient Training Methods for Deep Learning Models',
      abstract: 'Award-winning paper from the International Sustainable AI Conference presenting novel methods to reduce carbon footprint in training deep learning models.',
      venue: 'International Sustainable AI Conference',
      date: 'May 2023',
      link: 'https://sustainable-ai.org/papers/carbon-efficient',
      authors: ['Harsha T R', 'Dr. Maria Rodriguez', 'Dr. Thomas Lee'],
      category: 'conference'
    }
  ];
  
  const categories = [
    { id: 'all', label: 'All Publications' },
    { id: 'book', label: 'Book Chapters' },
    { id: 'ethics', label: 'AI Ethics' },
    { id: 'survey', label: 'Survey Papers' },
    { id: 'conference', label: 'Conference Papers' }
  ];
  
  const filteredPublications = filter === 'all' 
    ? publications 
    : publications.filter(pub => pub.category === filter);
  
  return (
    <section 
      ref={sectionRef}
      id="publications" 
      className="py-24 persona-transition"
    >
      <div className={`max-w-5xl mx-auto px-4 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Publications & Research</h2>
        
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-md transition-all ${
                filter === category.id 
                  ? 'bg-accent text-white' 
                  : 'bg-surface-2 text-foreground hover:bg-surface-2/80'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        
        {/* Publications list */}
        <div className="space-y-6">
          {filteredPublications.map(pub => (
            <div 
              key={pub.id} 
              className="bg-surface rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2">{pub.title}</h3>
              
              <p className="text-muted mb-4">{pub.abstract}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm mb-4">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-accent" />
                  <span>{pub.date}</span>
                </div>
                <div className="flex items-center">
                  <FileText size={16} className="mr-2 text-accent" />
                  <span>{pub.venue}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-muted">
                  <span className="font-semibold">Authors:</span>{' '}
                  {pub.authors.join(', ')}
                </p>
              </div>
              
              {pub.link && (
                <a 
                  href={pub.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <ExternalLink size={16} />
                  Read Publication
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}