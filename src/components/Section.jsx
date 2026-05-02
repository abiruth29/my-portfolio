import React from 'react';
import { motion, useInView } from 'framer-motion';

const SECTION_COLORS = {
    about:        'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,212,255,0.055) 0%, transparent 70%)',
    experience:   'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,252,0.06) 0%, transparent 70%)',
    projects:     'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,255,163,0.045) 0%, transparent 70%)',
    skills:       'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,78,205,0.04) 0%, transparent 70%)',
    achievements: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,179,71,0.05) 0%, transparent 70%)',
    contact:      'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,252,0.065) 0%, transparent 70%)',
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const childVariant = {
    hidden: { opacity: 0, y: 44, filter: 'blur(6px)' },
    show: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
    },
};

const Section = ({ id, children, className = '' }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const ambient = SECTION_COLORS[id];

    return (
        <section id={id} ref={ref} className={`section-padding ${className}`}>
            {/* Per-section atmospheric color */}
            {ambient && (
                <div
                    aria-hidden="true"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: ambient,
                        pointerEvents: 'none',
                        zIndex: 0,
                    }}
                />
            )}

            <motion.div
                className="container"
                style={{ position: 'relative', zIndex: 1 }}
                variants={container}
                initial="hidden"
                animate={isInView ? 'show' : 'hidden'}
            >
                {React.Children.map(children, (child, i) =>
                    child ? (
                        <motion.div key={i} variants={childVariant} style={{ willChange: 'transform, opacity' }}>
                            {child}
                        </motion.div>
                    ) : null
                )}
            </motion.div>
        </section>
    );
};

export default Section;
