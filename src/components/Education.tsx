import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const educationData = [
    {
        degree: "Bachelor of Technology in Computer Science",
        institution: "University of Technology",
        year: "2021 - 2025",
        location: "New Delhi, India",
        description: "Focused on Software Engineering, Data Structures, and Algorithms. Active member of the Coding Club and Tech Society."
    },
    {
        degree: "Higher Secondary Education",
        institution: "City Public School",
        year: "2019 - 2021",
        location: "Indore, India",
        description: "Major in Physics, Chemistry, and Mathematics. Graduated with distinction."
    }
];

const Education = () => {
    return (
        <section id="education" className="py-20 bg-transparent relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-text mb-4 uppercase">Education</h2>
                    <div className="w-24 h-2 bg-black mx-auto"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {educationData.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="relative pl-8 pb-12 last:pb-0 border-l-4 border-black last:border-l-0 ml-4 md:ml-0"
                        >
                            <div className="absolute left-[-10px] top-0 w-5 h-5 bg-primary border-2 border-black rounded-full"></div>

                            <div className="bg-surface p-8 border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-accent border-2 border-black text-black shadow-neo-sm">
                                            <GraduationCap size={24} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text">{item.degree}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-text/70 font-bold">
                                        <span className="flex items-center gap-1 bg-secondary/20 px-2 py-1 border border-black rounded-sm">
                                            <Calendar size={14} /> {item.year}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin size={14} /> {item.location}
                                        </span>
                                    </div>
                                </div>

                                <h4 className="text-lg font-bold text-text mb-3">{item.institution}</h4>
                                <p className="text-text/80 leading-relaxed font-medium">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
