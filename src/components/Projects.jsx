import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { resumeData, projectCategories } from '../data/resume';
import './Projects.css';

const GitHubIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
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

const ProjectCard = ({ project, index }) => {
    const badge = BADGE_MAP[project.category] || BADGE_MAP['Systems & AI'];

    return (
        <motion.div
            className={`proj-card glass-card ${project.featured ? 'featured' : ''}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22,1,0.36,1], delay: (index % 3) * 0.08 }}
            layout
        >
            {project.badge && (
                <div className="award-ribbon">🏆 {project.badge}</div>
            )}

            <div className="proj-top">
                <span
                    className="proj-category"
                    style={{ background: badge.color, border: `1px solid ${badge.border}`, color: badge.text }}
                >
                    {project.category}
                </span>
                {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="proj-github-link" aria-label="GitHub">
                        <GitHubIcon />
                    </a>
                )}
            </div>

            <h3 className="proj-title">{project.shortTitle || project.title}</h3>
            <p className="proj-oneliner">{project.oneLiner}</p>

            {project.highlight && (
                <div className="proj-highlight">
                    <span className="highlight-dot" />
                    {project.highlight}
                </div>
            )}

            <ul className="proj-points">
                {project.points.slice(0, 2).map((p, i) => (
                    <li key={i}>{p}</li>
                ))}
            </ul>

            <div className="proj-tech">
                {project.tech.split(',').map((t, i) => (
                    <span key={i} className="tech-tag">{t.trim()}</span>
                ))}
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const { projects } = resumeData;
    const [category, setCategory] = useState('All');
    const [showAll, setShowAll]   = useState(false);

    const filtered = category === 'All' ? projects : projects.filter(p => p.category === category);
    const displayed = showAll ? filtered : projects.filter(p => p.featured);

    return (
        <Section id="projects">
            <div className="section-header">
                <span className="section-label">// 03. projects</span>
                <h2 className="section-title">Things I've <span className="accent">Built</span></h2>
                <div className="section-divider" />
            </div>

            {showAll && (
                <motion.div
                    className="filter-bar"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                >
                    {projectCategories.map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${category === cat ? 'active' : ''}`}
                            onClick={() => setCategory(cat)}
                        >{cat}</button>
                    ))}
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={showAll ? 'all' : 'featured'}
                    className="projects-grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    layout
                >
                    {displayed.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} />
                    ))}
                </motion.div>
            </AnimatePresence>

            <div className="proj-toggle">
                <button className="btn btn-secondary" onClick={() => { setShowAll(v => !v); setCategory('All'); }}>
                    {showAll ? 'Show Featured' : `View All ${projects.length} Projects →`}
                </button>
            </div>
        </Section>
    );
};

export default Projects;
