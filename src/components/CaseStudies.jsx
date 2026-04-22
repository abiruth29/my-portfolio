import React from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data/resume';
import './CaseStudies.css';

const CaseStudies = () => {
    // Select the 3 featured projects with case study potential
    const caseStudyProjects = resumeData.projects.filter(p => 
        ['health-materials-rag-system', 'cognithreat-intrusion-detection', 'raseed-financial-literacy'].includes(p.slug)
    );

    const caseStudies = [
        {
            project: caseStudyProjects.find(p => p.slug === 'health-materials-rag-system'),
            problem: "Researchers struggle to cross-reference materials with disease and protein data across scattered literature.",
            approach: "Ingested 10k+ biomedical papers → spaCy NER → construct KG (527 nodes, 862 edges) → sentence embeddings → FAISS for fast retrieval → RAG answers.",
            result: "sub-10ms retrieval, production REST APIs for live querying; pipeline reproducible via Docker.",
            metrics: ["10,000+ papers indexed", "527 nodes, 862 edges in KG", "< 10ms query latency"]
        },
        {
            project: caseStudyProjects.find(p => p.slug === 'cognithreat-intrusion-detection'),
            problem: "High false positives in intrusion detection forces analyst overload.",
            approach: "CNN–LSTM feature extractor + quantum variational layer for enhanced feature mapping; Bayesian post-processing to reweight alerts.",
            result: "2–5% accuracy improvement and lower false positives in benchmark tests; optimized execution for GPU and circuit batching.",
            metrics: ["2-5% accuracy gain", "Reduced false positives", "GPU + quantum batching"]
        },
        {
            project: caseStudyProjects.find(p => p.slug === 'raseed-financial-literacy'),
            problem: "Low engagement with financial literacy content among young users.",
            approach: "AI chatbot with personalized micro-lessons; integrated payments for premium content using Google Wallet; mobile-first UX (Flutter).",
            result: "Hackathon winner (Google Agentic AI Hackathon — Breakthrough Concept).",
            metrics: ["Hackathon Winner", "50+ micro-lessons", "Secure payments integrated"]
        }
    ];

    return (
        <section id="case-studies" className="case-studies">
            <motion.div
                className="case-studies-container container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h2 className="section-title">Case Studies</h2>
                <p className="section-subtitle">In-depth exploration of key projects</p>

                <div className="case-studies-list">
                    {caseStudies.map((study, index) => (
                        <motion.div
                            key={index}
                            className="case-study-card glass-card"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <div className="case-study-header">
                                <h3 className="case-study-title">{study.project?.shortTitle}</h3>
                                <p className="case-study-tech">{study.project?.tech}</p>
                            </div>

                            <div className="case-study-content">
                                <div className="case-study-section">
                                    <h4 className="case-study-label">Problem</h4>
                                    <p className="case-study-text">{study.problem}</p>
                                </div>

                                <div className="case-study-section">
                                    <h4 className="case-study-label">Approach</h4>
                                    <p className="case-study-text">{study.approach}</p>
                                </div>

                                <div className="case-study-section">
                                    <h4 className="case-study-label">Result</h4>
                                    <p className="case-study-text">{study.result}</p>
                                </div>

                                <div className="case-study-metrics">
                                    {study.metrics.map((metric, i) => (
                                        <div key={i} className="metric-badge">
                                            {metric}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {study.project?.githubUrl && (
                                <a 
                                    href={study.project.githubUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="case-study-link"
                                >
                                    View on GitHub →
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default CaseStudies;
