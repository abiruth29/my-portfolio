import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';
import SectionHeader from './SectionHeader';
import Section from './Section';
import { resumeData } from '../data/resume';
import './Projects.css';

const CARD_W = 500;
const CARD_GAP = 20;
const STEP = CARD_W + CARD_GAP;

const GitHubIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
);

const ExternalIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
);

const BADGE_MAP = {
    'Systems & AI':   { color: 'rgba(124,92,252,0.15)', border: 'rgba(124,92,252,0.35)', text: '#b39dfa' },
    'NLP & RAG':      { color: 'rgba(0,212,255,0.1)',   border: 'rgba(0,212,255,0.3)',   text: '#6fe6ff' },
    'Quantum ML':     { color: 'rgba(0,255,163,0.1)',   border: 'rgba(0,255,163,0.25)',  text: '#4dffca' },
    'Mobile & AI':    { color: 'rgba(255,78,205,0.1)',  border: 'rgba(255,78,205,0.3)',  text: '#ff8fde' },
    'Deep Learning':  { color: 'rgba(255,179,71,0.1)',  border: 'rgba(255,179,71,0.25)', text: '#ffd080' },
    'Web & Backend':  { color: 'rgba(124,92,252,0.12)', border: 'rgba(124,92,252,0.3)',  text: '#b39dfa' },
    'Bioinformatics': { color: 'rgba(0,255,163,0.08)',  border: 'rgba(0,255,163,0.2)',   text: '#4dffca' },
    'Simulation':     { color: 'rgba(0,212,255,0.08)',  border: 'rgba(0,212,255,0.2)',   text: '#6fe6ff' },
};

// ── Modal ──────────────────────────────────────────────────────────────────────
const ProjectModal = ({ project, onClose }) => {
    const badge = BADGE_MAP[project.category] || BADGE_MAP['Systems & AI'];

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const onKey = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <motion.div
            className="proj-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="proj-modal"
                initial={{ y: 80, opacity: 0, scale: 0.97 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 60, opacity: 0, scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal header */}
                <div className="modal-header">
                    <div className="modal-meta">
                        <span
                            className="modal-category"
                            style={{ background: badge.color, border: `1px solid ${badge.border}`, color: badge.text }}
                        >
                            {project.category}
                        </span>
                        {project.badge && (
                            <span className="modal-award">&#127942; {project.badge}</span>
                        )}
                    </div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>

                <h2 className="modal-title">{project.title}</h2>
                <p className="modal-oneliner">{project.oneLiner}</p>

                {project.highlight && (
                    <div className="modal-highlight">
                        <span className="highlight-pip" />
                        {project.highlight}
                    </div>
                )}

                <div className="modal-section-label">What it does</div>
                <ul className="modal-points">
                    {project.points.map((p, i) => (
                        <li key={i}>{p}</li>
                    ))}
                </ul>

                <div className="modal-section-label">Tech Stack</div>
                <div className="modal-tech">
                    {project.tech.split(',').map((t, i) => (
                        <span key={i} className="tech-tag">{t.trim()}</span>
                    ))}
                </div>

                <div className="modal-actions">
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-secondary modal-btn">
                            <GitHubIcon /> View on GitHub
                        </a>
                    )}
                    {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary modal-btn">
                            <ExternalIcon /> Live Demo
                        </a>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// ── Film frame card ────────────────────────────────────────────────────────────
const FilmFrame = ({ project, index, onClick, isActive }) => {
    const badge = BADGE_MAP[project.category] || BADGE_MAP['Systems & AI'];
    const frameNum = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            className={`film-frame ${isActive ? 'film-frame--active' : ''}`}
            onClick={onClick}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.22 }}
        >
            {/* Sprocket holes top */}
            <div className="sprocket sprocket-top">
                {Array.from({ length: 6 }).map((_, i) => <span key={i} className="sprocket-hole" />)}
            </div>

            {/* Film frame content */}
            <div className="film-content">
                {/* Frame number + category */}
                <div className="film-top-row">
                    <span className="film-frame-num">{frameNum}</span>
                    <span
                        className="film-category"
                        style={{ background: badge.color, border: `1px solid ${badge.border}`, color: badge.text }}
                    >
                        {project.category}
                    </span>
                    {project.badge && <span className="film-award">&#127942;</span>}
                </div>

                <h3 className="film-title">{project.shortTitle || project.title}</h3>
                <p className="film-oneliner">{project.oneLiner}</p>

                {project.highlight && (
                    <div className="film-highlight">
                        <span className="highlight-pip" />
                        {project.highlight}
                    </div>
                )}

                <div className="film-tech">
                    {project.tech.split(',').slice(0, 4).map((t, i) => (
                        <span key={i} className="tech-tag">{t.trim()}</span>
                    ))}
                    {project.tech.split(',').length > 4 && (
                        <span className="tech-tag tech-more">+{project.tech.split(',').length - 4}</span>
                    )}
                </div>

                <div className="film-cta">
                    <span>Open project</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                    </svg>
                </div>
            </div>

            {/* Sprocket holes bottom */}
            <div className="sprocket sprocket-bottom">
                {Array.from({ length: 6 }).map((_, i) => <span key={i} className="sprocket-hole" />)}
            </div>
        </motion.div>
    );
};

// ── Main Projects component ────────────────────────────────────────────────────
const Projects = () => {
    const { projects } = resumeData;
    const featured = projects.filter(p => p.featured);
    const all = projects;

    const [showAll, setShowAll]           = useState(false);
    const [activeIdx, setActiveIdx]       = useState(0);
    const [selected, setSelected]         = useState(null);
    const [isDragging, setIsDragging]     = useState(false);
    const [maxConstraint, setMaxConstraint] = useState(0);

    const displayList = showAll ? all : featured;
    const trackRef    = useRef(null);
    const x           = useMotionValue(0);

    // Recalculate constraints when list or size changes
    useEffect(() => {
        const calc = () => {
            if (!trackRef.current) return;
            const trackW = displayList.length * STEP - CARD_GAP;
            const viewW  = trackRef.current.parentElement.clientWidth;
            setMaxConstraint(Math.max(0, trackW - viewW));
        };
        calc();
        window.addEventListener('resize', calc);
        return () => window.removeEventListener('resize', calc);
    }, [displayList]);

    // Jump to index with spring animation
    const goTo = useCallback((idx) => {
        const clamped = Math.max(0, Math.min(idx, displayList.length - 1));
        setActiveIdx(clamped);
        animate(x, -clamped * STEP, { type: 'spring', stiffness: 280, damping: 32 });
    }, [displayList.length, x]);

    // Reset to 0 when list changes
    useEffect(() => {
        setActiveIdx(0);
        animate(x, 0, { duration: 0 });
    }, [showAll, x]);

    const handleDragEnd = (_, info) => {
        setIsDragging(false);
        const velocity = info.velocity.x;
        const offset   = info.offset.x;

        if (velocity < -300 || offset < -STEP / 3) {
            goTo(activeIdx + 1);
        } else if (velocity > 300 || offset > STEP / 3) {
            goTo(activeIdx - 1);
        } else {
            goTo(activeIdx);
        }
    };

    const handleFrameClick = (project) => {
        if (!isDragging) setSelected(project);
    };

    return (
        <Section id="projects">
            <SectionHeader label="// 03. projects" title="Things I've" accent="Built" />

            {/* Film strip */}
            <div className="filmstrip-viewport">
                <motion.div
                    ref={trackRef}
                    className="filmstrip-track"
                    drag="x"
                    dragConstraints={{ left: -maxConstraint, right: 0 }}
                    dragElastic={0.08}
                    style={{ x }}
                    onDragStart={() => setIsDragging(true)}
                    onDragEnd={handleDragEnd}
                    onDrag={() => setIsDragging(true)}
                >
                    {displayList.map((project, i) => (
                        <FilmFrame
                            key={project.id}
                            project={project}
                            index={i}
                            isActive={i === activeIdx}
                            onClick={() => handleFrameClick(project)}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Controls */}
            <div className="film-controls">
                {/* Arrow buttons */}
                <div className="film-arrows">
                    <button
                        className="film-arrow"
                        onClick={() => goTo(activeIdx - 1)}
                        disabled={activeIdx === 0}
                        aria-label="Previous"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="15 18 9 12 15 6"/>
                        </svg>
                    </button>
                    <span className="film-counter">
                        {String(activeIdx + 1).padStart(2, '0')} / {String(displayList.length).padStart(2, '0')}
                    </span>
                    <button
                        className="film-arrow"
                        onClick={() => goTo(activeIdx + 1)}
                        disabled={activeIdx === displayList.length - 1}
                        aria-label="Next"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"/>
                        </svg>
                    </button>
                </div>

                {/* Dot indicators */}
                <div className="film-dots" role="tablist">
                    {displayList.map((_, i) => (
                        <button
                            key={i}
                            className={`film-dot ${i === activeIdx ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                            aria-label={`Go to project ${i + 1}`}
                        />
                    ))}
                </div>

                {/* Show all toggle */}
                <button
                    className="btn btn-secondary film-toggle-btn"
                    onClick={() => setShowAll(v => !v)}
                >
                    {showAll ? 'Show Featured' : `All ${all.length} Projects →`}
                </button>
            </div>

            {/* Drag hint */}
            <p className="film-hint">Drag to scroll &middot; Click to open</p>

            {/* Modal */}
            <AnimatePresence>
                {selected && (
                    <ProjectModal project={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </Section>
    );
};

export default Projects;
