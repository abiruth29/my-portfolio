import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ClickSpark from './ClickSpark';
import ThreeHero from './ThreeHero';
import MagneticButton from './MagneticButton';
import { resumeData } from '../data/resume';
import './Hero.css';

const ROLES = [
    'Software Developer',
    'Backend Engineer',
    'AI Builder',
    'Systems Architect',
    'Open Source Engineer',
];

const Hero = () => {
    const { name, summary, email, linkedin, github } = resumeData.personalInfo;
    const [displayed, setDisplayed] = useState('');
    const [roleIdx, setRoleIdx]     = useState(0);
    const [deleting, setDeleting]   = useState(false);

    // Typewriter
    useEffect(() => {
        const current = ROLES[roleIdx];
        let timeout;
        if (!deleting) {
            if (displayed.length < current.length) {
                timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
            } else {
                timeout = setTimeout(() => setDeleting(true), 1800);
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
            } else {
                setDeleting(false);
                setRoleIdx(i => (i + 1) % ROLES.length);
            }
        }
        return () => clearTimeout(timeout);
    }, [displayed, deleting, roleIdx]);

    const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
    const item = {
        hidden: { opacity: 0, y: 32 },
        show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    };

    return (
        <section id="hero" className="hero">
            {/* Three.js 3D scene replaces old star canvas */}
            <ThreeHero />

            {/* Ambient glows */}
            <div className="hero-glow-1" />
            <div className="hero-glow-2" />
            <div className="hero-glow-3" />

            <ClickSpark sparkColor="#7C3AED" sparkSize={8} sparkRadius={14} sparkCount={8} duration={600} />

            <div className="container hero-container">
                <motion.div className="hero-content" variants={container} initial="hidden" animate="show">

                    <motion.div className="hero-tag" variants={item}>
                        <span className="hero-tag-dot" />
                        Available for internships &amp; opportunities
                    </motion.div>

                    <motion.p className="hero-eyebrow" variants={item}>Hi, I&apos;m</motion.p>

                    <motion.h1 className="hero-display-name" variants={item}>
                        <em className="hero-name-serif">Abi</em><span className="hero-name-reg">ruth</span>
                        <span className="hero-name-space">&nbsp;</span>
                        <span className="hero-name-accent">S</span>
                    </motion.h1>

                    <motion.div className="hero-role" variants={item}>
                        <span className="role-prefix">&#8212;&nbsp;</span>
                        <span className="role-text">{displayed}</span>
                        <span className="cursor-blink">|</span>
                    </motion.div>

                    <motion.div className="hero-divider" variants={item} />

                    <motion.div className="hero-body" variants={item}>
                        <p className="hero-desc">{summary}</p>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <span className="stat-num">5+</span>
                                <span className="stat-label">Projects Shipped</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-num">3+</span>
                                <span className="stat-label">Internships</span>
                            </div>
                            <div className="hero-stat">
                                <span className="stat-num">&#8734;</span>
                                <span className="stat-label">Curiosity</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div className="hero-actions" variants={item}>
                        {/* Magnetic CTA buttons */}
                        <MagneticButton href="#projects" className="btn btn-primary" strength={0.32}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <rect x="3" y="3" width="7" height="7"/>
                                <rect x="14" y="3" width="7" height="7"/>
                                <rect x="3" y="14" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/>
                            </svg>
                            View Projects
                        </MagneticButton>

                        <MagneticButton href={`mailto:${email}`} className="btn btn-secondary" strength={0.32}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                            Get In Touch
                        </MagneticButton>

                        <div className="hero-socials">
                            <MagneticButton
                                href={github}
                                className="social-btn"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                strength={0.45}
                                springConfig={{ stiffness: 280, damping: 16 }}
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </MagneticButton>
                            <MagneticButton
                                href={linkedin}
                                className="social-btn"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                strength={0.45}
                                springConfig={{ stiffness: 280, damping: 16 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </MagneticButton>
                            <MagneticButton
                                href={`mailto:${email}`}
                                className="social-btn"
                                aria-label="Email"
                                strength={0.45}
                                springConfig={{ stiffness: 280, damping: 16 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                            </MagneticButton>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-side-panel"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <div className="side-panel-header">
                        <span className="side-dot" />
                        <span className="side-panel-label">sys.status</span>
                    </div>
                    <div className="side-panel-rows">
                        {[
                            { k: '01. STACK',  v: 'Python · TS · C++' },
                            { k: '02. CLOUD',  v: 'AWS · Docker' },
                            { k: '03. AI/ML',  v: 'PyTorch · LangChain' },
                            { k: '04. DB',     v: 'Postgres · Redis' },
                            { k: '05. STATUS', v: 'OPEN TO WORK ↗' },
                        ].map(({ k, v }) => (
                            <div key={k} className="side-row">
                                <span className="side-key">{k}</span>
                                <span className="side-val">{v}</span>
                            </div>
                        ))}
                    </div>
                    <div className="side-panel-footer">
                        <span className="side-ping" />
                        COIMBATORE, INDIA
                    </div>
                </motion.div>
            </div>

            <div className="scroll-indicator">
                <span>scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
};

export default Hero;
