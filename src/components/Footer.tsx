
import { Github, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-main py-12 border-t-2 border-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <a href="#" className="text-2xl font-bold text-text tracking-tighter uppercase">
                            Portfolio<span className="text-primary">.</span>
                        </a>
                        <p className="text-text/70 mt-2 text-sm font-medium">
                            Building digital experiences that matter.
                        </p>
                    </div>

                    <div className="flex space-x-6 mb-6 md:mb-0">
                        <a href="https://github.com/Frostt-Dev" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/krish-chourasia-aba355430/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
                            <Linkedin size={20} />
                        </a>
                        <a href="https://www.instagram.com/krish.chourasia/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-primary transition-colors">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
