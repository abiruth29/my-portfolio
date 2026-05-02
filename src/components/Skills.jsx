import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { resumeData } from '../data/resume';
import SectionHeader from './SectionHeader';
import './Skills.css';

const ICONS = {
    'Programming':           { emoji: '💻', accent: 'purple' },
    'Systems & Architecture':{ emoji: '🏗️', accent: 'cyan'  },
    'Cloud & Databases':     { emoji: '☁️', accent: 'green' },
    'AI & Data':             { emoji: '🤖', accent: 'pink'  },
    'DevOps & Tools':        { emoji: '⚙️', accent: 'purple' },
};

const Skills = () => {
    const { skills } = resumeData;

    return (
        <Section id="skills">
            <SectionHeader label="// 04. skills" title="My" accent="Toolkit" />

            <div className="skills-grid">
                {Object.entries(skills).map(([cat, items], i) => {
                    const cfg = ICONS[cat] || { emoji: '🔧', accent: 'purple' };
                    return (
                        <motion.div
                            key={cat}
                            className="skill-box glass-card"
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, ease:[0.22,1,0.36,1], delay: (i % 3) * 0.08 }}
                        >
                            <div className="skill-box-header">
                                <div className={`skill-box-icon accent-${cfg.accent}`}>{cfg.emoji}</div>
                                <span className="skill-box-title">{cat}</span>
                            </div>
                            <div className="skill-pills">
                                {items.map((s, j) => (
                                    <motion.span
                                        key={j}
                                        className="skill-pill"
                                        whileHover={{ scale: 1.07 }}
                                        transition={{ duration: 0.15 }}
                                    >{s}</motion.span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </Section>
    );
};

export default Skills;
