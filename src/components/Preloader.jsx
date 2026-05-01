import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        let start = null;
        const duration = 2200;

        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease in-out so it feels satisfying
            const eased = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;
            setCount(Math.floor(eased * 100));

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                setCount(100);
                setTimeout(() => {
                    setDone(true);
                    setTimeout(onComplete, 700);
                }, 400);
            }
        };

        requestAnimationFrame(step);
    }, [onComplete]);

    const letters = 'ABIRUTH'.split('');

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    className="preloader"
                    exit={{ y: '-100%' }}
                    transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* Top-left brand */}
                    <div className="pre-brand">
                        {letters.map((l, i) => (
                            <motion.span
                                key={i}
                                className="pre-brand-letter"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07 + 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {l}
                            </motion.span>
                        ))}
                    </div>

                    {/* Center counter */}
                    <div className="pre-center">
                        <motion.div
                            className="pre-count"
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {String(count).padStart(2, '0')}
                            <span className="pre-percent">%</span>
                        </motion.div>
                        <div className="pre-bar-track">
                            <div className="pre-bar-fill" style={{ width: `${count}%` }} />
                        </div>
                        <motion.p
                            className="pre-status"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {count < 40 ? 'INITIALIZING...' : count < 80 ? 'COMPILING EXPERIENCE...' : count < 100 ? 'SHIPPING...' : 'READY'}
                        </motion.p>
                    </div>

                    {/* Bottom-right location */}
                    <motion.div
                        className="pre-location"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        BASED IN INDIA
                        <span className="pre-location-sep"> / </span>
                        AVAILABLE WORLDWIDE
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
