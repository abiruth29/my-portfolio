import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const NAV_LINKS = [
    { name: 'About',      href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects',   href: '#projects' },
    { name: 'Skills',     href: '#skills' },
    { name: 'Awards',     href: '#achievements' },
];

const Navbar = () => {
    const [scrolled, setScrolled]           = useState(false);
    const [menuOpen, setMenuOpen]           = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [hovered, setHovered]             = useState(null);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 40);
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            sections.forEach(s => {
                if (window.scrollY >= s.offsetTop - 160) current = s.id;
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // The indicator follows hover first, then falls back to active section
    const activeLink = NAV_LINKS.find(l => l.href.slice(1) === activeSection);
    const indicatorKey = hovered ?? activeLink?.name ?? null;

    return (
        <>
            {/* Brand wordmark — top left */}
            <a href="#hero" className="nav-wordmark" aria-label="Home">
                <span className="wm-bracket">&lt;</span>
                <span className="wm-name">abiruth</span>
                <span className="wm-bracket">/&gt;</span>
            </a>

            {/* Floating pill nav — centered */}
            <nav className={`navbar-pill ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
                <ul className="pill-links" role="list">
                    {NAV_LINKS.map(l => {
                        const isActive = activeSection === l.href.slice(1);
                        return (
                            <li
                                key={l.name}
                                className="pill-item"
                                onMouseEnter={() => setHovered(l.name)}
                                onMouseLeave={() => setHovered(null)}
                            >
                                {indicatorKey === l.name && (
                                    <motion.span
                                        className="pill-indicator"
                                        layoutId="nav-indicator"
                                        initial={false}
                                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                    />
                                )}
                                <a
                                    href={l.href}
                                    className={`pill-link ${isActive ? 'active' : ''}`}
                                >
                                    {l.name}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Say Hi CTA — top right */}
            <a href="#contact" className="nav-sayhi">
                <span className="sayhi-dot" />
                Say Hi
            </a>

            {/* Mobile hamburger */}
            <button
                className={`hamburger ${menuOpen ? 'active' : ''}`}
                onClick={() => setMenuOpen(v => !v)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
            >
                <span /><span /><span />
            </button>

            {/* Mobile drawer overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            className="mobile-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMenuOpen(false)}
                        />
                        <motion.div
                            className="mobile-drawer"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', stiffness: 340, damping: 36 }}
                        >
                            <div className="drawer-handle" />
                            <div className="drawer-brand">&lt;abiruth /&gt;</div>
                            <nav className="drawer-links">
                                {NAV_LINKS.map(l => (
                                    <a
                                        key={l.name}
                                        href={l.href}
                                        className={`drawer-link ${activeSection === l.href.slice(1) ? 'active' : ''}`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="drawer-link-num">
                                            {String(NAV_LINKS.indexOf(l) + 1).padStart(2, '0')}
                                        </span>
                                        {l.name}
                                    </a>
                                ))}
                                <a
                                    href="#contact"
                                    className="drawer-link drawer-cta"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Contact &#8594;
                                </a>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
