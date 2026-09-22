import { motion } from 'framer-motion';
import { Code, Palette, Terminal, Globe, Sparkles, CheckCircle2, Award, Cpu, MapPin } from 'lucide-react';
import profileImg from '../assets/profile.jpg';
import resumePdf from '../assets/Resume.pdf';

const pillars = [
    {
        name: 'Full-Stack Engineering',
        icon: <Code size={22} />,
        description: 'Building robust, responsive applications with React, TypeScript, Node.js, and modern state architectures.',
    },
    {
        name: 'AI & RAG Intelligence',
        icon: <Cpu size={22} />,
        description: 'Engineering semantic search, AST code parsing, and streaming LLM pipelines with pgvector & Nemotron.',
    },
    {
        name: 'Interactive Data & 3D',
        icon: <Globe size={22} />,
        description: 'Developing high-performance interactive visualizations with D3.js, Canvas, and Three.js / WebGL.',
    },
    {
        name: 'Neo-Brutalist UI/UX',
        icon: <Palette size={22} />,
        description: 'Crafting memorable, tactile digital experiences with bold contrast, spring physics, and micro-interactions.',
    },
];

const telemetryStats = [
    {
        value: '4+',
        label: 'FLAGSHIP PROJECTS',
        sub: 'RAG, Sockets, Analytics',
        icon: <Award size={18} className="text-primary" />,
    },
    {
        value: 'AST + Vector',
        label: 'CODE INTELLIGENCE',
        sub: 'pgvector & Nemotron Ultra',
        icon: <Cpu size={18} className="text-primary" />,
    },
    {
        value: '100%',
        label: 'TYPE-SAFE CODE',
        sub: 'TypeScript & Python Type Hints',
        icon: <Terminal size={18} className="text-primary" />,
    },
    {
        value: 'Indore, India',
        label: 'LOCATION',
        sub: 'Open to Global Remote',
        icon: <MapPin size={18} className="text-primary" />,
    },
];

const About = () => {
    return (
        <section id="about" className="py-24 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-xs font-black uppercase tracking-widest border-2 border-black shadow-neo-sm mb-3">
                        <Sparkles size={14} className="text-black" /> BACKGROUND & VISION
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-text mb-4 uppercase tracking-tight">
                        About Me
                    </h2>
                    <div className="w-24 h-2 bg-black mx-auto mb-4" />
                    <p className="text-text/70 max-w-2xl mx-auto text-base md:text-lg font-medium">
                        Engineer at the intersection of production systems, artificial intelligence, and tactile frontend aesthetics.
                    </p>
                </motion.div>

                {/* Main Biography Row */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16">
                    {/* Photo with Brutalist Layering */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-5/12 flex justify-center"
                    >
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                            <div className="absolute inset-0 border-4 border-black bg-accent transform translate-x-4 translate-y-4 shadow-neo-lg" />
                            <img
                                src={profileImg}
                                alt="Krish Chourasia"
                                className="relative w-full h-full object-cover border-4 border-black z-10 bg-surface"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    {/* Bio Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-7/12 space-y-6"
                    >
                        <h3 className="text-2xl sm:text-4xl font-black text-text uppercase tracking-tight leading-tight">
                            Passionate Full-Stack Developer & <span className="bg-primary text-white px-2 inline-block border border-black shadow-neo-sm">AI Builder</span>
                        </h3>

                        <p className="text-text/80 text-base md:text-lg leading-relaxed font-medium">
                            I'm <strong className="text-text font-black">Krish Chourasia</strong>, an IT engineer and software developer who builds end-to-end web architectures. I bridge the gap between heavy-duty backend engineering (RAG pipelines, vector search, streaming APIs) and tactile frontend design.
                        </p>

                        <p className="text-text/80 text-base md:text-lg leading-relaxed font-medium">
                            From engineering <strong className="text-text font-bold">CodeRAG Studio</strong> with AST-aware code chunking and Nvidia Nemotron LLMs, to building women's safety platforms with real-time WebSockets and Power BI-style telemetry dashboards, I design systems that are both mathematically reliable and visually engaging.
                        </p>

                        <div className="pt-2 flex flex-wrap gap-4">
                            <a
                                href={resumePdf}
                                download="Krish_Chourasia_Resume.pdf"
                                className="px-6 py-3 bg-primary text-white font-black uppercase text-xs tracking-wider border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all inline-flex items-center gap-2"
                            >
                                Download Full Resume
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-3 bg-surface text-text font-black uppercase text-xs tracking-wider border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all inline-flex items-center gap-2"
                            >
                                Start A Conversation
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Telemetry & Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
                >
                    {telemetryStats.map((stat, i) => (
                        <div
                            key={i}
                            className="p-5 bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] font-black uppercase tracking-wider text-text/60">
                                    {stat.label}
                                </span>
                                {stat.icon}
                            </div>
                            <div className="text-2xl sm:text-3xl font-black text-text uppercase tracking-tight mb-1">
                                {stat.value}
                            </div>
                            <div className="text-xs font-bold text-text/70">
                                {stat.sub}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Core Focus Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            whileHover={{ y: -4 }}
                            className="bg-surface p-6 border-4 border-black shadow-neo hover:shadow-neo-lg transition-all flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 bg-secondary border-2 border-black flex items-center justify-center text-black mb-4 shadow-neo-sm">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-black text-text uppercase tracking-tight mb-2">
                                    {pillar.name}
                                </h3>
                                <p className="text-text/75 text-sm leading-relaxed font-medium">
                                    {pillar.description}
                                </p>
                            </div>
                            <div className="mt-4 pt-3 border-t border-black/15 flex items-center gap-1.5 text-xs font-bold text-primary">
                                <CheckCircle2 size={14} /> Production Ready
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
