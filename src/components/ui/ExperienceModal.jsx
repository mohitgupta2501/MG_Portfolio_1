import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Building2, Rocket, ExternalLink } from 'lucide-react';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

export default function ExperienceModal({ exp, onClose }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (exp) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [exp]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (exp) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [exp, onClose]);

    if (!exp) return null;

    const cardColorRgb = hexToRgb(exp.color);

    const getSystemIcon = (sys) => {
        if (sys.includes("AutoML")) return "🤖";
        if (sys.includes("Unified Gateway")) return "🔗";
        if (sys.includes("Roll Analytics")) return "📊";
        if (sys.includes("Coil")) return "🏭";
        if (sys.includes("Energy")) return "⚡";
        return "⚙️";
    };

    const formatHighlight = (text) => {
        const words = text.split(' ');
        if (words.length === 0) return text;
        const firstWord = words[0];
        const rest = words.slice(1).join(' ');
        return (
            <>
                <strong className="text-white font-semibold transition-colors duration-200">
                    {firstWord}
                </strong> {rest}
            </>
        );
    };

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/85 backdrop-blur-md"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[720px] max-h-[88vh] bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1e1e1e] rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-[36px] h-[36px] rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white flex items-center justify-center hover:bg-[#ff4d5a] hover:rotate-90 transition-all duration-300 z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar relative">

                        {/* Top decorative stripe matching project color */}
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)` }}
                        />

                        {/* Dynamic Styles for Modal */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .key-tag {
                                background-color: rgba(${cardColorRgb}, 0.07);
                                border: 1px solid rgba(${cardColorRgb}, 0.2);
                                color: ${exp.color};
                                font-size: 11px;
                                font-weight: 500;
                                border-radius: 8px;
                                padding: 5px 12px;
                                display: inline-flex;
                                align-items: center;
                                gap: 5px;
                                transition: all 0.25s ease;
                            }
                            .key-tag:hover {
                                background-color: rgba(${cardColorRgb}, 0.15);
                                border-color: rgba(${cardColorRgb}, 0.4);
                                transform: translateY(-2px) scale(1.04);
                                box-shadow: 0 4px 14px rgba(${cardColorRgb}, 0.18);
                            }
                            `
                        }} />

                        {/* Header section */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pr-12">
                            <div className="flex flex-wrap items-center gap-[6px]">
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${cardColorRgb}, 0.1)`,
                                        borderColor: `rgba(${cardColorRgb}, 0.25)`,
                                        color: exp.color
                                    }}
                                >
                                    {exp.category}
                                </span>
                                {exp.badge && (
                                    <span
                                        className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                        style={{
                                            backgroundColor: `rgba(${cardColorRgb}, 0.15)`,
                                            borderColor: `rgba(${cardColorRgb}, 0.3)`,
                                            color: exp.color
                                        }}
                                    >
                                        {exp.badge}
                                    </span>
                                )}
                            </div>

                            <div className="inline-flex items-center gap-[6px] bg-[rgba(255,255,255,0.04)] border border-[#1e1e1e] rounded-full px-[12px] py-[4px] shrink-0">
                                {exp.duration.includes("Present") ? (
                                    <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                                ) : (
                                    <div className="w-[6px] h-[6px] rounded-full bg-[#555]" />
                                )}
                                <Calendar className="w-[12px] h-[12px] text-[#888] hidden sm:block" />
                                <span className="text-[#888] text-[12px]">{exp.duration}</span>
                            </div>
                        </div>

                        <h2 className="font-bold text-white mb-2 leading-tight pr-8 mt-3 text-[24px] sm:text-[28px]">
                            {exp.role}
                        </h2>
                        <h3 className="text-[16px] text-[#aaaaaa] font-medium mb-4">
                            {exp.company}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#666666] mb-8 border-b border-[#1e1e1e] pb-6">
                            <span className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1 rounded-md bg-[#111111]">
                                {exp.type}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                {exp.location}
                            </div>
                        </div>

                        {/* Key Systems (Hitachi) */}
                        {exp.keySystems && (
                            <div className="mb-8">
                                <div className="flex items-center gap-[8px] mb-[10px]">
                                    <span className="w-[20px] h-[1px] inline-block" style={{ backgroundColor: `rgba(${cardColorRgb}, 0.5)` }} />
                                    <span className="text-[#555] text-[10px] uppercase tracking-[2.5px] font-[600]">
                                        Key Systems
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-[8px]">
                                    {exp.keySystems.map((sys, idx) => (
                                        <span key={idx} className="key-tag">
                                            {sys}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Project (Netfotech) */}
                        {exp.keyProject && (
                            <div className="mb-8">
                                <div className="flex items-center gap-[8px] mb-[10px]">
                                    <span className="w-[20px] h-[1px] inline-block" style={{ backgroundColor: `rgba(${cardColorRgb}, 0.5)` }} />
                                    <span className="text-[#555] text-[10px] uppercase tracking-[2.5px] font-[600]">
                                        Key Project
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-[8px]">
                                    <span className="key-tag">

                                        {exp.keyProject}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* CONTRIBUTIONS */}
                        <div className="mb-8">
                            <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-5 font-medium">KEY CONTRIBUTIONS</span>
                            <div className="flex flex-col gap-[16px]">
                                {exp.contributions.map((highlight, idx) => (
                                    <div key={idx} className="flex gap-[12px] items-start">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 animate-pulse bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                        />
                                        <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65] transition-colors duration-200">
                                            {formatHighlight(highlight)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SKILLS / TECH STACK */}
                        {(exp.techStack || exp.skills) && (
                            <div>
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">
                                    {exp.techStack ? "TECH STACK" : "SKILLS"}
                                </span>
                                <div className="flex flex-wrap gap-[8px]">
                                    {(exp.techStack || exp.skills).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                            style={{
                                                '--hover-color': exp.color,
                                                '--hover-rgb': cardColorRgb
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgba(${cardColorRgb}, 0.1)`;
                                                e.currentTarget.style.borderColor = `rgba(${cardColorRgb}, 0.35)`;
                                                e.currentTarget.style.color = exp.color;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                                e.currentTarget.style.borderColor = '#1e1e1e';
                                                e.currentTarget.style.color = '#aaaaaa';
                                            }}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Modal Bottom CTA */}
                        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex gap-4 w-full sm:w-auto">
                                <a
                                    href={exp.companyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[14px] font-medium transition-all duration-300 group w-full sm:w-auto"
                                    style={{
                                        borderColor: `${exp.color}50`,
                                        color: exp.color,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = exp.color;
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.borderColor = exp.color;
                                        e.currentTarget.style.boxShadow = `0 4px 14px rgba(${cardColorRgb}, 0.4)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = exp.color;
                                        e.currentTarget.style.borderColor = `${exp.color}50`;
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    View Company
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </a>
                            </div>

                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] text-[#888] bg-transparent text-[14px] font-medium flex items-center justify-center transition-all duration-300 hover:border-[#ff4d5a] hover:bg-[#ff4d5a] hover:text-white hover:shadow-[0_4px_14px_rgba(255,77,90,0.4)] w-full sm:w-auto mt-4 sm:mt-0"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}
