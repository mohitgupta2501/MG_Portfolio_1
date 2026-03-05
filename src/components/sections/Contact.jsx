import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Loader2 } from 'lucide-react';
import SocialIcon from '@/components/ui/SocialIcon';
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
                    className={`w-full bg-[#111111] border border-[#1e1e1e] rounded-[12px] px-[18px] pt-[24px] pb-[10px] text-white text-[14px] outline-none transition-all duration-300 ease-in-out resize-y min-h-[140px] placeholder-[#444] ${isFocused
                        ? 'border-[var(--accent)] bg-[#141414] shadow-[0_0_0_3px_rgba(255,77,90,0.12),0_0_20px_rgba(255,77,90,0.05)]'
                        : 'hover:border-[#2a2a2a] hover:bg-[#131313]'
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
                    className={`w-full bg-[#111111] border border-[#1e1e1e] rounded-[12px] px-[18px] pt-[22px] pb-[6px] text-white text-[14px] outline-none transition-all duration-300 ease-in-out placeholder-[#444] ${isFocused
                        ? 'border-[var(--accent)] bg-[#141414] shadow-[0_0_0_3px_rgba(255,77,90,0.12),0_0_20px_rgba(255,77,90,0.05)]'
                        : 'hover:border-[#2a2a2a] hover:bg-[#131313]'
                        }`}
                />
            )}
        </div>
    );
};

const Contact = React.memo(function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success'

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            console.log("Form submitted:", formData);
            setStatus('success');
            // Reset form after 5 seconds optionally
            // setTimeout(() => { setStatus('idle'); setFormData({ name: '', email: '', subject: '', message: '' }); }, 5000);
        }, 1500);
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
        <section id="contact" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden" style={{ contain: 'layout style' }}>
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

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-16 lg:mb-20"
                    variants={titleReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] border border-[rgba(255,77,90,0.3)] text-[var(--accent)] tracking-[4px] text-[11px] uppercase rounded-full px-[22px] py-[7px] font-medium relative">
                            CONTACT
                            {/* Animated underline */}
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--accent)] animate-[line-expand_0.8s_ease-out_forwards]" />
                        </span>
                    </div>
                    <h2 className="text-white font-[200] text-[clamp(42px,5.5vw,66px)] leading-tight mb-6 font-display">
                        Let's Work Together
                    </h2>
                    <p className="max-w-[580px] text-[#888888] text-[16px] leading-[1.7]">
                        Have a project in mind or want to collaborate on something amazing?<br />
                        I'm always open to discussing new opportunities.
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
                        <div className="bg-[linear-gradient(145deg,#111111,#0d0d0d)] border border-[rgba(255,77,90,0.2)] rounded-[20px] p-[28px] mb-6 sm:mb-8 transition-all duration-300 hover:border-[rgba(255,77,90,0.4)] hover:-translate-y-[3px]">
                            <span className="inline-block text-[var(--accent)] text-[10px] tracking-[2px] mb-3 uppercase font-semibold text-opacity-90">REACH OUT</span>
                            <h3 className="text-white font-bold text-[20px] mb-3">Let's Connect</h3>
                            <p className="text-[#888] text-[14px] leading-[1.7] mb-6">
                                Whether it's a project, collaboration, internship opportunity, or just a hello — my inbox is always open.
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-[#1a1a1a]">
                                <div className="relative flex items-center justify-center w-3 h-3">
                                    <div className="absolute w-[8px] h-[8px] bg-[#22c55e] rounded-full" />
                                    <div className="absolute w-[8px] h-[8px] bg-[#22c55e] rounded-full animate-ping-online opacity-75" />
                                </div>
                                <span className="text-[#22c55e] text-[13px] font-medium tracking-wide">Currently Available for Work</span>
                            </div>
                        </div>

                        {/* Contact Info Cards */}
                        <div className="flex flex-col gap-4 mb-8">
                            {[
                                { icon: MapPin, label: "LOCATION", value: personalInfo.infoCards.find(c => c.label === "LOCATION")?.value || "Nagpur, Maharashtra, India" },
                                { icon: Phone, label: "CALL ME", value: personalInfo.infoCards.find(c => c.label === "PHONE")?.value || "+91 9112250104", isLink: true, type: "tel" },
                                { icon: Mail, label: "EMAIL ME", value: personalInfo.infoCards.find(c => c.label === "EMAIL")?.value || "mohitgupta25012004@gmail.com", isLink: true, type: "mailto" }
                            ].map((info, idx) => (
                                <div
                                    key={idx}
                                    className="group bg-[linear-gradient(145deg,#111111,#0d0d0d)] border border-[#1a1a1a] border-l-[3px] border-l-transparent rounded-[16px] p-[20px] sm:px-[22px] grid grid-cols-[52px_1fr] items-center gap-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(255,77,90,0.45)] hover:border-l-[var(--accent)] hover:translate-x-[6px] max-sm:hover:translate-x-0 max-sm:hover:-translate-y-[4px] hover:shadow-[-4px_0_20px_rgba(255,77,90,0.1)]"
                                >
                                    <div className="w-[48px] h-[48px] rounded-[14px] bg-[rgba(255,77,90,0.08)] border border-[rgba(255,77,90,0.15)] flex items-center justify-center transition-all duration-300 group-hover:rotate-[12deg] group-hover:scale-[1.15] group-hover:bg-[rgba(255,77,90,0.18)]">
                                        <info.icon className="w-[20px] h-[20px] text-[var(--accent)]" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <span className="text-[#555] text-[10px] uppercase tracking-[2px] mb-1 font-medium">{info.label}</span>
                                        {info.isLink ? (
                                            <a href={`${info.type}:${info.value}`} className="text-white text-[15px] font-semibold transition-colors duration-200 hover:text-[var(--accent)] truncate">
                                                {info.value}
                                            </a>
                                        ) : (
                                            <span className="text-white text-[15px] font-semibold">{info.value}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Row */}
                        <div>
                            <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">FIND ME ON</span>
                            <div className="flex items-center gap-3">
                                {personalInfo.socials.map((social) => (
                                    <SocialIcon
                                        key={social.name}
                                        network={social.name}
                                        url={social.url}
                                        className="!w-[46px] !h-[46px] !bg-[#0d0d0d] !border-[#1a1a1a]"
                                    />
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
                        <div className="bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1a1a1a] rounded-[24px] p-[24px] sm:p-[32px] md:p-[40px] relative overflow-hidden h-full">
                            {/* Subtle corner glow */}
                            <div className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(255,77,90,0.06),transparent_70%)] pointer-events-none" />

                            <div className="mb-8">
                                <span className="text-[var(--accent)] text-[11px] uppercase tracking-[3px] font-semibold block mb-2">SEND A MESSAGE</span>
                                <div className="h-[1px] w-[30px] bg-[var(--accent)]" />
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
                                            className="absolute inset-0 flex flex-col items-center justify-center text-center"
                                        >
                                            <AnimatedCheck />
                                            <h3 className="text-white text-[24px] font-bold mb-3">Message Sent! 🎉</h3>
                                            <p className="text-[#ff4d5a] text-[15px] max-w-[80%] mx-auto leading-relaxed">
                                                Thanks for reaching out. I'll get back to you within 24 hours.
                                            </p>
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
                                                        disabled={status === 'loading'}
                                                    />
                                                </motion.div>
                                                <motion.div variants={fieldReveal}>
                                                    <FloatingInput
                                                        id="email"
                                                        label="Your Email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        disabled={status === 'loading'}
                                                    />
                                                </motion.div>
                                            </div>

                                            <motion.div variants={fieldReveal}>
                                                <FloatingInput
                                                    id="subject"
                                                    label="Subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    disabled={status === 'loading'}
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
                                                    disabled={status === 'loading'}
                                                />
                                                <div className="text-right mt-2 text-[#555] text-[12px] font-medium tracking-wide">
                                                    {formData.message.length} / 500
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fieldReveal} className="mt-2">
                                                <button
                                                    type="submit"
                                                    disabled={status === 'loading'}
                                                    className={`w-full py-[16px] px-6 rounded-[14px] font-bold text-[16px] text-white tracking-[0.5px] flex items-center justify-center gap-[8px] transition-all duration-300 ${status === 'loading'
                                                        ? 'opacity-80 cursor-not-allowed bg-[linear-gradient(135deg,#ff4d5a_0%,#ff7043_100%)]'
                                                        : 'bg-[linear-gradient(135deg,#ff4d5a_0%,#ff7043_100%)] hover:bg-[linear-gradient(135deg,#ff3344,#ff5722)] hover:-translate-y-[2px] hover:shadow-[0_12px_36px_rgba(255,77,90,0.4)] active:scale-[0.98]'
                                                        }`}
                                                >
                                                    {status === 'loading' ? (
                                                        <>
                                                            <Loader2 className="w-[20px] h-[20px] animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send className="w-[18px] h-[18px] ml-1" />
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
                    className="mt-20 w-full flex flex-col items-center justify-center"
                    variants={bottomUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.6),transparent)] opacity-60" />
                    <div className="mt-[-14px] bg-[rgba(255,77,90,0.08)] border border-[rgba(255,77,90,0.2)] rounded-full px-4 py-2 flex items-center gap-2 backdrop-blur-sm">
                        <span className="text-[#ff7070] text-[12px] font-medium tracking-wide">
                            ⚡ Average response time: Under 24 hours
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
});

export default Contact;
