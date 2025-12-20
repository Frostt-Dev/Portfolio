import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Magnetic from './Magnetic';

interface NavbarProps {
    theme: string;
    toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== '/') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const sections = ['home', 'about', 'skills', 'education', 'contact'];

            // Find the current active section
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the section is reasonably visible in the viewport
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);



    const navLinks = [
        ...(location.pathname === '/projects' ? [{ name: 'Home', href: '/', isRoute: true }] : []),
        { name: 'About', href: '/#about' },
        { name: 'Skills', href: '/#skills' },
        { name: 'Education', href: '/#education' },
        ...(location.pathname !== '/projects' ? [{ name: 'Projects', href: '/projects', isRoute: true }] : []),
        { name: 'Contact', href: '/#contact' },
    ];

    return (
        <nav className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 flex justify-center`}>
            <div className={`
                flex justify-between items-center px-6 py-3 transition-all duration-300
                bg-main/80 backdrop-blur-md border-2 border-black shadow-neo w-[95%] md:w-auto
            `}>
                <Link to="/" className="text-xl font-bold text-text tracking-tighter mr-8 md:mr-12 uppercase">
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Magnetic key={link.name}>
                            <Link
                                to={link.href}
                                className={`px-4 py-2 text-sm font-bold border-2 border-transparent transition-all ${(link.isRoute && location.pathname === link.href) ||
                                    (!link.isRoute && activeSection === link.href.replace('/#', ''))
                                    ? 'bg-primary text-white border-black'
                                    : 'text-text hover:bg-primary hover:text-white hover:border-black'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        </Magnetic>
                    ))}
                    <div className="flex items-center space-x-2 ml-4 pl-4 border-l-2 border-black">
                        <Magnetic>
                            <a href="https://github.com/Frostt-Dev" target="_blank" rel="noopener noreferrer" className="p-2 text-text hover:text-[#333] dark:hover:text-white hover:bg-secondary border-2 border-transparent hover:border-black transition-all block">
                                <Github size={18} />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="https://www.linkedin.com/in/krish-chourasia-b32304339/" target="_blank" rel="noopener noreferrer" className="p-2 text-text hover:text-[#0077b5] hover:bg-secondary border-2 border-transparent hover:border-black transition-all block">
                                <Linkedin size={18} />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a href="mailto:krishchourasia4@gmail.com" className="p-2 text-text hover:text-[#EA4335] hover:bg-secondary border-2 border-transparent hover:border-black transition-all block">
                                <Mail size={18} />
                            </a>
                        </Magnetic>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-text p-2 hover:bg-primary hover:text-white border-2 border-transparent hover:border-black transition-all"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-20 left-4 right-4 bg-main border-2 border-black shadow-neo p-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="text-text hover:bg-primary hover:text-white text-lg font-bold p-2 border-2 border-transparent hover:border-black transition-all"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex justify-center space-x-6 pt-4 border-t-2 border-black">
                                <button
                                    onClick={toggleTheme}
                                    className="text-text hover:text-primary"
                                >
                                    {theme === 'dark' ? '🌙' : '☀️'}
                                </button>
                                <a href="https://github.com/Frostt-Dev" target="_blank" rel="noopener noreferrer" className="text-text p-2 rounded hover:bg-[#333] hover:text-white transition-all">
                                    <Github size={24} />
                                </a>
                                <a href="https://www.linkedin.com/in/krish-chourasia-b32304339/" target="_blank" rel="noopener noreferrer" className="text-text p-2 rounded hover:bg-[#0077b5] hover:text-white transition-all">
                                    <Linkedin size={24} />
                                </a>
                                <a href="mailto:krishchourasia4@gmail.com" className="text-text p-2 rounded hover:bg-[#EA4335] hover:text-white transition-all">
                                    <Mail size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
