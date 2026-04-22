import React, { useState, useEffect } from 'react';
import './Navbar.css';

const NAV_LINKS = [
    { name: 'About',      href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects',   href: '#projects' },
    { name: 'Skills',     href: '#skills' },
    { name: 'Awards',     href: '#achievements' },
];

const Navbar = () => {
    const [scrolled, setScrolled]         = useState(false);
    const [menuOpen, setMenuOpen]         = useState(false);
    const [activeSection, setActiveSection] = useState('');

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
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <a href="#hero" className="nav-logo">&lt;abiruth /&gt;</a>

                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    {NAV_LINKS.map(l => (
                        <li key={l.name}>
                            <a
                                href={l.href}
                                className={activeSection === l.href.slice(1) ? 'active' : ''}
                                onClick={() => setMenuOpen(false)}
                            >{l.name}</a>
                        </li>
                    ))}
                    <li>
                        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
                            Contact
                        </a>
                    </li>
                </ul>

                <button
                    className={`hamburger ${menuOpen ? 'active' : ''}`}
                    onClick={() => setMenuOpen(v => !v)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
