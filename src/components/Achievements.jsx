import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import Section from './Section';
import './Achievements.css';

const Achievements = () => {
    const { achievements } = resumeData;

    return (
        <Section id="achievements">
            <div className="section-header">
                <span className="section-label">// 05. achievements</span>
                <h2 className="section-title">Awards &amp; <span className="accent">Recognition</span></h2>
                <div className="section-divider" />
            </div>

            <div className="awards-grid">
                {achievements.map((a, i) => (
                    <motion.div
                        key={i}
                        className="award-card glass-card"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: i * 0.12 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                    >
                        <span className="award-emoji">{a.emoji}</span>
                        <div className="award-rank">{a.title}</div>
                        <div className="award-event">{a.event}</div>
                        <div className="award-year">{a.year}</div>
                        <p className="award-desc">{a.description}</p>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
};

export default Achievements;
