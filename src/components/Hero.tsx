import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroProfileImg from '../assets/hero-profile.jpg';
import resumePdf from '../assets/Resume.pdf';

const Hero = () => {
    return (
        <section id="home" className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-transparent pt-16">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-text font-bold tracking-wide mb-4 bg-accent inline-block px-2 border-2 border-black shadow-neo-sm">HELLO, I'M</h2>
                        <h1 className="text-6xl md:text-8xl font-black text-text mb-6 leading-none tracking-tighter">
                            Krish <br /> Chourasia
                        </h1>
                        <p className="text-text/80 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 font-medium">
                            I build immersive web experiences with modern technologies.
                            Focused on creating beautiful, responsive, and performant applications.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                to="/projects"
                                className="px-8 py-3 bg-primary text-white font-bold border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                PROJECTS
                            </Link>
                            <a
                                href={resumePdf}
                                download="Krish_Chourasia_Resume.pdf"
                                className="px-8 py-3 bg-surface text-text font-bold border-2 border-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                            >
                                DOWNLOAD CV
                            </a>
                        </div>
                    </motion.div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center relative mt-12 md:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-72 h-72 md:w-96 md:h-96"
                    >
                        <div className="absolute inset-0 bg-secondary rounded-full border-4 border-black translate-x-4 translate-y-4"></div>
                        <img
                            src={heroProfileImg}
                            alt="Krish Chourasia"
                            className="relative w-full h-full object-cover rounded-full border-4 border-black z-10 bg-surface"
                        />
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-12 h-12 bg-accent border-2 border-black shadow-neo animate-bounce delay-100 hidden md:block" />
            <div className="absolute bottom-20 left-20 w-8 h-8 bg-secondary border-2 border-black shadow-neo animate-bounce delay-300 hidden md:block" />
        </section>
    );
};

export default Hero;
