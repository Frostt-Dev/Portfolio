import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ lenis }: { lenis: any }) => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Wait for PageTransition (500ms) to complete + small buffer
            // This prevents scrolling on a partially rendered layout
            setTimeout(() => {
                const targetId = hash.replace('#', '');

                const attemptScroll = (retryCount = 0) => {
                    const element = document.getElementById(targetId);

                    if (element) {
                        // Force Lenis to recalculate page height before scrolling
                        if (lenis) lenis.resize();

                        // Element found, smooth scroll to it
                        if (lenis) {
                            lenis.scrollTo(element, { offset: 0, duration: 1.5 });
                        } else {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    } else if (retryCount < 20) {
                        // Not found yet, retry in 100ms (up to 2s total buffer)
                        setTimeout(() => attemptScroll(retryCount + 1), 100);
                    }
                };

                attemptScroll();
            }, 600); // 600ms delay > 500ms transition
        } else {
            // Page change without hash: instant scroll to top
            if (lenis) {
                lenis.scrollTo(0, { immediate: true });
            } else {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, hash, lenis]);

    return null;
};

export default ScrollToTop;
