import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * MagneticButton — wraps any <a> or <button> with a spring-physics
 * magnetic pull effect. The element body follows the cursor within its
 * bounding box and snaps back when the mouse leaves.
 *
 * Props:
 *   href      — renders a <motion.a> if provided
 *   strength  — how strongly it pulls (0–1, default 0.38)
 *   className — forwarded to the element
 *   children  — content
 */
const MagneticButton = ({
    children,
    href,
    className,
    strength = 0.38,
    springConfig = { stiffness: 220, damping: 18 },
    onClick,
    target,
    rel,
    'aria-label': ariaLabel,
    style,
    ...rest
}) => {
    const ref = useRef(null);
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, springConfig);
    const y = useSpring(rawY, springConfig);

    const handleMouseMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        rawX.set((e.clientX - cx) * strength);
        rawY.set((e.clientY - cy) * strength);
    };

    const handleMouseLeave = () => {
        rawX.set(0);
        rawY.set(0);
    };

    const sharedProps = {
        ref,
        className,
        style: { x, y, display: 'inline-flex', ...style },
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        'aria-label': ariaLabel,
        ...rest,
    };

    if (href) {
        return (
            <motion.a
                {...sharedProps}
                href={href}
                onClick={onClick}
                target={target}
                rel={rel}
            >
                {children}
            </motion.a>
        );
    }

    return (
        <motion.button {...sharedProps} onClick={onClick}>
            {children}
        </motion.button>
    );
};

export default MagneticButton;
