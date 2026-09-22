import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    ArrowLeft,
    ArrowUpRight,
    Github,
    Sparkles,
    Eye,
    X,
    CheckCircle2,
    Code2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/projects";
import PageTransition from "../components/PageTransition";

// Interactive 3D Tilt Wrapper with Spotlight Sheen
const TiltCard = ({
    children,
    className = "",
    maxTilt = 10,
}: {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 260, damping: 22 });
    const mouseYSpring = useSpring(y, { stiffness: 260, damping: 22 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxTilt}deg`, `-${maxTilt}deg`]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxTilt}deg`, `${maxTilt}deg`]);

    const spotlightX = useMotionValue(0);
    const spotlightY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);

        spotlightX.set(mouseX);
        spotlightY.set(mouseY);
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    const spotlightBg = useTransform(
        [spotlightX, spotlightY],
        ([posX, posY]) =>
            `radial-gradient(550px circle at ${posX}px ${posY}px, rgba(255, 107, 107, 0.16), transparent 70%)`
    );

    return (
        <div style={{ perspective: "1200px" }} className="w-full">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative transition-shadow duration-300 ${className}`}
            >
                {/* Dynamic Cursor Spotlight Sheen */}
                <motion.div
                    className="pointer-events-none absolute -inset-0.5 z-30 transition-opacity duration-300"
                    style={{
                        opacity: isHovered ? 1 : 0,
                        background: spotlightBg,
                    }}
                />
                {children}
            </motion.div>
        </div>
    );
};

// Quick View Modal
const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
    useEffect(() => {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, []);

    return (
        <AnimatePresence>
            <div
                data-lenis-prevent="true"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-sm"
            >
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0"
                />

                <motion.div
                    data-lenis-prevent="true"
                    onWheel={(e) => e.stopPropagation()}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto overscroll-contain bg-surface border-4 border-black shadow-neo-lg z-10 p-6 md:p-8 text-text"
                >
                    {/* Header Bar */}
                    <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black inline-block" />
                            <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black inline-block" />
                            <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black inline-block" />
                            <span className="ml-3 text-xs font-mono font-bold uppercase tracking-wider text-text/60">
                                {project.domain || "project-preview"}
                            </span>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-1.5 border-2 border-black bg-accent hover:bg-primary hover:text-white transition-colors shadow-neo-sm hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-60 md:h-80 border-2 border-black overflow-hidden mb-6 bg-black/5">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-primary text-white text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm">
                                {project.category}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-text mb-2">
                                {project.title}
                            </h3>
                            <p className="text-base md:text-lg font-medium text-text/80 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Engineering Highlights */}
                        {project.highlights && (
                            <div className="bg-main border-2 border-black p-4 md:p-5 shadow-neo-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <Sparkles size={14} /> Architecture Highlights
                                </h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                                    {project.highlights.map((h, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm font-medium text-text">
                                            <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Stats Strip */}
                        {project.stats && (
                            <div className="grid grid-cols-3 gap-3">
                                {project.stats.map((stat, i) => (
                                    <div
                                        key={i}
                                        className="border-2 border-black p-3 bg-secondary/15 text-center shadow-neo-sm"
                                    >
                                        <div className="text-lg md:text-xl font-black text-text">
                                            {stat.value}
                                        </div>
                                        <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-text/60">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-text/60 mb-3 flex items-center gap-2">
                                <Code2 size={14} /> Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-3 py-1 bg-surface border-2 border-black text-text text-xs font-bold shadow-neo-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-black">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                <Github size={18} /> View Code on GitHub
                            </a>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-surface text-text font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

const ProjectsPage = () => {
    const [modalProject, setModalProject] = useState<Project | null>(null);

    return (
        <PageTransition>
            <div className="min-h-screen bg-main text-text relative pb-24">
                {/* Sticky Top Navbar */}
                <div className="sticky top-0 z-30 bg-main/90 backdrop-blur-md border-b-2 border-black px-6 py-4">
                    <div className="container mx-auto max-w-6xl flex items-center justify-between">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-text hover:text-primary transition-colors border-2 border-black bg-surface px-4 py-2 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                        >
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                    </div>
                </div>

                <div className="container mx-auto px-6 max-w-6xl pt-12">
                    {/* Header Banner */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <div className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm mb-4">
                            <Sparkles size={14} className="text-black" /> WORK ARCHIVE
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black text-text uppercase tracking-tight leading-none mb-4">
                            PROJECTS & LABS
                        </h1>
                        <p className="text-text/75 font-medium text-base md:text-lg max-w-2xl">
                            A showcase of engineered systems, AI code intelligence engines, real-time safety platforms, and high-performance interactive interfaces.
                        </p>
                    </motion.div>

                    {/* Projects Grid with 3D Tilt */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id || project.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="w-full"
                            >
                                <TiltCard
                                    maxTilt={10}
                                    className="group flex flex-col bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all duration-300 overflow-hidden"
                                >
                                    {/* Browser Chrome Header */}
                                    <div
                                        style={{ transform: "translateZ(20px)" }}
                                        className="flex items-center justify-between px-4 py-2.5 bg-main border-b-2 border-black select-none z-10"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black" />
                                            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black" />
                                            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black" />
                                            <span className="ml-2 text-xs font-mono font-bold text-text/60">
                                                {project.domain || "preview"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {project.featured && (
                                                <span className="px-2 py-0.5 bg-accent border border-black text-[10px] font-black uppercase">
                                                    FEATURED
                                                </span>
                                            )}
                                            <span className="px-2 py-0.5 bg-primary text-white border border-black text-[10px] font-black uppercase">
                                                {project.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Image with 3D depth & hover overlay */}
                                    <div
                                        style={{ transform: "translateZ(25px)" }}
                                        className="relative aspect-[16/9] overflow-hidden border-b-2 border-black bg-black/5 z-10"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-20">
                                            <button
                                                onClick={() => setModalProject(project)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-accent text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                                            >
                                                <Eye size={14} /> Architecture Details
                                            </button>

                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                                            >
                                                <Github size={14} /> GitHub Code
                                            </a>
                                        </div>
                                    </div>

                                    {/* Card Content with 3D Elevation */}
                                    <div
                                        style={{ transform: "translateZ(35px)" }}
                                        className="p-6 flex-1 flex flex-col justify-between z-10"
                                    >
                                        <div>
                                            <div className="flex items-start justify-between gap-3 mb-2">
                                                <h3 className="text-2xl md:text-3xl font-black text-text uppercase tracking-tight group-hover:text-primary transition-colors">
                                                    {project.title}
                                                </h3>
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`View ${project.title} source`}
                                                    className="text-text/40 hover:text-primary p-1 transition-colors"
                                                >
                                                    <ArrowUpRight size={22} />
                                                </a>
                                            </div>

                                            <p className="text-text/75 font-medium leading-relaxed mb-4 text-sm md:text-base">
                                                {project.description}
                                            </p>

                                            {/* Key Highlights */}
                                            {project.highlights && (
                                                <div className="space-y-1.5 mb-5 bg-main/60 p-3 border border-black/15">
                                                    {project.highlights.slice(0, 3).map((h, i) => (
                                                        <div
                                                            key={i}
                                                            className="flex items-start gap-2 text-xs font-semibold text-text"
                                                        >
                                                            <CheckCircle2
                                                                size={14}
                                                                className="text-primary flex-shrink-0 mt-0.5"
                                                            />
                                                            <span className="line-clamp-1">{h}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Stack & CTA with highest 3D elevation */}
                                        <div
                                            style={{ transform: "translateZ(45px)" }}
                                            className="pt-4 border-t-2 border-black/15"
                                        >
                                            {/* Tech badges */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2.5 py-0.5 bg-secondary/20 border border-black text-black text-xs font-bold"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => setModalProject(project)}
                                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-accent text-black font-black uppercase text-xs tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                                                >
                                                    <Eye size={14} /> Quick View
                                                </button>
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-black uppercase text-xs tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all"
                                                >
                                                    <Github size={14} /> View Code
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Deep Dive Modal */}
                {modalProject && (
                    <ProjectModal
                        project={modalProject}
                        onClose={() => setModalProject(null)}
                    />
                )}
            </div>
        </PageTransition>
    );
};

export default ProjectsPage;
