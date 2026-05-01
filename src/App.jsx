import React, { useState, useCallback } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import './index.css';

function App() {
    const [loaded, setLoaded] = useState(false);
    const handlePreloaderDone = useCallback(() => setLoaded(true), []);

    return (
        <>
            <Preloader onComplete={handlePreloaderDone} />
            <CustomCursor />
            {loaded && (
                <div className="App">
                    <div className="orb orb-1" />
                    <div className="orb orb-2" />
                    <Navbar />
                    <Hero />
                    <Marquee />
                    <About />
                    <Experience />
                    <Projects />
                    <Skills />
                    <Achievements />
                    <Contact />
                </div>
            )}
        </>
    );
}

export default App;
