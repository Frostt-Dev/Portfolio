import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Lenis from 'lenis';
import Background from './components/Background';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import AnimatedRoutes from './components/AnimatedRoutes';


const Footer = lazy(() => import('./components/Footer'));
import CustomCursor from './components/CustomCursor';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen text-primary">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const [lenis, setLenis] = useState<any>(null);

  useEffect(() => {
    // Disable browser manual scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    setLenis(lenisInstance);

    return () => {
      lenisInstance.destroy();
    };
  }, []);

  return (
    <div className="bg-main min-h-screen text-text cursor-none relative">
      <ScrollProgress />
      <CustomCursor />
      <Background />
      <BrowserRouter>
        <ScrollToTop lenis={lenis} />
        <div className="relative z-10">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main>
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatedRoutes />
            </Suspense>
          </main>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>

          {/* Fixed Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="fixed top-6 right-6 md:top-8 md:right-10 w-12 h-12 bg-accent border-2 border-black shadow-neo animate-bounce z-50 hidden md:flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            aria-label="Toggle Theme"
          >
            <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

