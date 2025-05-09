import { useState } from 'react';
import ThemeProvider from './context/ThemeProvider';
import PersonaProvider from './context/PersonaProvider';
import Layout from './layout/Layout';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [showHeader, setShowHeader] = useState(true);

  return (
    <ThemeProvider>
      <PersonaProvider>
        <Layout>
          {showHeader && <Header />}
          <Hero setShowHeader={setShowHeader} />
          <About />
          <Projects />
          <Publications />
          <Contact />
          <Footer />
        </Layout>
      </PersonaProvider>
    </ThemeProvider>
  );
}

export default App;