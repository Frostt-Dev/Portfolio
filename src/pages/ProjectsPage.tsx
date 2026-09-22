import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { projects } from "../data/projects";

const ProjectsPage = () => {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const goTo = (idx: number) => {
        setDirection(idx > active ? 1 : -1);
        setActive(idx);
    };

    const prev = () => { if (active > 0) goTo(active - 1); };
    const next = () => { if (active < projects.length - 1) goTo(active + 1); };

    // Keyboard navigation
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [active]);

    const project = projects[active];

    const variants = {
        enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
        center: { opacity: 1, x: 0 },
        exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-main overflow-hidden" ref={containerRef}>
                {/* Top bar */}
                <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12 pt-6">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-text font-bold uppercase tracking-wide hover:text-primary transition-colors bg-main/80 backdrop-blur-sm border-2 border-black px-4 py-2 shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        <ArrowLeft size={16} /> Back
                    </Link>

                    <div className="flex items-center gap-3 bg-main/80 backdrop-blur-sm border-2 border-black px-4 py-2 shadow-neo-sm">
                        <span className="text-xs font-bold uppercase tracking-widest text-text/50">Project</span>
                        <span className="text-sm font-black text-text">
                            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>

                {/* Main showcase */}
                <div className="flex-1 flex flex-col md:flex-row pt-24 md:pt-0">
                    {/* Image panel */}
                    <div className="relative w-full md:w-1/2 h-64 md:h-screen overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black flex-shrink-0">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.img
                                key={active}
                                src={project.image}
                                alt={project.title}
                                custom={direction}
                                variants={{
                                    enter: (dir: number) => ({ opacity: 0, scale: 1.05, x: dir > 0 ? 40 : -40 }),
                                    center: { opacity: 1, scale: 1, x: 0 },
                                    exit: (dir: number) => ({ opacity: 0, scale: 0.98, x: dir > 0 ? -40 : 40 }),
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>

                        {/* Category badge on image */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm">
                                {project.category}
                            </span>
                        </div>

                        {/* Big project number watermark */}
                        <div className="absolute bottom-4 right-4 z-10 select-none pointer-events-none">
                            <span className="text-8xl md:text-9xl font-black text-white/10 leading-none">
                                {String(active + 1).padStart(2, "0")}
                            </span>
                        </div>
                    </div>

                    {/* Content panel */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0 md:min-h-screen">
                        <AnimatePresence custom={direction} mode="wait">
                            <motion.div
                                key={active}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                                className="max-w-xl"
                            >
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-4">
                                    {String(active + 1).padStart(2, "0")} — Featured Project
                                </p>

                                <h1 className="text-4xl md:text-6xl font-black text-text uppercase leading-none mb-6 tracking-tight">
                                    {project.title}
                                </h1>

                                <p className="text-text/70 font-medium leading-relaxed mb-8 text-base md:text-lg">
                                    {project.description}
                                </p>

                                {/* Tech stack */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {project.tech.map((t) => (
                                        <span
                                            key={t}
                                            className="px-3 py-1.5 bg-secondary border-2 border-black text-black text-sm font-bold shadow-neo-sm"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-4 flex-wrap">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                                    >
                                        <Github size={18} /> View Code
                                    </a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Navigation controls */}
                <div className="fixed bottom-8 left-0 right-0 z-30 flex items-center justify-center gap-6 px-6">
                    {/* Prev */}
                    <button
                        onClick={prev}
                        disabled={active === 0}
                        className="p-3 border-2 border-black bg-main shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous project"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    {/* Dot indicators */}
                    <div className="flex items-center gap-2">
                        {projects.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => goTo(i)}
                                aria-label={`Go to project ${i + 1}`}
                                className={`transition-all duration-300 border-2 border-black ${
                                    i === active
                                        ? "w-8 h-3 bg-primary"
                                        : "w-3 h-3 bg-surface hover:bg-secondary"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Next */}
                    <button
                        onClick={next}
                        disabled={active === projects.length - 1}
                        className="p-3 border-2 border-black bg-main shadow-neo-sm hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next project"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProjectsPage;
