import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, ArrowRight, ExternalLink, Building2, GraduationCap } from 'lucide-react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

export default function ProjectModal({ project, onClose }) {
    const catRgb = project ? hexToRgb(project.color) || '255,255,255' : '255,255,255';
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
                            style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                        />

                        {/* Header section */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-2 mb-4 pr-12">
                            <div className="flex flex-wrap items-center gap-[6px]">
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${catRgb}, 0.1)`,
                                        borderColor: `rgba(${catRgb}, 0.25)`,
                                        color: project.color
                                    }}
                                >
                                    {project.category}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        ...(project.status === 'Live System' ? { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)', color: '#22c55e' } : {}),
                                        ...(project.status === 'Completed' || project.status === 'Competed' ? { backgroundColor: 'rgba(163, 163, 163, 0.1)', borderColor: 'rgba(163, 163, 163, 0.3)', color: '#a3a3a3' } : {}),
                                        ...(project.status === 'Published' ? { backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)', color: '#a855f7' } : {}),
                                        ...((project.status !== 'Live System' && project.status !== 'Completed' && project.status !== 'Competed' && project.status !== 'Published') ? { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: '#d1d5db' } : {})
                                    }}
                                >
                                    {project.status}
                                </span>
                                {project.badge && (
                                    <span
                                        className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                        style={{
                                            backgroundColor: `rgba(${catRgb}, 0.15)`,
                                            borderColor: `rgba(${catRgb}, 0.3)`,
                                            color: project.color
                                        }}
                                    >
                                        {project.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        <h2 className="font-bold text-white mb-2 leading-tight pr-8 mt-3 text-[24px] sm:text-[28px]">
                            {project.title}
                        </h2>
                        <h3 className="text-[16px] text-[#aaaaaa] font-medium mb-4 italic">
                            {project.subtitle}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#666666] mb-8 border-b border-[#1e1e1e] pb-6">
                            <span className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1 rounded-md bg-[#111111]">
                                {project.company.includes("St. Vincent Pallotti") ? (
                                    <GraduationCap className="w-4 h-4 text-[#777]" />
                                ) : (
                                    <Building2 className="w-4 h-4 text-[#777]" />
                                )}
                                {project.company}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {project.duration}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65]">
                                {project.description}
                            </p>
                        </div>

                        {/* Key Features */}
                        {project.keyFeatures && project.keyFeatures.length > 0 && (
                            <div className="mb-8" style={{ '--cat-color': project.color, '--cat-rgb': catRgb }}>
                                <style dangerouslySetInnerHTML={{
                                    __html: `
                                    .key-tag {
                                        background-color: rgba(var(--cat-rgb), 0.07);
                                        border: 1px solid rgba(var(--cat-rgb), 0.2);
                                        color: var(--cat-color);
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
                                        background-color: rgba(var(--cat-rgb), 0.15);
                                        border-color: rgba(var(--cat-rgb), 0.4);
                                        transform: translateY(-2px) scale(1.04);
                                        box-shadow: 0 4px 14px rgba(var(--cat-rgb), 0.18);
                                    }
                                    `
                                }} />
                                <div className="flex items-center gap-[8px] mb-[10px]">
                                    <span className="w-[20px] h-[1px] inline-block" style={{ backgroundColor: `rgba(${catRgb}, 0.5)` }} />
                                    <span className="text-[#555] text-[10px] uppercase tracking-[2.5px] font-[600]">
                                        Key Features
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-[8px]">
                                    {project.keyFeatures.map((feature, i) => (
                                        <span key={i} className="key-tag">
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Key Highlights */}
                        {project.keyHighlights && project.keyHighlights.length > 0 && (
                            <div className="mb-8">
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-5 font-medium">KEY HIGHLIGHTS</span>
                                <div className="flex flex-col gap-[16px]">
                                    {project.keyHighlights.map((highlight, idx) => {
                                        const firstSpaceIndex = highlight.indexOf(':');
                                        let lead = '';
                                        let rest = highlight;

                                        if (firstSpaceIndex !== -1 && firstSpaceIndex < 40) {
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
                                            <div key={idx} className="flex gap-[12px] items-start">
                                                <div
                                                    className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 animate-pulse bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                                                />
                                                <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65] transition-colors duration-200">
                                                    {lead && <strong className="text-white font-semibold transition-colors duration-200">{lead}</strong>}
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
                            <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">
                                TECH STACK
                            </span>
                            <div className="flex flex-wrap gap-[8px]">
                                {project.tech.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                        style={{
                                            '--hover-color': project.color,
                                            '--hover-rgb': catRgb
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = `rgba(${catRgb}, 0.1)`;
                                            e.currentTarget.style.borderColor = `rgba(${catRgb}, 0.35)`;
                                            e.currentTarget.style.color = project.color;
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

                        {/* Modal Bottom CTA */}
                        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">

                            <div className="flex gap-4 w-full sm:w-auto">
                                <button
                                    onClick={() => window.open(project.doc, "_blank")}
                                    className="px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[14px] font-medium transition-all duration-300 group w-full sm:w-auto"
                                    style={{
                                        borderColor: `${project.color}50`,
                                        color: project.color,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = project.color;
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.borderColor = project.color;
                                        e.currentTarget.style.boxShadow = `0 4px 14px rgba(${catRgb}, 0.4)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = project.color;
                                        e.currentTarget.style.borderColor = `${project.color}50`;
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    View Project Doc
                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </button>

                                {/* Optional View Paper CTA for research */}
                                {project.category.includes('Research') && (
                                    <button
                                        className="px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[14px] font-medium transition-all duration-300 group w-full sm:w-auto"
                                        style={{
                                            borderColor: `${project.color}50`,
                                            color: project.color,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = project.color;
                                            e.currentTarget.style.color = '#fff';
                                            e.currentTarget.style.borderColor = project.color;
                                            e.currentTarget.style.boxShadow = `0 4px 14px rgba(${catRgb}, 0.4)`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'transparent';
                                            e.currentTarget.style.color = project.color;
                                            e.currentTarget.style.borderColor = `${project.color}50`;
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        View Paper
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                    </button>
                                )}
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
