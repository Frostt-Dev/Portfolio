import { motion } from 'framer-motion';
import { Code, Palette, Terminal, Globe } from 'lucide-react';
import profileImg from '../assets/profile.jpg';

const skills = [
    { name: 'Frontend Dev', icon: <Code size={24} />, description: 'Building responsive and interactive UIs with React, Tailwind, and TypeScript.' },
    { name: 'UI/UX Design', icon: <Palette size={24} />, description: 'Creating beautiful, accessible, and user-centric designs.' },
    { name: '3D Visuals', icon: <Globe size={24} />, description: 'Integrating immersive 3D elements using React Three Fiber.' },
    { name: 'Performance', icon: <Terminal size={24} />, description: 'Optimizing applications for speed and smooth user experience.' },
];

const About = () => {
    return (
        <section id="about" className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-text mb-4 uppercase tracking-tight">About Me</h2>
                    <div className="w-24 h-2 bg-black mx-auto"></div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <div className="relative w-72 h-64 md:w-[500px] md:h-96">
                            <div className="absolute inset-0 border-4 border-black bg-accent transform translate-x-4 translate-y-4"></div>
                            <img
                                src={profileImg}
                                alt="Krish Chourasia"
                                className="relative w-full h-full object-cover border-4 border-black z-10 bg-surface"
                                loading="lazy"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full md:w-1/2"
                    >
                        <h3 className="text-3xl font-bold text-text mb-6">
                            Passionate Developer & <span className="bg-primary text-white px-2">Creative Thinker</span>
                        </h3>
                        <p className="text-text/80 text-lg leading-relaxed mb-6 font-medium">
                            I'm Krish Chourasia, a passionate developer who loves bridging the gap between design and engineering.
                            I specialize in building modern web applications that are not only functional but also visually stunning.
                        </p>
                        <p className="text-text/80 text-lg leading-relaxed font-medium">
                            With a keen eye for detail and a drive for innovation, I constantly explore new technologies to bring ideas to life.
                            Whether it's 3D visuals or seamless interactions, I aim to create memorable digital experiences.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-surface p-6 border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            <div className="w-12 h-12 bg-secondary border-2 border-black flex items-center justify-center text-black mb-4 shadow-neo-sm">
                                {skill.icon}
                            </div>
                            <h3 className="text-xl font-bold text-text mb-2">{skill.name}</h3>
                            <p className="text-text/70 text-sm leading-relaxed font-medium">
                                {skill.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
