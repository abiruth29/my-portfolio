import React, { useEffect, useRef } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            const pct = total > 0 ? (scrolled / total) * 100 : 0;
            if (barRef.current) barRef.current.style.width = pct + '%';
        };
        window.addEventListener('scroll', update, { passive: true });
        update();
        return () => window.removeEventListener('scroll', update);
    }, []);

    return (
        <div className="scroll-progress-track">
            <div ref={barRef} className="scroll-progress-bar" />
        </div>
    );
};

export default ScrollProgress;
