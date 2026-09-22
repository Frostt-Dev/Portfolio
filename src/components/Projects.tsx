import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectRow = ({ project, index }: { project: typeof projects[0]; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative border-b-2 border-black last:border-b-0"
        >
            <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col md:flex-row items-start md:items-center gap-4 py-8 px-2 md:px-4 cursor-pointer transition-all duration-300 hover:bg-primary/5"
            >
                <span className="text-5xl md:text-6xl font-black text-black/10 group-hover:text-primary/30 transition-colors duration-300 w-20 flex-shrink-0 leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                </span>

                <div className="hidden md:block w-24 h-16 flex-shrink-0 overflow-hidden border-2 border-black opacity-0 group-hover:opacity-100 transition-all duration-500 scale-90 group-hover:scale-100 shadow-neo-sm">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="text-2xl md:text-3xl font-black text-text uppercase tracking-tight group-hover:text-primary transition-colors duration-200">
                            {project.title}
                        </h3>
                        <span className="text-xs font-bold uppercase tracking-widest text-text/40 border border-black/20 px-2 py-0.5">
                            {project.category}
                        </span>
                    </div>
                    <p className="text-text/60 font-medium text-sm md:text-base line-clamp-1">
                        {project.shortDesc}
                    </p>
                </div>

                <div className="hidden lg:flex flex-wrap gap-1.5 max-w-xs justify-end">
                    {project.tech.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-secondary border border-black text-black text-xs font-bold">
                            {t}
                        </span>
                    ))}
                    {project.tech.length > 3 && (
                        <span className="px-2 py-0.5 bg-secondary border border-black text-black text-xs font-bold">
                            +{project.tech.length - 3}
                        </span>
                    )}
                </div>

                <ArrowUpRight
                    size={28}
                    className="flex-shrink-0 text-text/30 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-200"
                />
            </a>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-transparent">
            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
                >
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Selected Work</p>
                        <h2 className="text-4xl md:text-6xl font-black text-text uppercase leading-none">Projects</h2>
                    </div>
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-text hover:text-primary transition-colors border-b-2 border-black hover:border-primary pb-1 self-start md:self-end"
                    >
                        View All <ArrowUpRight size={16} />
                    </Link>
                </motion.div>

                <div className="w-full h-0.5 bg-black mb-0" />

                <div>
                    {projects.map((project, index) => (
                        <ProjectRow key={project.title} project={project} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12 flex flex-col sm:flex-row gap-4"
                >
                    <Link
                        to="/projects"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                    >
                        See All Projects <ArrowUpRight size={18} />
                    </Link>
                    <a
                        href="https://github.com/Frostt-Dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-surface text-text font-black uppercase tracking-wide border-2 border-black shadow-neo hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                    >
                        <Github size={18} /> GitHub Profile
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
