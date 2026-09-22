import { lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from '../pages/Home';

const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
