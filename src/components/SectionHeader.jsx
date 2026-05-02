import React from 'react';
import { motion } from 'framer-motion';

const parent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14 } },
};
const fromLeft = {
    hidden: { opacity: 0, x: -20 },
    show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22,1,0.36,1] } },
};
const fromBelow = {
    hidden: { opacity: 0, y: 28 },
    show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22,1,0.36,1] } },
};
const scaleIn = {
    hidden: { opacity: 0, scaleX: 0 },
    show:   { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: [0.22,1,0.36,1] } },
};

const SectionHeader = ({ label, title, accent }) => (
    <motion.div className="section-header" variants={parent} initial="hidden" animate="show">
        <motion.span className="section-label" variants={fromLeft}>{label}</motion.span>
        <motion.h2 className="section-title" variants={fromBelow}>
            {title} {accent && <span className="accent">{accent}</span>}
        </motion.h2>
        <motion.div
            className="section-divider"
            variants={scaleIn}
            style={{ transformOrigin: 'left center' }}
        />
    </motion.div>
);

export default SectionHeader;
