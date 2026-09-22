import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Layout,
    Server,
    Terminal,
    Database,
    Globe,
    Cpu,
    Code,
    Cloud,
    Layers,
    GitBranch,
    Command,
    Sparkles,
} from 'lucide-react';

interface SkillItem {
    name: string;
    icon: React.ReactNode;
    category: 'Frontend' | 'Backend & AI' | 'Languages' | 'Cloud & Tools';
    tag: string;
}

const skills: SkillItem[] = [
    { name: "Python", icon: <Terminal size={22} />, category: "Languages", tag: "AI / Backend" },
    { name: "TypeScript", icon: <Code size={22} />, category: "Languages", tag: "Frontend / Node" },
    { name: "React", icon: <Code size={22} />, category: "Frontend", tag: "SPA & Full Stack" },
    { name: "FastAPI", icon: <Server size={22} />, category: "Backend & AI", tag: "REST & Streaming" },
    { name: "pgvector", icon: <Database size={22} />, category: "Backend & AI", tag: "Vector Embeddings" },
    { name: "PostgreSQL", icon: <Database size={22} />, category: "Cloud & Tools", tag: "Relational DB" },
    { name: "Node.js", icon: <Server size={22} />, category: "Backend & AI", tag: "Runtime" },
    { name: "Tailwind CSS", icon: <Layout size={22} />, category: "Frontend", tag: "Design Systems" },
    { name: "D3.js", icon: <Layers size={22} />, category: "Frontend", tag: "Data Visualizations" },
    { name: "Three.js", icon: <Globe size={22} />, category: "Frontend", tag: "3D & WebGL" },
    { name: "Next.js", icon: <Cpu size={22} />, category: "Frontend", tag: "Full Stack SSR" },
    { name: "Socket.io", icon: <Cloud size={22} />, category: "Backend & AI", tag: "Real-time Sockets" },
    { name: "MongoDB", icon: <Database size={22} />, category: "Cloud & Tools", tag: "Document DB" },
    { name: "Git", icon: <GitBranch size={22} />, category: "Cloud & Tools", tag: "VCS & Workflows" },
    { name: "Docker", icon: <Command size={22} />, category: "Cloud & Tools", tag: "Containerization" },
    { name: "C / C++", icon: <Cpu size={22} />, category: "Languages", tag: "Systems / DSA" },
];

const marqueeItems = [
    "PYTHON",
    "FASTAPI",
    "REACT",
    "POSTGRESQL",
    "PGVECTOR",
    "TYPESCRIPT",
    "TAILWIND CSS",
    "D3.JS",
    "SOCKET.IO",
    "NODE.JS",
    "THREE.JS",
    "NEXT.JS",
    "DOCKER",
    "GIT",
];

const categories = ["All", "Frontend", "Backend & AI", "Languages", "Cloud & Tools"];

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills =
        activeCategory === "All"
            ? skills
            : skills.filter((s) => s.category === activeCategory);

    return (
        <section id="skills" className="py-24 bg-transparent relative overflow-hidden">
            {/* Infinite Horizontal Marquee Ticker Tape */}
            <div className="w-full bg-accent border-y-4 border-black py-3 mb-20 overflow-hidden shadow-neo-sm rotate-[-1deg] scale-105">
                <motion.div
                    className="flex whitespace-nowrap gap-8 text-black font-black text-sm tracking-widest uppercase select-none"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        duration: 18,
                        ease: "linear",
                    }}
                >
                    {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
                        <div key={index} className="inline-flex items-center gap-4">
                            <span>{item}</span>
                            <span className="w-2 h-2 rounded-full bg-black" />
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm mb-3">
                        <Sparkles size={14} className="text-black" /> TECH STACK & TOOLS
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-text mb-4 tracking-tight uppercase">
                        SKILLS & CAPABILITIES
                    </h2>
                    <div className="w-24 h-2 bg-black mx-auto mb-4" />
                    <p className="text-text/70 max-w-2xl mx-auto text-base md:text-lg font-medium">
                        Production technologies I utilize to build high-performance distributed systems, AI applications, and frontend interfaces.
                    </p>
                </motion.div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 py-2 text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
                                activeCategory === cat
                                    ? "bg-primary text-white shadow-neo-sm -translate-y-0.5"
                                    : "bg-surface text-text hover:bg-main shadow-none"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Animated Skills Grid */}
                <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
                    <AnimatePresence mode="popLayout">
                        {filteredSkills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                layout
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.85 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                whileHover={{ y: -4, transition: { duration: 0.15 } }}
                                className="group p-5 bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all flex flex-col justify-between cursor-default"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-main border-2 border-black flex items-center justify-center text-text group-hover:bg-primary group-hover:text-white transition-colors shadow-neo-sm">
                                            {skill.icon}
                                        </div>
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-text/50">
                                            {skill.category}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-text uppercase tracking-tight group-hover:text-primary transition-colors">
                                        {skill.name}
                                    </h3>
                                </div>

                                <div className="mt-4 pt-3 border-t border-black/15">
                                    <span className="text-[11px] font-bold text-text/70">
                                        {skill.tag}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Skills;
