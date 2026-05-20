import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const PHASES = [
    { text: 'INITIALIZING WORKSPACE', sub: 'Booting dev environment...' },
    { text: 'LOADING PORTFOLIO',       sub: 'Fetching projects & assets...' },
    { text: 'ADDING ANIMATIONS',       sub: 'Calibrating motion system...' },
    { text: 'COMPILING EXPERIENCE',    sub: 'Almost ready...' },
];

const NAME = 'ABIRUTH'.split('');

const Preloader = ({ onComplete }) => {
    const [phase, setPhase]           = useState(0);
    const [progress, setProgress]     = useState(0);
    const [finalReveal, setFinalReveal] = useState(false);
    const [done, setDone]             = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        const TOTAL = 2600; // ms until phases complete
        let rafId;
        let start = null;

        const tick = (ts) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const p = Math.min(elapsed / TOTAL, 1);

            const pct = Math.floor(p * 100);
            setProgress(pct);
            if (barRef.current) barRef.current.style.width = `${pct}%`;

            const newPhase = Math.min(Math.floor(p * PHASES.length), PHASES.length - 1);
            setPhase(newPhase);

            if (p < 1) {
                rafId = requestAnimationFrame(tick);
            } else {
                // Trigger name reveal
                setTimeout(() => {
                    setFinalReveal(true);
                    // After name letters animate in, exit
                    setTimeout(() => {
                        setDone(true);
                        setTimeout(onComplete, 850);
                    }, 900);
                }, 200);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Scanning line */}
                    <div className="pre-scan-line" />

                    {/* Corner brackets */}
                    <div className="pre-corner pre-corner--tl" />
                    <div className="pre-corner pre-corner--tr" />
                    <div className="pre-corner pre-corner--bl" />
                    <div className="pre-corner pre-corner--br" />

                    {/* Top bar */}
                    <div className="pre-top">
                        <motion.div
                            className="pre-brand-mark"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            &lt;abiruth /&gt;
                        </motion.div>
                        <motion.div
                            className="pre-progress-num"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {String(progress).padStart(3, '0')}
                        </motion.div>
                    </div>

                    {/* Center */}
                    <div className="pre-center">
                        {!finalReveal ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={phase}
                                    className="pre-phase-block"
                                    initial={{ opacity: 0, y: 36, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                                    exit={  { opacity: 0, y: -24, filter: 'blur(6px)' }}
                                    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <div className="pre-phase-num">0{phase + 1} —</div>
                                    <div className="pre-phase-text">{PHASES[phase].text}</div>
                                    <div className="pre-phase-sub">{PHASES[phase].sub}</div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <motion.div
                                className="pre-name-reveal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {NAME.map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        className="pre-name-letter"
                                        initial={{ opacity: 0, y: 70, rotateX: -90 }}
                                        animate={{ opacity: 1, y: 0,  rotateX: 0 }}
                                        transition={{
                                            delay: i * 0.07,
                                            duration: 0.52,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    {/* Bottom — progress bar + labels */}
                    <div className="pre-bottom">
                        <div className="pre-bar-track">
                            <div ref={barRef} className="pre-bar-fill" style={{ width: '0%' }} />
                        </div>
                        <div className="pre-bottom-labels">
                            <span className="pre-status-text">
                                {PHASES[phase]?.sub}
                            </span>
                            <span className="pre-location-text">COIMBATORE, INDIA</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
