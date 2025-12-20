import { motion } from 'framer-motion';
import { Layout, Server, Terminal, Database, Globe, Cpu, Smartphone, Code, Cloud, Layers, GitBranch, Command, Shield } from 'lucide-react';

const skills = [
    { name: "React", icon: <Code />, category: "Frontend" },
    { name: "Python", icon: <Terminal />, category: "Languages" },
    { name: "TypeScript", icon: <Terminal />, category: "Languages" },
    { name: "Tailwind CSS", icon: <Layout />, category: "Frontend" },
    { name: "C", icon: <Cpu />, category: "Languages" },
    { name: "Three.js", icon: <Globe />, category: "3D Graphics" },
    { name: "Node.js", icon: <Server />, category: "Backend" },
    { name: "Next.js", icon: <Cpu />, category: "Framework" },
    { name: "C++", icon: <Code />, category: "Languages" },
    { name: "React Native", icon: <Smartphone />, category: "Mobile" },
    { name: "Redux", icon: <Layers />, category: "State Mgmt" },
    { name: "MongoDB", icon: <Database />, category: "Database" },
    { name: "AWS", icon: <Cloud />, category: "Cloud" },
    { name: "Git", icon: <GitBranch />, category: "Version Control" },
    { name: "GraphQL", icon: <Command />, category: "API" },
    { name: "Firebase", icon: <Cloud />, category: "Backend" },
    { name: "Auth0", icon: <Shield />, category: "Security" },
];

const Skills = () => {
    return (
        <section id="skills" className="py-32 bg-transparent relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-text mb-6 tracking-tight uppercase">
                        Skills
                    </h2>
                    <p className="text-text/70 max-w-2xl mx-auto text-lg font-medium">
                        My arsenal of tools and technologies for building digital masterpieces.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            variants={{
                                initial: { opacity: 0, scale: 0.8, y: 20 },
                                animate: {
                                    opacity: 1,
                                    scale: 1,
                                    y: [0, -5, 0],
                                    transition: {
                                        opacity: { duration: 0.5, delay: index * 0.05 },
                                        scale: { duration: 0.5, delay: index * 0.05 },
                                        y: {
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatType: "mirror",
                                            delay: Math.random() * 2
                                        }
                                    }
                                },
                                hover: {
                                    scale: 1.1,
                                    rotate: 3,
                                    transition: { duration: 0.2 }
                                }
                            }}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                            className="group relative w-24 h-24 sm:w-32 sm:h-32 bg-surface border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer flex flex-col items-center justify-center"
                        >
                            <div className="relative z-10 flex flex-col items-center text-center">
                                <motion.div
                                    className="text-text mb-2 group-hover:text-primary transition-colors"
                                    variants={{
                                        initial: { scale: 1, rotate: 0 },
                                        hover: {
                                            scale: [1, 1.5, 1],
                                            rotate: [0, 25, -25, 0],
                                            transition: { duration: 0.5 }
                                        }
                                    }}
                                >
                                    {skill.icon}
                                </motion.div>
                                <span className="text-[10px] sm:text-xs font-bold text-text group-hover:text-primary transition-colors">
                                    {skill.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
