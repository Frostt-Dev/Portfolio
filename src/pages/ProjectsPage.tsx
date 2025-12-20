import { motion } from 'framer-motion';
import { Github, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import safeGuardImg from '../assets/projects/safeGuard.png';
import ecommerceImg from '../assets/projects/ecommerce.png';

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive dashboard for managing online stores. Features include real-time sales tracking, inventory management, and customer analytics.",
        tech: ["React", "Tailwind CSS", "Recharts", "Node.js"],
        image: ecommerceImg,
        github: "https://github.com/Frostt-Dev",
        live: "https://example.com"
    },
    {
        title: "SafeGuard",
        description: "A comprehensive safety platform featuring Fake Call, SOS, Quick Alerts, Live Location Tracking, and a Community Board. Also provides emergency contacts, self-defense videos, and safety guides.",
        tech: ["React", "Google Maps API", "Socket.io", "Node.js", "Express"],
        image: safeGuardImg,
        github: "https://github.com/Frostt-Dev",
        live: "https://example.com"
    },
    {
        title: "Social Media App",
        description: "A full-stack social media platform with real-time messaging, post sharing, and user profiles. Built with a focus on performance and scalability.",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Socket.io"],
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
        github: "https://github.com/Frostt-Dev",
        live: "https://example.com"
    },
    {
        title: "Task Management Tool",
        description: "A productivity app for managing tasks and projects. features drag-and-drop interface, team collaboration tools, and progress tracking.",
        tech: ["Vue.js", "Firebase", "Vuex"],
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
        github: "https://github.com/Frostt-Dev",
        live: "https://example.com"
    }
];

const ProjectsPage = () => {
    return (
        <PageTransition>
            <section className="pt-32 pb-20 px-6 min-h-screen">
                <div className="container mx-auto max-w-6xl">
                    <div className="mb-12">
                        <Link to="/" className="inline-flex items-center text-text hover:text-primary transition-colors mb-6 font-bold uppercase tracking-wide">
                            <ArrowLeft size={20} className="mr-2" /> Back to Home
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black text-text mb-6 uppercase"
                        >
                            My Projects
                        </motion.h1>
                        <p className="text-text/70 text-lg max-w-2xl font-medium">
                            A detailed collection of my work, ranging from web applications to experimental designs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-16">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-surface border-2 border-black shadow-neo p-0 overflow-hidden flex flex-col md:flex-row"
                            >
                                <div className="w-full md:w-1/2 overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-black">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-64 md:h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="w-full md:w-1/2 p-8 flex flex-col justify-between">
                                    <div>
                                        <h2 className="text-3xl font-black text-text mb-4 uppercase">{project.title}</h2>
                                        <p className="text-text/80 mb-6 font-medium leading-relaxed">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {project.tech.map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-secondary border-2 border-black text-black text-sm font-bold shadow-neo-sm">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-text font-bold hover:text-primary transition-colors"
                                        >
                                            <Github size={20} /> Code
                                        </a>

                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </PageTransition>
    );
};

export default ProjectsPage;
