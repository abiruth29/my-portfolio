import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import Section from './Section';
import SectionHeader from './SectionHeader';
import './About.css';

const STATS = [
    { number: '4+',  label: 'Major Projects' },
    { number: '2🏆', label: 'Hackathon Awards' },
    { number: '8+',  label: 'GitHub Repos' },
    { number: '10+', label: 'Technologies' },
];

const About = () => {
    const { summary, location, email } = resumeData.personalInfo;
    const { education } = resumeData;

    return (
        <Section id="about">
            <SectionHeader label="// 01. about" title="Who I" accent="Am" />

            <div className="about-layout">
                {/* Left */}
                <motion.div
                    className="about-left"
                    initial={{ opacity:0, x:-28 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
                >
                    <p className="about-para">
                        Hey! I'm <strong>Abiruth</strong>, a Computer Science undergrad specializing in <strong>Artificial Intelligence</strong> at Amrita School of AI (Class of 2027). I'm passionate about building things that <strong>scale</strong> — distributed backends, cloud-native APIs, and AI systems that solve real problems.
                    </p>
                    <p className="about-para">
                        I've shipped production software during my internship at OPTIVERSE, won hackathons, and built projects spanning quantum ML to biomedical RAG systems. I thrive at the intersection of <strong>software engineering</strong> and <strong>applied AI</strong>.
                    </p>

                    <div className="about-meta">
                        {[
                            { icon:'📍', text: location },
                            { icon:'📧', text: email },
                            { icon:'🎓', text: 'B.Tech CSE (AI), 2023–2027' },
                            { icon:'💼', text: 'Open to Opportunities' },
                        ].map((m, i) => (
                            <div key={i} className="meta-item">
                                <span className="meta-icon">{m.icon}</span>
                                <span>{m.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right */}
                <motion.div
                    className="about-right"
                    initial={{ opacity:0, x:28 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.7, ease:[0.22,1,0.36,1], delay:0.1 }}
                >
                    <div className="stats-grid">
                        {STATS.map((s, i) => (
                            <div key={i} className="stat-card glass-card">
                                <span className="stat-number text-gradient">{s.number}</span>
                                <span className="stat-label">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {education.map((edu, i) => (
                        <div key={i} className="edu-card glass-card">
                            <div className="edu-icon">🎓</div>
                            <div>
                                <div className="edu-degree">{edu.degree}</div>
                                <div className="edu-school">{edu.school}</div>
                                <div className="edu-year">📅 {edu.duration}</div>
                                <div className="edu-courses">
                                    {edu.coursework.map((c, j) => (
                                        <span key={j} className="course-chip">{c}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
};

export default About;
