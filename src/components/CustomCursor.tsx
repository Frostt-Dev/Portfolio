import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPointerFine, setIsPointerFine] = useState(true);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth physics springs for lagging follower ring
    const smoothX = useSpring(mouseX, { stiffness: 350, damping: 28, mass: 0.1 });
    const smoothY = useSpring(mouseY, { stiffness: 350, damping: 28, mass: 0.1 });

    // Offset transforms for centering
    const dotX = useTransform(mouseX, (x) => x - 8);
    const dotY = useTransform(mouseY, (y) => y - 8);
    const ringX = useTransform(smoothX, (x) => x - 16);
    const ringY = useTransform(smoothY, (y) => y - 16);

    useEffect(() => {
        // Only activate custom cursor on devices with fine pointer (mouse/trackpad)
        if (typeof window !== 'undefined') {
            const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
            setIsPointerFine(hasFinePointer);
            if (!hasFinePointer) return;
        }

        const updateMousePosition = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement | null;
            if (!target) return;

            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.getAttribute('role') === 'button'
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });
        window.addEventListener('mouseover', handleMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (!isPointerFine) return null;

    return (
        <>
            <style>
                {`
          @media (pointer: fine) {
            * {
              cursor: none !important;
            }
          }
        `}
            </style>
            {/* Center dot: snappy zero-latency tracking */}
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-text pointer-events-none z-[9999] rounded-none will-change-transform"
                style={{
                    x: dotX,
                    y: dotY,
                    scale: isHovering ? 0.5 : 1,
                }}
            />
            {/* Outer ring: smooth physics follower */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-text pointer-events-none z-[9998] rounded-none will-change-transform bg-transparent"
                style={{
                    x: ringX,
                    y: ringY,
                    scale: isHovering ? 1.6 : 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
