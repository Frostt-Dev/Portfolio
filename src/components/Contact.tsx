import { useState, useRef } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Loader2,
    CheckCircle,
    XCircle,
    Copy,
    Check,
    MessageCircle,
    Linkedin,
    Sparkles,
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [copiedPhone, setCopiedPhone] = useState(false);

    const emailAddress = "krishchourasia4@gmail.com";
    const phoneNumber = "9179750506";

    const copyToClipboard = (text: string, type: 'email' | 'phone') => {
        navigator.clipboard.writeText(text);
        if (type === 'email') {
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2500);
        } else {
            setCopiedPhone(true);
            setTimeout(() => setCopiedPhone(false), 2500);
        }
    };

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
        <section id="contact" className="py-24 bg-transparent relative overflow-hidden">
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
                        <Sparkles size={14} className="text-black" /> LET'S CONNECT
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-text mb-4 uppercase tracking-tight">
                        Get In Touch
                    </h2>
                    <div className="w-24 h-2 bg-black mx-auto mb-4" />
                    <p className="text-text/70 max-w-2xl mx-auto text-base md:text-lg font-medium">
                        Have an opportunity, engineering project, or want to collaborate? Reach out directly or send a message.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left Info & Quick Actions Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-5/12 space-y-6"
                    >
                        {/* Email Card with 1-Click Copy */}
                        <div className="p-5 bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary border-2 border-black flex items-center justify-center text-white flex-shrink-0 shadow-neo-sm group-hover:rotate-6 transition-transform">
                                        <Mail size={22} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xs font-black text-text/60 uppercase tracking-widest">Email</h3>
                                            {copiedEmail && (
                                                <span className="text-[10px] font-black uppercase tracking-wider bg-accent px-2 py-0.5 border border-black text-black">
                                                    Copied! 📋
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-text font-black text-base md:text-lg break-all select-all">
                                            {emailAddress}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 flex-shrink-0">
                                    <button
                                        onClick={() => copyToClipboard(emailAddress, 'email')}
                                        title="Copy email to clipboard"
                                        aria-label="Copy email"
                                        className="p-2 bg-main border-2 border-black hover:bg-accent text-black transition-all shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                    >
                                        {copiedEmail ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Phone Card with 1-Click Copy */}
                        <div className="p-5 bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-secondary border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-neo-sm group-hover:-rotate-6 transition-transform">
                                        <Phone size={22} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-xs font-black text-text/60 uppercase tracking-widest">Phone</h3>
                                            {copiedPhone && (
                                                <span className="text-[10px] font-black uppercase tracking-wider bg-accent px-2 py-0.5 border border-black text-black">
                                                    Copied! 📋
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-text font-black text-base md:text-lg select-all">
                                            +91 {phoneNumber}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5 flex-shrink-0">
                                    <button
                                        onClick={() => copyToClipboard(phoneNumber, 'phone')}
                                        title="Copy phone to clipboard"
                                        aria-label="Copy phone number"
                                        className="p-2 bg-main border-2 border-black hover:bg-accent text-black transition-all shadow-neo-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none"
                                    >
                                        {copiedPhone ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="p-5 bg-surface border-4 border-black shadow-neo hover:shadow-neo-lg transition-all group">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-accent border-2 border-black flex items-center justify-center text-black flex-shrink-0 shadow-neo-sm group-hover:rotate-6 transition-transform">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xs font-black text-text/60 uppercase tracking-widest">Location</h3>
                                    <p className="text-text font-black text-base md:text-lg">
                                        Indore, Madhya Pradesh, India
                                    </p>
                                    <span className="text-xs font-bold text-text/70">
                                        Open to Remote & Relocation
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Fast Direct Action Buttons */}
                        <div className="pt-2 flex flex-wrap gap-3">
                            <a
                                href={`https://wa.me/91${phoneNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-black font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                            <a
                                href={`mailto:${emailAddress}`}
                                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                                <Mail size={16} /> Send Email
                            </a>
                            <a
                                href="https://www.linkedin.com/in/krish-chourasia-aba355430"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-3 bg-surface text-text font-black text-xs uppercase tracking-wider border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            >
                                <Linkedin size={16} /> LinkedIn
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full lg:w-7/12 bg-surface p-8 border-4 border-black shadow-neo-lg"
                    >
                        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black" />
                                <span className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black" />
                                <span className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black" />
                                <span className="ml-2 text-xs font-mono font-bold text-text/60">
                                    message_composer.sh
                                </span>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                                DIRECT INBOX
                            </span>
                        </div>

                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-text/70 mb-1.5">
                                        Your Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="user_name"
                                        required
                                        className="w-full bg-main border-2 border-black px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary shadow-neo-sm transition-all placeholder:text-text/40 font-bold text-sm"
                                        placeholder="e.g. Alex Smith"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-wider text-text/70 mb-1.5">
                                        Your Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="user_email"
                                        required
                                        className="w-full bg-main border-2 border-black px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary shadow-neo-sm transition-all placeholder:text-text/40 font-bold text-sm"
                                        placeholder="e.g. alex@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-text/70 mb-1.5">
                                    Subject *
                                </label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    className="w-full bg-main border-2 border-black px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary shadow-neo-sm transition-all placeholder:text-text/40 font-bold text-sm"
                                    placeholder="e.g. Full-Stack / AI Project Discussion"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black uppercase tracking-wider text-text/70 mb-1.5">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    required
                                    className="w-full bg-main border-2 border-black px-4 py-3 text-text focus:outline-none focus:ring-2 focus:ring-primary shadow-neo-sm transition-all resize-none placeholder:text-text/40 font-bold text-sm"
                                    placeholder="Tell me about your project or what you're looking to build..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full bg-primary text-white font-black py-4 border-2 border-black shadow-neo hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center space-x-2 uppercase tracking-wider text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSending ? (
                                    <>
                                        <Loader2 className="animate-spin" size={18} />
                                        <span>Transmitting Message...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Dispatch Message</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-green-100 border-2 border-black text-green-900 flex items-center gap-2 font-bold text-sm shadow-neo-sm"
                                    >
                                        <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                                        <span>Message sent successfully! I will respond within 24 hours.</span>
                                    </motion.div>
                                )}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="p-4 bg-red-100 border-2 border-black text-red-900 flex items-center gap-2 font-bold text-sm shadow-neo-sm"
                                    >
                                        <XCircle size={20} className="text-red-600 flex-shrink-0" />
                                        <span>Failed to send message via form. Please email directly at {emailAddress}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
