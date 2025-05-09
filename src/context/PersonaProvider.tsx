import { createContext, useContext, useState, ReactNode } from 'react';

export type Persona = 'ai-engineer' | 'full-stack' | 'researcher';

export interface PersonaInfo {
  id: Persona;
  name: string;
  title: string;
  description: string;
  color: string;
  skills: string[];
}

const personaData: Record<Persona, PersonaInfo> = {
  'ai-engineer': {
    id: 'ai-engineer',
    name: 'Harsha',
    title: 'The AI Engineer',
    description: 'Building intelligent systems with computer vision, NLP, and machine learning',
    color: 'rgb(var(--color-primary))',
    skills: ['Computer Vision', 'PyTorch', 'TensorFlow', 'Azure ML', 'YOLO', 'NLP']
  },
  'full-stack': {
    id: 'full-stack',
    name: 'Harsha',
    title: 'The Full-Stack Developer',
    description: 'Creating seamless user experiences with modern web technologies',
    color: 'rgb(var(--color-secondary))',
    skills: ['React.js', 'Node.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'REST APIs']
  },
  'researcher': {
    id: 'researcher',
    name: 'Harsha',
    title: 'The Researcher/Author',
    description: 'Contributing to academic knowledge in AI and NLP',
    color: 'rgb(var(--color-accent))',
    skills: ['Academic Writing', 'Research Methodology', 'Data Analysis', 'Technical Publications']
  }
};

interface PersonaContextType {
  persona: Persona;
  personaInfo: PersonaInfo;
  setPersona: (persona: Persona) => void;
  personaData: Record<Persona, PersonaInfo>;
}

const PersonaContext = createContext<PersonaContextType | undefined>(undefined);

export function usePersona() {
  const context = useContext(PersonaContext);
  if (context === undefined) {
    throw new Error('usePersona must be used within a PersonaProvider');
  }
  return context;
}

interface PersonaProviderProps {
  children: ReactNode;
}

export default function PersonaProvider({ children }: PersonaProviderProps) {
  const [persona, setPersona] = useState<Persona>('ai-engineer');

  return (
    <PersonaContext.Provider 
      value={{ 
        persona, 
        personaInfo: personaData[persona], 
        setPersona, 
        personaData 
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}