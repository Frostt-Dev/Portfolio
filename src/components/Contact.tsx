
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const sendEmail = (e: FormEvent) => {
        e.preventDefault();
        setIsSending(true);
        setStatus('idle');

        if (!formRef.current) return;

        emailjs.sendForm(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formRef.current,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
            .then(() => {
                setStatus('success');
                setIsSending(false);
                formRef.current?.reset();
            }, (error) => {
                console.error(error.text);
                setStatus('error');
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="py-20 bg-transparent">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-text mb-4 uppercase">Get In Touch</h2>
                    <div className="w-24 h-2 bg-black mx-auto"></div>
                    <p className="text-text/70 mt-6 max-w-2xl mx-auto text-lg font-medium">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-1/3 space-y-8"
                    >
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-accent border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-neo-sm">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text mb-1">Email</h3>
                                <p className="text-text/70 font-medium">krishchourasia4@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-accent border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-neo-sm">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text mb-1">Phone</h3>
                                <p className="text-text/70 font-medium">9179750506</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-accent border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-neo-sm">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-text mb-1">Location</h3>
                                <p className="text-text/70 font-medium">San Francisco, CA</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-2/3 bg-surface p-8 border-2 border-black shadow-neo"
                    >
                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className="w-full bg-main border-2 border-border px-4 py-3 text-text focus:outline-none focus:shadow-neo-sm transition-all placeholder:text-text/50 font-bold"
                                        placeholder="NAME"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className="w-full bg-main border-2 border-border px-4 py-3 text-text focus:outline-none focus:shadow-neo-sm transition-all placeholder:text-text/50 font-bold"
                                        placeholder="EMAIL"
                                    />
                                </div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full bg-main border-2 border-border px-4 py-3 text-text focus:outline-none focus:shadow-neo-sm transition-all placeholder:text-text/50 font-bold"
                                    placeholder="SUBJECT"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-main border-2 border-border px-4 py-3 text-text focus:outline-none focus:shadow-neo-sm transition-all resize-none placeholder:text-text/50 font-bold"
                                    placeholder="MESSAGE"
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-primary text-white font-bold py-4 border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-2 uppercase tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Send Message</span>
                                        <Send size={20} />
                                    </>
                                )}
                            </button>
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-100 border-2 border-green-500 text-green-700 flex items-center gap-2 font-bold"
                                >
                                    <CheckCircle size={20} />
                                    <span>Message sent successfully! I'll get back to you soon.</span>
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-100 border-2 border-red-500 text-red-700 flex items-center gap-2 font-bold"
                                >
                                    <XCircle size={20} />
                                    <span>Failed to send message. Please try again later.</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
