import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, Calendar, Zap, Star, ArrowRight, ExternalLink } from 'lucide-react';

const ResearchModal = ({ research, onClose }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Escape key
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            document.body.style.overflow = 'auto';
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    if (!mounted) return null;

    if (!research) return null;

    const {
        id, title, subtitle, institution, duration, published, category, color, type,
        abstract, keyAchievements, modelsUsed, modelsEvaluated, techStack, metrics, impact,
        methodology
    } = research;

    const safeKeyAchievements = Array.isArray(keyAchievements) ? keyAchievements : [];
    const safeModelsUsed = Array.isArray(modelsUsed) ? modelsUsed : [];
    const safeModelsEvaluated = Array.isArray(modelsEvaluated) ? modelsEvaluated : [];
    const safeTechStack = Array.isArray(techStack) ? techStack : [];
    const safeMethodology = Array.isArray(methodology) ? methodology : [];

    if (process.env.NODE_ENV !== 'production') {
        if (keyAchievements != null && !Array.isArray(keyAchievements)) console.warn('ResearchModal: expected keyAchievements to be an array');
        if (modelsUsed != null && !Array.isArray(modelsUsed)) console.warn('ResearchModal: expected modelsUsed to be an array');
        if (modelsEvaluated != null && !Array.isArray(modelsEvaluated)) console.warn('ResearchModal: expected modelsEvaluated to be an array');
        if (techStack != null && !Array.isArray(techStack)) console.warn('ResearchModal: expected techStack to be an array');
        if (methodology != null && !Array.isArray(methodology)) console.warn('ResearchModal: expected methodology to be an array');
    }

    const metricKeys = metrics ? Object.keys(metrics) : [];
    const models = safeModelsUsed.length > 0 ? safeModelsUsed : safeModelsEvaluated;
    const ImpactIcon = category === 'Generative AI' ? Star : Zap;

    // Render section header helper
    const SectionHeader = ({ title }) => (
        <div className="flex items-center gap-[8px] mb-[16px]">
            <span className="w-[20px] h-[1px] inline-block" style={{ backgroundColor: `rgba(${hexToRgb(color)}, 0.5)` }} />
            <span className="text-[#555] text-[10px] uppercase tracking-[2.5px] font-[600]">
                {title}
            </span>
        </div>
    );

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-[#000000e0] backdrop-blur-[10px]"
                    onClick={onClose}
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[720px] max-h-[88vh] bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1e1e1e] rounded-[28px] overflow-hidden flex flex-col shadow-2xl z-[1001]"
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

                        {/* Top decorative gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

                        {/* Top decorative stripe */}
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
                        />

                        {/* Header Section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-2 mb-4 pr-12 relative z-10">
                            <div className="flex flex-wrap items-center gap-[6px]">
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${hexToRgb(color)}, 0.1)`,
                                        borderColor: `rgba(${hexToRgb(color)}, 0.25)`,
                                        color: color
                                    }}
                                >
                                    {category}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border border-[#1e1e1e] bg-white/5 text-[#888]"
                                >
                                    {type}
                                </span>
                                <span className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border border-green-500/25 bg-green-500/10 text-green-500 flex items-center">
                                    <span className="w-[5px] h-[5px] rounded-full bg-[#22c55e] animate-pulse inline-block mr-1.5" />
                                    {published}
                                </span>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <h2 className="font-bold text-white mb-2 leading-tight pr-8 mt-3 text-[24px] sm:text-[28px]">
                                {title}
                            </h2>
                            <h3 className="text-[16px] text-[#aaaaaa] font-medium mb-4 italic">
                                {subtitle}
                            </h3>

                            <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#666666] mb-8 border-b border-[#1e1e1e] pb-6">
                                <span className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1 rounded-md bg-[#111111]">
                                    {institution}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {duration}
                                </div>
                            </div>

                            {/* Abstract */}
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">ABSTRACT</span>
                                <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65]">
                                    {abstract}
                                </p>
                            </div>

                            {/* Key Achievements */}
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-5 font-medium">KEY ACHIEVEMENTS</span>
                                <div className="flex flex-col gap-[16px]">
                                    {safeKeyAchievements.map((item, i) => {
                                        const firstSpace = item.indexOf(' ');
                                        const firstWord = item.substring(0, firstSpace !== -1 ? firstSpace : item.length);
                                        const rest = firstSpace !== -1 ? item.substring(firstSpace) : '';
                                        return (
                                            <div key={i} className="flex gap-[12px] items-start">
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 animate-pulse bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                                />
                                                <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65]">
                                                    {firstWord && <strong className="text-white font-semibold transition-colors duration-200">{firstWord}</strong>}{rest}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Models Used */}
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">
                                    MODELS USED
                                </span>
                                <div className="flex flex-wrap gap-[8px]">
                                    {models.map((model, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgba(${hexToRgb(color)}, 0.15)`;
                                                e.currentTarget.style.borderColor = `rgba(${hexToRgb(color)}, 0.4)`;
                                                e.currentTarget.style.color = color;
                                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                                                e.currentTarget.style.boxShadow = `0 4px 14px rgba(${hexToRgb(color)}, 0.18)`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                                e.currentTarget.style.borderColor = '#1e1e1e';
                                                e.currentTarget.style.color = '#aaaaaa';
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            {model}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">TECH STACK</span>
                                <div className="flex flex-wrap gap-[8px]">
                                    {safeTechStack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgba(${hexToRgb(color)}, 0.15)`;
                                                e.currentTarget.style.borderColor = `rgba(${hexToRgb(color)}, 0.4)`;
                                                e.currentTarget.style.color = color;
                                                e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
                                                e.currentTarget.style.boxShadow = `0 4px 14px rgba(${hexToRgb(color)}, 0.18)`;
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                                e.currentTarget.style.borderColor = '#1e1e1e';
                                                e.currentTarget.style.color = '#aaaaaa';
                                                e.currentTarget.style.transform = 'none';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Real-World Impact */}
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">REAL-WORLD IMPACT</span>
                                <div
                                    className="rounded-2xl p-6 border transition-all duration-300"
                                    style={{ backgroundColor: `rgba(${hexToRgb(color)}, 0.05)`, borderColor: `rgba(${hexToRgb(color)}, 0.2)` }}
                                >
                                    <p className="text-white text-[15px] leading-[1.7]">
                                        {impact}
                                    </p>
                                </div>
                            </div>

                            {/* Modal Bottom CTA */}
                            <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <button
                                        className="px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[14px] font-medium transition-all duration-300 group w-full sm:w-auto"
                                        style={{ borderColor: `${color}50`, color }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = color;
                                            e.currentTarget.style.color = '#fff';
                                            e.currentTarget.style.borderColor = color;
                                            e.currentTarget.style.boxShadow = `0 4px 14px rgba(${hexToRgb(color)}, 0.4)`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = color;
                                            e.currentTarget.style.borderColor = `${color}50`;
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                        onClick={() => window.open(doc, '_blank')}
                                    >
                                        View Doc
                                        <ExternalLink className="w-4 h-4 ml-1.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </button>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] text-[#888] bg-transparent text-[14px] font-medium flex items-center justify-center transition-all duration-300 hover:border-[#ff4d5a] hover:bg-[#ff4d5a] hover:text-white hover:shadow-[0_4px_14px_rgba(255,77,90,0.4)] w-full sm:w-auto mt-4 sm:mt-0"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

// Helper for dynamic colors
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}

export default React.memo(ResearchModal);
