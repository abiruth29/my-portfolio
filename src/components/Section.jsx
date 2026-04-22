import React from 'react';
import { motion } from 'framer-motion';

const Section = ({ id, children, className = "" }) => {
    return (
        <section id={id} className={`section-padding ${className}`}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8 }}
                className="container"
            >
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
