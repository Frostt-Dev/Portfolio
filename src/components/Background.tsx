import { useMemo } from 'react';
import { motion } from 'framer-motion';

const Background = () => {
    // Generate random shapes once - 16 lightweight shapes for optimal GPU rendering
    const shapes = useMemo(() => Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        type: i % 3 === 0 ? 'square' : i % 3 === 1 ? 'circle' : 'triangle',
        x: Math.random() * 95,
        y: Math.random() * 95,
        size: Math.random() * 45 + 20,
        duration: Math.random() * 15 + 12,
        delay: Math.random() * 3,
        rotation: Math.random() * 360,
    })), []);

    return (
        <div className="absolute inset-0 z-0 bg-main pointer-events-none overflow-hidden transition-colors duration-300 h-full">
            {/* Dot Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(var(--color-text) 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Floating Shapes */}
            {shapes.map((shape) => (
                <motion.div
                    key={shape.id}
                    className="absolute border-2 border-text/10 will-change-transform"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        width: shape.size,
                        height: shape.size,
                        borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '0%' : '0%',
                        clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                        border: shape.type === 'triangle' ? 'none' : undefined,
                        backgroundColor: shape.type === 'triangle' ? 'rgba(var(--color-text), 0.05)' : 'transparent',
                        transform: 'translateZ(0)',
                    }}
                    animate={{
                        y: [0, -70, 0],
                        x: [0, 35, 0],
                        rotate: [shape.rotation, shape.rotation + 360],
                    }}
                    transition={{
                        duration: shape.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: shape.delay,
                        repeatType: "mirror"
                    }}
                >
                    {/* Inner shape for triangle border effect since border doesn't work well with clip-path */}
                    {shape.type === 'triangle' && (
                        <div className="absolute inset-0 bg-text/10" style={{ clipPath: 'polygon(50% 10%, 10% 90%, 90% 90%)', backgroundColor: 'var(--color-main)' }}></div>
                    )}
                </motion.div>
            ))}
        </div>
    );
};

export default Background;
