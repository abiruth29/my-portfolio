import React from 'react';
import './Marquee.css';

const ITEMS = [
    'Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL',
    'Redis', 'Docker', 'Kubernetes', 'AWS', 'Flutter',
    'C++', 'Java', 'LangChain', 'PyTorch', 'CI/CD',
    'GraphQL', 'Firebase', 'Linux', 'Git', 'Microservices',
];

const MarqueeTrack = ({ reverse }) => (
    <div className={`marquee-track ${reverse ? 'marquee-track--rev' : ''}`}>
        {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="marquee-item">
                {item}
                <span className="marquee-sep">·</span>
            </span>
        ))}
    </div>
);

const Marquee = () => (
    <div className="marquee-root" aria-hidden="true">
        <MarqueeTrack />
        <MarqueeTrack reverse />
    </div>
);

export default Marquee;
