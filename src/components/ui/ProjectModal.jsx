import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, ExternalLink } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [project]);

    // Handle Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (project) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [project, onClose]);

    if (!project) return null;

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                {/* Overlay */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/85 backdrop-blur-md"
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
                    className="relative w-full max-w-[720px] max-h-[90vh] sm:max-h-[85vh] bg-[#0f0f0f] border border-[#1e1e1e] rounded-[24px] sm:rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full bg-black/20 text-gray-400 hover:text-[#ff4d5a] hover:bg-[#ff4d5a]/10 transition-colors z-10"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar relative">

                        {/* Top decorative stripe matching project color */}
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                        />

                        {/* Header section */}
                        <div className="flex flex-wrap gap-2 mb-4 pr-12">
                            <span
                                className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium tracking-wide uppercase"
                                style={{
                                    backgroundColor: `${project.color}15`, // 15% opacity
                                    color: project.color,
                                    border: `1px solid ${project.color}30`
                                }}
                            >
                                {project.category}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium tracking-wide border border-white/10 bg-white/5 text-gray-300">
                                {project.status}
                            </span>
                            <span className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-medium tracking-wide border border-white/10 bg-white/5 text-gray-300">
                                {project.badge}
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight pr-8">
                            {project.title}
                        </h2>
                        <h3 className="text-lg sm:text-xl text-gray-400 mb-4 font-light">
                            {project.subtitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8 border-b border-white/5 pb-6">
                            <span className="flex items-center gap-1.5 font-medium text-gray-300">
                                {project.company}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-gray-600" />
                            <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {project.duration}
                            </span>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-gray-300 text-[15px] sm:text-[16px] leading-[1.7]">
                                {project.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        {project.keyFeatures && project.keyFeatures.length > 0 && (
                            <div className="mb-8">
                                <h4 className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-semibold">
                                    Key Features
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.keyFeatures.map((feature, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-transform hover:scale-105"
                                            style={{
                                                backgroundColor: `${project.color}12`,
                                                color: project.color,
                                                border: `1px solid ${project.color}33`,
                                                textShadow: `0 0 10px ${project.color}40`
                                            }}
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Highlights */}
                        {project.keyHighlights && project.keyHighlights.length > 0 && (
                            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                                <h4 className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-5 font-semibold">
                                    Key Highlights
                                </h4>
                                <div className="flex flex-col gap-4 text-gray-300 text-[14px] sm:text-[15px]">
                                    {project.keyHighlights.map((highlight, idx) => {
                                        const firstSpaceIndex = highlight.indexOf(':');
                                        let lead = '';
                                        let rest = highlight;

                                        if (firstSpaceIndex !== -1 && firstSpaceIndex < 40) { // arbitrary limit to assure it's a short lead
                                            lead = highlight.substring(0, firstSpaceIndex + 1);
                                            rest = highlight.substring(firstSpaceIndex + 1);
                                        } else {
                                            const words = highlight.split(' ');
                                            if (words.length > 1) {
                                                lead = words[0] + ' ';
                                                rest = words.slice(1).join(' ');
                                            }
                                        }

                                        return (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 animate-pulse"
                                                    style={{
                                                        backgroundColor: project.color,
                                                        boxShadow: `0 0 8px ${project.color}`
                                                    }}
                                                />
                                                <p className="leading-relaxed">
                                                    {lead && <strong className="text-white font-semibold">{lead}</strong>}
                                                    {rest}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Tech Stack */}
                        <div>
                            <h4 className="text-[11px] sm:text-[12px] uppercase tracking-[0.15em] text-gray-500 mb-4 font-semibold">
                                Tech Stack
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1.5 bg-[#ffffff05] border border-[#ffffff10] text-[#aaaaaa] rounded-full text-[13px] hover:text-white transition-colors duration-300"
                                        style={{
                                            '--hover-color': project.color,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = project.color + '80';
                                            e.currentTarget.style.color = project.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#ffffff10';
                                            e.currentTarget.style.color = '#aaaaaa';
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Modal Bottom CTA */}
                        <div className="mt-10 pt-6 border-t border-white/10 flex justify-end gap-4">
                            {/* Optional View Paper CTA for research */}
                            {project.category.includes('Research') && (
                                <button
                                    className="px-5 py-2.5 rounded-xl border flex items-center gap-2 text-[14px] font-medium transition-all group hover:bg-white/10"
                                    style={{
                                        borderColor: `${project.color}50`,
                                        color: project.color
                                    }}
                                >
                                    Read Paper
                                    <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </button>
                            )}
                        </div>

                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
}
