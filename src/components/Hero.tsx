import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, Cpu, Sparkles, ArrowDownRight, Terminal } from 'lucide-react';
import heroProfileImg from '../assets/profile-hero.jpg';
import resumePdf from '../assets/Resume.pdf';

const ROLES = [
    "Full-Stack Developer",
    "AI & RAG Systems Builder",
    "Interactive UI Engineer",
    "Creative Web Technologist",
];

const Hero = () => {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section
            id="home"
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent pt-24 pb-16"
        >
            <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between z-10 gap-12">
                {/* Text Content */}
                <div className="w-full lg:w-7/12 text-center lg:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Availability Pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-main border-2 border-black shadow-neo-sm text-xs font-black uppercase tracking-wider mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                            </span>
                            <span>AVAILABLE FOR NEW ROLES & CONTRACTS</span>
                        </div>

                        <div>
                            <h2 className="text-text font-black tracking-widest text-xs uppercase mb-3 bg-accent inline-block px-2.5 py-1 border-2 border-black shadow-neo-sm">
                                HELLO, I'M
                            </h2>
                        </div>

                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-text mb-4 leading-none tracking-tighter">
                            Krish <br className="hidden sm:inline" /> Chourasia
                        </h1>

                        {/* Animated Role Ticker */}
                        <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start mb-6 overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={roleIndex}
                                    initial={{ y: 24, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -24, opacity: 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                    className="inline-flex items-center gap-2 text-primary font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight"
                                >
                                    <Terminal size={22} className="text-black flex-shrink-0" />
                                    <span>{ROLES[roleIndex]}</span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <p className="text-text/80 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 font-medium leading-relaxed">
                            I engineer scalable full-stack applications, enterprise RAG intelligence systems, and visually immersive interactive web experiences.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/projects"
                                className="px-8 py-3.5 bg-primary text-white font-black border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2"
                            >
                                EXPLORE PROJECTS <ArrowDownRight size={18} />
                            </Link>
                            <a
                                href={resumePdf}
                                download="Krish_Chourasia_Resume.pdf"
                                className="px-8 py-3.5 bg-surface text-text font-black border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-wider text-sm inline-flex items-center justify-center gap-2"
                            >
                                DOWNLOAD CV
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Profile Picture with Floating 3D Micro-Badges */}
                <div className="w-full lg:w-5/12 flex justify-center relative mt-6 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
                    >
                        {/* Background brutalist offset backing */}
                        <div className="absolute inset-0 bg-secondary rounded-full border-4 border-black translate-x-4 translate-y-4 shadow-neo-lg" />

                        {/* Profile Image */}
                        <img
                            src={heroProfileImg}
                            alt="Krish Chourasia"
                            className="relative w-full h-full object-cover rounded-full border-4 border-black z-10 bg-surface"
                        />

                        {/* Floating 3D Micro-Badge 1 (Top Left) */}
                        <motion.div
                            animate={{
                                y: [-6, 6, -6],
                                rotate: [-2, 2, -2],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute -top-3 -left-4 sm:-left-8 z-20 bg-surface border-2 border-black px-3.5 py-1.5 shadow-neo-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-default"
                        >
                            <span className="w-6 h-6 rounded-full bg-accent border border-black flex items-center justify-center text-black">
                                <Zap size={14} />
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-wider text-text">
                                Performant Full-Stack
                            </span>
                        </motion.div>

                        {/* Floating 3D Micro-Badge 2 (Bottom Right) */}
                        <motion.div
                            animate={{
                                y: [6, -6, 6],
                                rotate: [2, -2, 2],
                            }}
                            transition={{
                                duration: 4.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.5,
                            }}
                            className="absolute -bottom-2 -right-4 sm:-right-8 z-20 bg-surface border-2 border-black px-3.5 py-1.5 shadow-neo-sm flex items-center gap-2 hover:scale-105 transition-transform cursor-default"
                        >
                            <span className="w-6 h-6 rounded-full bg-primary border border-black flex items-center justify-center text-white">
                                <Cpu size={14} />
                            </span>
                            <span className="text-[11px] font-black uppercase tracking-wider text-text">
                                CodeRAG & AI LLMs
                            </span>
                        </motion.div>

                        {/* Floating 3D Micro-Badge 3 (Bottom Left) */}
                        <motion.div
                            animate={{
                                y: [-5, 5, -5],
                                rotate: [-1.5, 1.5, -1.5],
                            }}
                            transition={{
                                duration: 3.8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                            className="absolute bottom-10 -left-6 sm:-left-10 z-20 bg-accent border-2 border-black px-3 py-1 shadow-neo-sm flex items-center gap-1.5 hover:scale-105 transition-transform cursor-default"
                        >
                            <Sparkles size={14} className="text-black" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-black">
                                Neo-Brutal UI
                            </span>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Brutalist Elements */}
            <div className="absolute top-24 right-20 w-12 h-12 bg-accent border-2 border-black shadow-neo animate-bounce delay-100 hidden lg:block select-none" />
            <div className="absolute bottom-20 left-20 w-8 h-8 bg-secondary border-2 border-black shadow-neo animate-bounce delay-300 hidden lg:block select-none" />
        </section>
    );
};

export default Hero;
