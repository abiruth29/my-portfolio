import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import Section from './Section';
import SectionHeader from './SectionHeader';
import './Experience.css';

const Experience = () => {
    const { experience } = resumeData;

    return (
        <Section id="experience">
            <SectionHeader label="// 02. experience" title="Where I've" accent="Worked" />

            <div className="timeline">
                {experience.map((exp, i) => (
                    <motion.div
                        key={i}
                        className="timeline-item"
                        initial={{ opacity: 0, x: -28 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
                    >
                        <div className="timeline-dot" />
                        <div className="timeline-card glass-card">
                            <div className="exp-header">
                                <div>
                                    <div className="exp-role">{exp.role}</div>
                                    <div className="exp-company">{exp.company}</div>
                                    <div className="exp-meta">
                                        <span>📍 {exp.location}</span>
                                        <span>📅 {exp.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <ul className="exp-points">
                                {exp.points.map((p, j) => (
                                    <li key={j}>{p}</li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Experience;
