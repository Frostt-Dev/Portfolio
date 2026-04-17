import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

const PageTransition = ({ children }: { children: ReactNode }) => {
    const columns = 10;
    
    return (
        <>
            {children}
            
            {/* Exit Animation: When leaving the page, rectangles slide UP from the bottom to cover the screen */}
            <div className="fixed inset-0 flex pointer-events-none z-[9999]">
              {[...Array(columns)].map((_, i) => (
                <motion.div
                  key={`exit-${i}`}
                  className="flex-1 h-full bg-[#0a0a0a]"
                  initial={{ y: "100%" }}
                  animate={{ y: "100%" }}
                  exit={{ y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.76, 0, 0.24, 1] }}
                />
              ))}
            </div>

            {/* Entry Animation: When new page mounts, rectangles slide UP to reveal the screen */}
            <div className="fixed inset-0 flex pointer-events-none z-[9999]">
              {[...Array(columns)].map((_, i) => (
                <motion.div
                  key={`enter-${i}`}
                  className="flex-1 h-full bg-[#0a0a0a]"
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.6, delay: i * 0.04, ease: [0.76, 0, 0.24, 1] }}
                />
              ))}
            </div>
        </>
    );
};

export default PageTransition;
