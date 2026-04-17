import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Simulate loading progress with easing
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    const duration = 2800; // Duration to reach 100%

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const linearProgress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(linearProgress);
      const currentProgress = Math.floor(easedProgress * 100);

      setProgress(currentProgress);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        // Brief pause at 100% before triggering exit
        setTimeout(() => {
          setIsExiting(true);
        }, 400); 
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  const handleExitComplete = useCallback(() => {
    onLoadingComplete();
  }, [onLoadingComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999]"
          // Empty exit prop ensures Framer Motion waits for all children's exit animations
          exit={{}} 
        >
          {/* Columns (Rectangle by Rectangle Curtain) */}
          <div className="fixed inset-0 flex pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="flex-1 h-full bg-[#0a0a0a]"
                initial={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + i * 0.05, // Wait for content to fade, then stagger
                  ease: [0.76, 0, 0.24, 1] 
                }}
              />
            ))}
          </div>

          {/* Content (Logo, Text, Progress) */}
          <motion.div
            className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-10 pointer-events-none"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Top Bar */}
            <div className="flex justify-end">
              <span className="font-sans text-xs sm:text-sm tracking-[0.25em] text-white/40 uppercase">
                Developer & Designer
              </span>
            </div>

            {/* Center Loading Logo */}
            <div className="flex flex-col items-center justify-center space-y-8">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -15 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                className="relative"
              >
                {/* Glowing outline effect around the logo for premium feel */}
                <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-full transform scale-110" />
                <img 
                  src="/favicon.svg" 
                  alt="Portfolio Logo" 
                  className="w-24 h-24 sm:w-32 sm:h-32 shadow-neo-lg bg-black relative z-10" 
                />
              </motion.div>
              
              <motion.div 
                className="w-16 h-1 bg-primary rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>

            {/* Bottom Progress Bar */}
            <div className="flex flex-col gap-4">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: 'linear' }}
                />
              </div>
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-[0.7rem] sm:text-xs tracking-[0.2em] text-white/40 uppercase">
                  Loading Portfolio
                </span>
                <span className="font-mono text-4xl sm:text-6xl font-black text-white tabular-nums tracking-tighter">
                  {progress.toString().padStart(3, '0')}
                  <span className="text-primary text-xl sm:text-2xl align-super ml-1">%</span>
                </span>
              </div>
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
