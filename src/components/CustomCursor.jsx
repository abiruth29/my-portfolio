import React, { useEffect, useRef } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const dotRef  = useRef(null);
    const ringRef = useRef(null);
    const pos     = useRef({ x: 0, y: 0 });
    const ring    = useRef({ x: 0, y: 0 });
    const raf     = useRef(null);

    useEffect(() => {
        const isMobile = window.matchMedia('(hover: none)').matches;
        if (isMobile) return;

        document.body.classList.add('has-custom-cursor');

        const onMove = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };

        const onEnterLink = () => {
            ringRef.current?.classList.add('cursor-ring--active');
            dotRef.current?.classList.add('cursor-dot--active');
        };
        const onLeaveLink = () => {
            ringRef.current?.classList.remove('cursor-ring--active');
            dotRef.current?.classList.remove('cursor-dot--active');
        };

        const lerp = (a, b, t) => a + (b - a) * t;

        const tick = () => {
            ring.current.x = lerp(ring.current.x, pos.current.x, 0.12);
            ring.current.y = lerp(ring.current.y, pos.current.y, 0.12);
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
            }
            raf.current = requestAnimationFrame(tick);
        };
        raf.current = requestAnimationFrame(tick);

        window.addEventListener('mousemove', onMove);

        const addHoverListeners = () => {
            document.querySelectorAll('a, button, [role="button"], .glass-card, .proj-card').forEach(el => {
                el.addEventListener('mouseenter', onEnterLink);
                el.addEventListener('mouseleave', onLeaveLink);
            });
        };
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.body.classList.remove('has-custom-cursor');
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(raf.current);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div ref={dotRef}  className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    );
};

export default CustomCursor;
