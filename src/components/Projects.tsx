
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
    {
        title: 'E-Commerce Platform',
        description: 'A modern shopping experience built with Next.js and Stripe integration.',
        tags: ['React', 'Next.js', 'Stripe', 'Tailwind'],
        image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        github: 'https://github.com',
        demo: 'https://example.com',
    },
    {
        title: 'AI Dashboard',
        description: 'Analytics dashboard featuring real-time data visualization and AI insights.',
        tags: ['TypeScript', 'Recharts', 'OpenAI API'],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        github: 'https://github.com',
        demo: 'https://example.com',
    },
    {
        title: 'Social Media App',
        description: 'Full-featured social network with real-time messaging and notifications.',
        tags: ['React', 'Firebase', 'Redux'],
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        github: 'https://github.com',
        demo: 'https://example.com',
    },
];

import { useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ project, index }: { project: any, index: number }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set(clientX - left - width / 2);
        y.set(clientY - top - height / 2);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
    const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className="group relative bg-surface rounded-none border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all perspective-1000"
        >
            <div className="relative h-48 overflow-hidden border-b-2 border-black" style={{ transform: "translateZ(20px)" }}>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors z-10" />
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />
            </div>

            <div className="p-6" style={{ transform: "translateZ(30px)" }}>
                <h3 className="text-xl font-black text-text mb-2 uppercase">{project.title}</h3>
                <p className="text-text/80 text-sm mb-4 line-clamp-2 font-medium">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag: string) => (
                        <span key={tag} className="px-3 py-1 bg-accent text-black text-xs font-bold border border-black shadow-neo-sm">
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-text hover:text-primary transition-colors text-sm font-bold"
                    >
                        <Github size={16} className="mr-2" /> Code
                    </a>
                    <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-text hover:text-primary transition-colors text-sm font-bold"
                    >
                        Live Demo <ExternalLink size={16} className="ml-2" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-text mb-4 uppercase">Featured Projects</h2>
                    <div className="w-24 h-2 bg-black mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <TiltCard key={index} index={index} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
