import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2, Linkedin, Github, Twitter, Instagram, Facebook } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { personalInfo } from '@/data/personalInfo';

// Custom Success Checkmark with Draw-in Animation
const AnimatedCheck = () => (
    <motion.svg
        className="w-20 h-20 mx-auto mb-6 text-[#ff4d5a]"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <motion.circle
            cx="25"
            cy="25"
            r="22"
            stroke="currentColor"
            strokeWidth="3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.path
            d="M16 26L22 32L34 18"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        />
    </motion.svg>
);

const FloatingInput = ({
    id, label, type = "text", value, onChange, disabled, required = true, isTextArea = false, maxLength
}) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value.length > 0;
    const isFloating = isFocused || hasValue;

    return (
        <div className="relative w-full">
            <label
                htmlFor={id}
                className={`absolute left-[18px] pointer-events-none transition-all duration-[250ms] ease-in-out ${isFloating
                    ? 'top-[8px] text-[10px] text-[var(--accent)] tracking-[1px] uppercase'
                    : 'top-1/2 -translate-y-1/2 text-[14px] text-[#555]'
                    } ${isTextArea && !isFloating ? 'top-[24px]' : ''}`}
            >
                {label}
            </label>
            {isTextArea ? (
                <textarea
                    id={id}
                    name={id}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    required={required}
                    maxLength={maxLength}
                    className={`w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] pt-[24px] pb-[10px] text-white text-[14px] outline-none transition-[border-color,box-shadow] duration-250 ease-[ease] resize-y min-h-[140px] placeholder-[#555] hover:border-[#ef4444] ${isFocused
                        ? 'border-[#ef4444] shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                        : ''
                        }`}
                />
            ) : (
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={disabled}
                    required={required}
                    className={`w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-[10px] px-[16px] pt-[22px] pb-[6px] text-white text-[14px] outline-none transition-[border-color,box-shadow] duration-250 ease-[ease] placeholder-[#555] hover:border-[#ef4444] ${isFocused
                        ? 'border-[#ef4444] shadow-[0_0_0_3px_rgba(239,68,68,0.15)]'
                        : ''
                        }`}
                />
            )}
        </div>
    );
};

const Contact = React.memo(function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (status === 'sending') return;

        setStatus('sending');
        try {
            await emailjs.send(
                'service_ty1gvii',
                'template_lpdakz3',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    message: formData.message,
                },
                '7mLAeUe05I5Wa0Unj'
            );

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        } catch (err) {
            console.error('EmailJS send failed:', err);
            setStatus('error');

            setTimeout(() => {
                setStatus('idle');
            }, 3000);
        }
    };

    // Animation Variants
    const staggerContainer = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    const titleReveal = {
        hidden: { y: 40, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
    };

    const slideLeft = {
        hidden: { x: -60, opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const slideRight = {
        hidden: { x: 60, opacity: 0 },
        show: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay: 0.1 } }
    };

    const bottomUp = {
        hidden: { y: 10, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.6, delay: 0.5, ease: "easeOut" } }
    };

    const fieldReveal = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section id="contact" className="relative pt-[52px] sm:pt-[72px] pb-[80px] bg-[#080808] overflow-hidden" style={{ contain: 'layout style' }}>
            {/* SECTION DIVIDER */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] z-10" />
            {/* BACKGROUND ELEMENTS */}
            <div className="absolute top-[-10%] right-[-10%] w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.04)_0%,transparent_70%)] animate-[blob-breathe_15s_ease_infinite] pointer-events-none z-0" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_70%)] animate-[blob-breathe_20s_ease_infinite_reverse] pointer-events-none z-0" />
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 w-full min-w-0">
                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-16 lg:mb-20 w-full min-w-0"
                    variants={titleReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="w-full flex justify-center mb-6 min-w-0">
                        <span className="bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] border border-[rgba(255,77,90,0.3)] text-[var(--accent)] tracking-[4px] text-[11px] max-[480px]:text-[10px] uppercase rounded-full px-[22px] max-[480px]:px-4 py-[7px] font-medium relative max-w-full truncate">
                            ● CONTACT
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--accent)] animate-[line-expand_0.8s_ease-out_forwards]" />
                        </span>
                    </div>
                    <h2 className="section-heading text-white font-[200] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-6 font-display break-words">
                        Let's Work Together
                    </h2>
                    <p className="max-w-[580px] w-full text-[#888888] text-[16px] max-[480px]:text-[14px] leading-[1.7] min-w-0 break-words px-2">
                        Have a project in mind or want to collaborate on something amazing?<br className="max-[480px]:hidden" />
                        <span className="max-[480px]:block">I'm always open to discussing new opportunities.</span>
                    </p>
                </motion.div>

                {/* MAIN LAYOUT */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                    {/* LEFT COLUMN */}
                    <motion.div
                        className="w-full lg:w-[40%] flex flex-col"
                        variants={slideLeft}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Personal Message Card */}
                        <div className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-[28px] mb-6 sm:mb-8 transition-all duration-300">
                            <span className="inline-block text-[#ff4d5a] text-[10px] tracking-[3px] mb-3 uppercase font-semibold text-opacity-90">REACH OUT</span>
                            <h3 className="text-white font-bold text-[22px] mb-3">Let's Connect</h3>
                            <p className="text-[#888] text-[14px] leading-[1.7] mb-6">
                                Whether it's a project, collaboration, internship opportunity, or just a hello — my inbox is always open.
                            </p>
                            <div className="inline-flex items-center gap-2 bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)] rounded-[50px] px-[16px] py-[6px]">
                                <div className="relative flex items-center justify-center w-2 h-2">
                                    <div className="absolute w-2 h-2 bg-[#22c55e] rounded-full animate-ping-online opacity-75" style={{ animation: 'pulse 2s infinite' }} />
                                    <div className="absolute w-2 h-2 bg-[#22c55e] rounded-full" />
                                </div>
                                <span className="text-[#22c55e] text-[12px] font-semibold tracking-wide">Currently Available for Work</span>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="flex flex-col gap-4 mb-8">
                            {[
                                { icon: MapPin, label: "LOCATION", value: personalInfo.infoCards?.find(c => c.label === "LOCATION")?.value || "Nagpur, Maharashtra, India" },
                                { icon: Phone, label: "CALL ME", value: personalInfo.infoCards?.find(c => c.label === "PHONE")?.value || "+91 9112250104", isLink: true, type: "tel" },
                                { icon: Mail, label: "EMAIL ME", value: personalInfo.infoCards?.find(c => c.label === "EMAIL")?.value || "mohitgupta25012004@gmail.com", isLink: true, type: "mailto" }
                            ].map((info, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-[#111] border border-[rgba(239,68,68,0.18)] border-l-[3px] border-l-[#ef4444] rounded-xl p-5 flex items-start gap-5 transition-all duration-250 ease-[ease] hover:-translate-y-[2px] hover:bg-[rgba(239,68,68,0.06)] hover:border-[rgba(239,68,68,0.35)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
                                >
                                    <div className="w-[40px] h-[40px] rounded-[10px] bg-[rgba(239,68,68,0.12)] text-[#ef4444] flex items-center justify-center flex-shrink-0 transition-all duration-250 group-hover:shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                                        <info.icon size={18} />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[#9ca3af] group-hover:text-[#e2e8f0] text-[10px] uppercase tracking-[2px] mb-1 font-medium transition-colors duration-250">{info.label}</span>
                                        {info.isLink ? (
                                            <a href={`${info.type}:${info.value}`} className="text-[#9ca3af] group-hover:text-[#e2e8f0] text-[15px] max-[480px]:text-[14px] leading-[1.6] transition-colors duration-250 pt-1 break-all min-w-0">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-[#9ca3af] group-hover:text-[#e2e8f0] text-[15px] max-[480px]:text-[14px] leading-[1.6] transition-colors duration-250 pt-1 break-words min-w-0">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Row */}
                        <div>
                            <span className="block text-[#666] text-[10px] uppercase tracking-[3px] mb-4 font-medium">FIND ME ON</span>
                            <div className="flex items-center justify-start gap-4">
                                {[
                                    { icon: Linkedin, link: personalInfo.socials.find(s => s.name === "LinkedIn")?.url || "#" },
                                    { icon: Github, link: personalInfo.socials.find(s => s.name === "GitHub")?.url || "#" },
                                    { icon: Twitter, link: personalInfo.socials.find(s => s.name === "Twitter")?.url || "#" },
                                    { icon: Mail, link: `mailto:${personalInfo.infoCards?.find(c => c.label === "EMAIL")?.value || "mohitgupta25012004@gmail.com"}` },
                                    { icon: Instagram, link: personalInfo.socials.find(s => s.name === "Instagram")?.url || "#" },
                                    { icon: Facebook, link: personalInfo.socials.find(s => s.name === "Facebook")?.url || "#" }
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-[44px] h-[44px] rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#888] transition-all duration-300 cursor-pointer hover:bg-[rgba(255,77,90,0.12)] hover:border-[#ef4444] hover:text-[#ff4d5a] hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(255,77,90,0.2)]"
                                    >
                                        <social.icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN */}
                    <motion.div
                        className="w-full lg:w-[60%]"
                        variants={slideRight}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <div className="bg-[#111111] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-[24px] sm:p-[32px] overflow-hidden h-full">

                            <div className="mb-6">
                                <span className="text-[#ff4d5a] text-[11px] uppercase tracking-[3px] font-semibold block mb-2">SEND A MESSAGE</span>
                                <div className="h-[2px] w-[40px] bg-[#ff4d5a]" />
                            </div>

                            <div className="relative min-h-[400px]">
                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                            className="absolute inset-0 flex flex-col items-center justify-center text-center bg-[#111111] z-20"
                                        >
                                            <AnimatedCheck />
                                            <h3 className="text-white text-[24px] font-bold mb-3">Message sent successfully!</h3>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            key="form"
                                            onSubmit={handleSubmit}
                                            variants={staggerContainer}
                                            initial="hidden"
                                            animate="show"
                                            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
                                            className="flex flex-col gap-5 relative z-10"
                                        >
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                <motion.div variants={fieldReveal}>
                                                    <FloatingInput
                                                        id="name"
                                                        label="Your Name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        disabled={status === 'sending'}
                                                    />
                                                </motion.div>
                                                <motion.div variants={fieldReveal}>
                                                    <FloatingInput
                                                        id="email"
                                                        label="Your Email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        disabled={status === 'sending'}
                                                    />
                                                </motion.div>
                                            </div>

                                            <motion.div variants={fieldReveal}>
                                                <FloatingInput
                                                    id="subject"
                                                    label="Subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'sending'}
                                                />
                                            </motion.div>

                                            <motion.div variants={fieldReveal}>
                                                <FloatingInput
                                                    id="message"
                                                    label="Message"
                                                    isTextArea={true}
                                                    maxLength={500}
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'sending'}
                                                />
                                                <div className="text-right mt-2 text-[#555] text-[12px] font-medium tracking-wide">
                                                    {formData.message.length} / 500
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fieldReveal} className="mt-2">
                                                <div className={`min-h-[20px] mb-3 text-[13px] font-medium transition-all duration-250 ease-[ease] ${status === 'error'
                                                    ? 'text-[#ef4444]'
                                                    : 'text-transparent'
                                                    }`}
                                                >
                                                    Failed to send. Please try again.
                                                </div>
                                                <button
                                                    type="submit"
                                                    disabled={status === 'sending'}
                                                    className={`w-full h-[52px] rounded-[12px] font-bold text-[15px] text-white tracking-[1px] flex items-center justify-center gap-[8px] transition-all duration-250 ease-[ease] ${status === 'sending'
                                                        ? 'opacity-80 cursor-not-allowed bg-[linear-gradient(135deg,#ff4d5a_0%,#ff6b6b_100%)]'
                                                        : 'bg-[linear-gradient(135deg,#ff4d5a_0%,#ff6b6b_100%)] hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(255,77,90,0.4)] hover:bg-[linear-gradient(135deg,#ff3a47_0%,#ff5555_100%)] border-none cursor-pointer'
                                                        }`}
                                                >
                                                    {status === 'sending' ? (
                                                        <>
                                                            <Loader2 className="w-[18px] h-[18px] animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send className="w-[18px] h-[18px]" />
                                                        </>
                                                    )}
                                                </button>
                                            </motion.div>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* BOTTOM STRIP */}
                <motion.div
                    className="mt-8 w-full flex flex-col items-center justify-center"
                    variants={bottomUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="mt-[32px] bg-[rgba(255,77,90,0.08)] border border-[rgba(255,77,90,0.2)] rounded-[50px] px-[20px] py-[8px] flex items-center gap-2">
                        <span className="text-[#ff4d5a] text-[13px] font-medium tracking-wide text-center">
                            ⚡ Average response time: Under 24 hours
                        </span>
                    </div>
                </motion.div>

                {/* COPYRIGHT BAR */}
                <div className="w-full mt-[48px]">
                    <div className="w-full h-[1px] bg-[linear-gradient(to_right,transparent,rgba(255,77,90,0.3),transparent)]" />
                    <div className="py-[20px] flex flex-wrap justify-between items-center gap-[8px]">
                        <span className="text-[#444] text-[12px]">© 2026 Mohit Gupta. All rights reserved.</span>
                        <span className="text-[#444] text-[12px]">
                            Designed & Built with <span className="text-[#ff4d5a]">❤️</span> by Mohit Gupta
                        </span>
                        <span className="text-[#444] text-[12px]">Last updated: March 2026</span>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Contact;
