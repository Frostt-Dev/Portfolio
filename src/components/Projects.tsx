import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
    ArrowUpRight,
    Github,
    Sparkles,
    Eye,
    X,
    CheckCircle2,
    Code2,
    Layers,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "../data/projects";

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
                    willChange: "transform",
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

// Modal Component for Deep Project Details
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

                    {/* Image Preview */}
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
                        {project.highlights && project.highlights.length > 0 && (
                            <div className="bg-main border-2 border-black p-4 md:p-5 shadow-neo-sm">
                                <h4 className="text-xs font-black uppercase tracking-widest text-primary mb-3 flex items-center gap-2">
                                    <Sparkles size={14} /> Key Architecture Highlights
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

                        {/* Tech Stack Tags */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-text/60 mb-3 flex items-center gap-2">
                                <Code2 size={14} /> Technologies Used
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

                        {/* Modal Action Buttons */}
                        <div className="flex flex-wrap gap-4 pt-4 border-t-2 border-black">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                <Github size={18} /> View Repository
                            </a>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 bg-surface text-text font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                Close Preview
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

// 3D Parallax Project Card Component
const ProjectCard = ({
    project,
    index,
    onSelect,
}: {
    project: Project;
    index: number;
    onSelect: (p: Project) => void;
}) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            className="w-full"
        >
            <TiltCard
                maxTilt={12}
                className="group relative flex flex-col bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all duration-300 overflow-hidden"
            >
                {/* Browser Mockup Titlebar */}
                <div
                    style={{ transform: "translateZ(25px)" }}
                    className="flex items-center justify-between px-4 py-2.5 bg-main border-b-2 border-black select-none z-10"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-black" />
                        <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-black" />
                        <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-black" />
                    </div>
                    <div className="px-3 py-0.5 bg-surface border border-black/30 rounded text-[11px] font-mono text-text/70 truncate max-w-[170px]">
                        {project.domain || "project-view"}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-text/50">
                        {project.category}
                    </span>
                </div>

                {/* Image Container with 3D Depth & Hover Zoom */}
                <div
                    style={{ transform: "translateZ(30px)" }}
                    className="relative aspect-[16/10] overflow-hidden border-b-2 border-black bg-black/5 z-10"
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Glare Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 z-20">
                        <button
                            onClick={() => onSelect(project)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                            <Eye size={14} /> Quick View
                        </button>

                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                        >
                            <Github size={14} /> Source
                        </a>
                    </div>

                    {/* Category Pill popping forward */}
                    <div
                        style={{ transform: "translateZ(40px)" }}
                        className="absolute top-3 left-3 pointer-events-none z-20"
                    >
                        <span className="px-2.5 py-0.5 bg-primary text-white text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-neo-sm">
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Card Body with Parallax Depth */}
                <div
                    style={{ transform: "translateZ(35px)" }}
                    className="p-5 flex-1 flex flex-col justify-between z-10"
                >
                    <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-2xl font-black text-text uppercase tracking-tight group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`View ${project.title} source code`}
                                className="p-1.5 text-text/40 hover:text-primary transition-colors flex-shrink-0"
                            >
                                <ArrowUpRight size={20} />
                            </a>
                        </div>

                        <p className="text-text/70 text-sm font-medium leading-relaxed mb-4 line-clamp-2">
                            {project.shortDesc}
                        </p>

                        {/* Highlights Preview */}
                        {project.highlights && project.highlights.length > 0 && (
                            <div className="mb-4 space-y-1">
                                {project.highlights.slice(0, 2).map((h, i) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs font-semibold text-text/80">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                                        <span className="truncate">{h}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Bottom Tech Tags and Action Bar */}
                    <div
                        style={{ transform: "translateZ(45px)" }}
                        className="pt-3 border-t border-black/15"
                    >
                        <div className="flex flex-wrap gap-1.5 mb-4">
                            {project.tech.slice(0, 3).map((t) => (
                                <span
                                    key={t}
                                    className="px-2 py-0.5 bg-secondary/20 border border-black text-black text-[11px] font-bold"
                                >
                                    {t}
                                </span>
                            ))}
                            {project.tech.length > 3 && (
                                <span className="px-1.5 py-0.5 bg-secondary/20 border border-black text-black text-[11px] font-bold">
                                    +{project.tech.length - 3}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between gap-2">
                            <button
                                onClick={() => onSelect(project)}
                                className="text-xs font-black uppercase tracking-wider text-text/80 hover:text-primary flex items-center gap-1 transition-colors"
                            >
                                Details <ArrowUpRight size={14} />
                            </button>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-black uppercase tracking-wider text-text/80 hover:text-primary flex items-center gap-1 transition-colors"
                            >
                                <Github size={14} /> Code
                            </a>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
};

// Flagship Featured Project Banner with 3D Depth
const FeaturedProjectHero = ({
    project,
    onSelect,
}: {
    project: Project;
    onSelect: (p: Project) => void;
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 w-full"
        >
            <TiltCard
                maxTilt={6}
                className="group relative bg-surface border-4 border-black shadow-neo-lg hover:shadow-neo transition-all duration-300 overflow-hidden"
            >
                {/* Top Browser Bar */}
                <div
                    style={{ transform: "translateZ(20px)" }}
                    className="flex items-center justify-between px-4 md:px-6 py-3 bg-main border-b-2 border-black z-10 relative"
                >
                    <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black" />
                        <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black" />
                        <span className="ml-3 hidden sm:inline-block text-xs font-mono font-bold text-text/60">
                            {project.domain || "coderag.ai"}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                        </span>
                        <span className="px-3 py-1 bg-accent border-2 border-black text-black text-xs font-black uppercase tracking-widest shadow-neo-sm">
                            ⭐ FLAGSHIP PROJECT
                        </span>
                    </div>
                </div>

                {/* Split layout: Visual on left/top, technical specs on right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
                    {/* Visual Preview with 3D Pop */}
                    <div
                        style={{ transform: "translateZ(25px)" }}
                        className="lg:col-span-7 relative overflow-hidden bg-black/5 border-b-2 lg:border-b-0 lg:border-r-2 border-black min-h-[300px] md:min-h-[380px]"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                            <button
                                onClick={() => onSelect(project)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                            >
                                <Eye size={16} /> Expand Architecture Preview
                            </button>
                        </div>
                    </div>

                    {/* Technical Overview with 3D Elevation */}
                    <div
                        style={{ transform: "translateZ(35px)" }}
                        className="lg:col-span-5 p-6 md:p-8 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2.5 py-0.5 bg-primary text-white text-xs font-black uppercase tracking-wider border-2 border-black shadow-neo-sm">
                                    {project.category}
                                </span>
                                <span className="text-xs font-bold text-text/50 uppercase tracking-wider">
                                    Enterprise AI
                                </span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-black text-text uppercase tracking-tight mb-3 group-hover:text-primary transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-text/75 font-medium leading-relaxed mb-6 text-sm md:text-base">
                                {project.description}
                            </p>

                            {/* Highlights List */}
                            {project.highlights && (
                                <div className="space-y-2 mb-6">
                                    {project.highlights.slice(0, 3).map((h, i) => (
                                        <div key={i} className="flex items-start gap-2 text-xs md:text-sm font-semibold text-text">
                                            <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Tech Pills */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tech.map((t) => (
                                    <span
                                        key={t}
                                        className="px-2.5 py-1 bg-secondary/20 border-2 border-black text-black text-xs font-bold shadow-neo-sm"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Action CTA with highest 3D elevation */}
                        <div
                            style={{ transform: "translateZ(45px)" }}
                            className="flex flex-wrap gap-3 pt-4 border-t-2 border-black/15"
                        >
                            <button
                                onClick={() => onSelect(project)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black font-black text-xs md:text-sm uppercase tracking-wider border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                <Eye size={16} /> Quick View
                            </button>
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-black text-xs md:text-sm uppercase tracking-wider border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                <Github size={16} /> View Code
                            </a>
                        </div>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
};

// Main Section Component
const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [modalProject, setModalProject] = useState<Project | null>(null);

    const categories = ["All", "AI / Backend", "Full Stack", "Frontend"];

    const filteredProjects =
        selectedCategory === "All"
            ? projects
            : projects.filter((p) => p.category === selectedCategory);

    const featuredProject = projects.find((p) => p.featured) || projects[0];
    const gridProjects =
        selectedCategory === "All"
            ? filteredProjects.filter((p) => p.id !== featuredProject.id)
            : filteredProjects;

    return (
        <section id="projects" className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6"
                >
                    <div>
                        <div className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm mb-3">
                            <Sparkles size={14} className="text-black" /> SELECTED WORKS
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-text uppercase tracking-tight leading-none">
                            FEATURED PROJECTS
                        </h2>
                        <p className="mt-3 text-text/70 max-w-xl font-medium text-sm md:text-base">
                            Interactive 3D showcases with real-time cursor parallax, architecture deep dives, and production codebases.
                        </p>
                    </div>

                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-xs md:text-sm font-black uppercase tracking-widest text-text hover:text-primary transition-colors border-2 border-black bg-surface px-4 py-2 shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none self-start md:self-end"
                    >
                        View All Projects <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

                {/* Filter Navigation Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b-2 border-black"
                >
                    <span className="text-xs font-black uppercase tracking-widest text-text/50 mr-2 flex items-center gap-1">
                        <Layers size={14} /> Filter:
                    </span>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`relative px-4 py-1.5 text-xs font-black uppercase tracking-wider border-2 border-black transition-all ${
                                selectedCategory === cat
                                    ? "bg-primary text-white shadow-neo-sm"
                                    : "bg-surface text-text hover:bg-main shadow-none"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Featured Project Showcase with 3D Tilt */}
                {selectedCategory === "All" && (
                    <FeaturedProjectHero
                        project={featuredProject}
                        onSelect={(p) => setModalProject(p)}
                    />
                )}

                {/* Grid of 3D Tilt Cards */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {gridProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id || project.title}
                                project={project}
                                index={index}
                                onSelect={(p) => setModalProject(p)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Bottom CTA Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-14 p-8 bg-surface border-4 border-black shadow-neo flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div>
                        <h3 className="text-2xl font-black uppercase text-text tracking-tight mb-1">
                            Interested in more technical deep dives?
                        </h3>
                        <p className="text-text/70 font-medium text-sm">
                            Explore full codebases, architecture diagrams, and commit histories on GitHub.
                        </p>
                    </div>

                    <div className="flex gap-4 flex-wrap">
                        <Link
                            to="/projects"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-xs md:text-sm"
                        >
                            All Projects Page <ArrowUpRight size={16} />
                        </Link>
                        <a
                            href="https://github.com/Frostt-Dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-black font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all text-xs md:text-sm"
                        >
                            <Github size={16} /> GitHub Profile
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Quick View Modal */}
            {modalProject && (
                <ProjectModal
                    project={modalProject}
                    onClose={() => setModalProject(null)}
                />
            )}
        </section>
    );
};

export default Projects;
