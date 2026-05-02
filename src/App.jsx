import React, { useState, useCallback, useEffect, useRef } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
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
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);

    // Scroll-driven orb parallax
    useEffect(() => {
        if (!loaded) return;
        let ticking = false;
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const y = window.scrollY;
                const total = document.documentElement.scrollHeight - window.innerHeight;
                const progress = total > 0 ? y / total : 0;

                if (orb1Ref.current) {
                    // Orb 1: drifts down-left as you scroll
                    const tx = progress * -120;
                    const ty = progress * 200;
                    orb1Ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
                    // Hue shift: purple → cyan
                    const hue = Math.round(260 + progress * -60);
                    orb1Ref.current.style.background = `radial-gradient(circle, hsla(${hue}, 95%, 70%, 0.12) 0%, transparent 70%)`;
                }
                if (orb2Ref.current) {
                    // Orb 2: drifts up-right
                    const tx = progress * 100;
                    const ty = progress * -180;
                    orb2Ref.current.style.transform = `translate(${tx}px, ${ty}px)`;
                    const hue = Math.round(190 + progress * 80);
                    orb2Ref.current.style.background = `radial-gradient(circle, hsla(${hue}, 95%, 70%, 0.09) 0%, transparent 70%)`;
                }
                ticking = false;
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [loaded]);

    return (
        <>
            <Preloader onComplete={handlePreloaderDone} />
            <CustomCursor />
            {loaded && (
                <>
                    <ScrollProgress />
                    <div className="orb orb-1" ref={orb1Ref} />
                    <div className="orb orb-2" ref={orb2Ref} />
                    <div className="App">
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
                </>
            )}
        </>
    );
}

export default App;
