import { motion } from 'framer-motion';

const Background = () => {
    // Generate random shapes
    const shapes = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        type: i % 3 === 0 ? 'square' : i % 3 === 1 ? 'circle' : 'triangle',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 60 + 20,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
        rotation: Math.random() * 360,
    }));

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
                    className="absolute border-2 border-text/10"
                    style={{
                        left: `${shape.x}%`,
                        top: `${shape.y}%`,
                        width: shape.size,
                        height: shape.size,
                        borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'square' ? '0%' : '0%',
                        // For triangle, we'd need clip-path, but keeping it simple for now with just squares/circles or rotated squares
                        clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
                        border: shape.type === 'triangle' ? 'none' : undefined,
                        backgroundColor: shape.type === 'triangle' ? 'rgba(var(--color-text), 0.05)' : 'transparent',
                    }}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, 50, 0],
                        rotate: [shape.rotation, shape.rotation + 360],
                        scale: [1, 1.2, 1],
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
