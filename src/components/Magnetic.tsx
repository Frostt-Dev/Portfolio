import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import type { MouseEvent, ReactNode } from 'react';

const Magnetic = ({ children }: { children: ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);

        // Move element slightly towards the mouse (magnetic effect)
        mouseX.set(middleX * 0.3);
        mouseY.set(middleY * 0.3);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="inline-block"
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
