import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Linkedin } from 'lucide-react';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '167, 139, 250';
};

export default function VolunteeringModal({ item, onClose }) {
    const cardRef = useRef(null);
    const previouslyFocused = useRef(null);

    // Lock body scroll, manage focus trap + focus return
    useEffect(() => {
        if (item) {
            previouslyFocused.current = document.activeElement;
            document.body.style.overflow = 'hidden';

            // Move focus into the dialog on open
            const focusTimer = window.setTimeout(() => {
                const focusable = cardRef.current?.querySelector(
                    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
                );
                focusable?.focus();
            }, 50);

            return () => {
                window.clearTimeout(focusTimer);
                document.body.style.overflow = 'unset';
                // Return focus to the element that opened the dialog
                if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
                    previouslyFocused.current.focus();
                }
            };
        }
    }, [item]);

    // Escape to close + Tab focus trap
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!item) return;

            if (e.key === 'Escape') {
                onClose();
                return;
            }

            if (e.key !== 'Tab' || !cardRef.current) return;

            const nodes = cardRef.current.querySelectorAll(
                'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );
            const focusable = Array.from(nodes).filter((el) => el.offsetParent !== null);
            if (focusable.length === 0) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        if (item) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [item, onClose]);

    if (!item) return null;

    const cardColorRgb = hexToRgb(item.color);

    // Bold the leading verb of each contribution (same behaviour as Experience)
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
            <div
                className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6"
                style={{
                    paddingTop: 'max(1rem, env(safe-area-inset-top))',
                    paddingBottom: 'max(1rem, env(safe-area-inset-bottom))'
                }}
            >
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
                    ref={cardRef}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${item.title} — ${item.company}`}
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[720px] max-h-[88dvh] bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1e1e1e] rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute top-3 right-3 w-11 h-11 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white flex items-center justify-center hover:bg-[#a78bfa] hover:rotate-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] transition-all duration-300 z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Scrollable Content */}
                    <div className="overflow-y-auto p-5 sm:p-8 custom-scrollbar-volunteer relative">

                        {/* Top decorative stripe matching volunteering color */}
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                        />

                        {/* Dynamic Styles for Modal */}
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .custom-scrollbar-volunteer::-webkit-scrollbar { width: 4px; height: 4px; }
                            .custom-scrollbar-volunteer::-webkit-scrollbar-track { background: #1a1a1a; border-radius: 4px; }
                            .custom-scrollbar-volunteer::-webkit-scrollbar-thumb { background: ${item.color}; border-radius: 4px; }
                            .key-tag-volunteer {
                                background-color: rgba(${cardColorRgb}, 0.07);
                                border: 1px solid rgba(${cardColorRgb}, 0.2);
                                color: ${item.color};
                                font-size: 11px;
                                font-weight: 500;
                                border-radius: 8px;
                                padding: 5px 12px;
                                display: inline-flex;
                                align-items: center;
                                gap: 5px;
                                transition: all 0.25s ease;
                            }
                            .key-tag-volunteer:hover {
                                background-color: rgba(${cardColorRgb}, 0.15);
                                border-color: rgba(${cardColorRgb}, 0.4);
                                transform: translateY(-2px) scale(1.04);
                                box-shadow: 0 4px 14px rgba(${cardColorRgb}, 0.18);
                            }
                            `
                        }} />

                        {/* Header section */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pr-14">
                            <div className="flex flex-wrap items-center gap-[6px]">
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${cardColorRgb}, 0.1)`,
                                        borderColor: `rgba(${cardColorRgb}, 0.25)`,
                                        color: item.color
                                    }}
                                >
                                    {item.rolePill}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${cardColorRgb}, 0.15)`,
                                        borderColor: `rgba(${cardColorRgb}, 0.3)`,
                                        color: item.color
                                    }}
                                >
                                    Volunteering
                                </span>
                            </div>

                            <div className="inline-flex items-center gap-[6px] bg-[rgba(255,255,255,0.04)] border border-[#1e1e1e] rounded-full px-[12px] py-[4px] shrink-0">
                                {item.duration.includes("Present") ? (
                                    <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                                ) : (
                                    <div className="w-[6px] h-[6px] rounded-full bg-[#555]" />
                                )}
                                <Calendar className="w-[12px] h-[12px] text-[#888] hidden sm:block" />
                                <span className="text-[#888] text-[12px] whitespace-nowrap">{item.duration}</span>
                            </div>
                        </div>

                        <h2 className="font-bold text-white mb-1.5 leading-tight pr-8 mt-2 text-[21px] sm:text-[25px]">
                            {item.title}
                        </h2>
                        <h3 className="text-[15px] text-[#aaaaaa] font-medium mb-3">
                            {item.company}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#666666] mb-6 border-b border-[#1e1e1e] pb-5">
                            <span className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1 rounded-md bg-[#111111]">
                                <MapPin className="w-3.5 h-3.5" />
                                {item.location}
                            </span>
                        </div>

                        {/* FOCUS AREAS (replaces KEY SYSTEMS) */}
                        {item.focusAreas && item.focusAreas.length > 0 && (
                            <div className="mb-6">
                                <div className="flex items-center gap-[8px] mb-[8px]">
                                    <span className="w-[20px] h-[1px] inline-block" style={{ backgroundColor: `rgba(${cardColorRgb}, 0.5)` }} />
                                    <span className="text-[#555] text-[10px] uppercase tracking-[2.5px] font-[600]">
                                        FOCUS AREAS
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-[8px]">
                                    {item.focusAreas.map((area, idx) => (
                                        <span key={idx} className="key-tag-volunteer">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* KEY CONTRIBUTIONS */}
                        <div className="mb-6">
                            <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">KEY CONTRIBUTIONS</span>
                            <div className="flex flex-col gap-[12px]">
                                {item.contributions.map((highlight, idx) => (
                                    <div key={idx} className="flex gap-[12px] items-start">
                                        <div
                                            className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 animate-pulse"
                                            style={{ backgroundColor: item.color, boxShadow: `0 0 8px rgba(${cardColorRgb}, 0.6)` }}
                                        />
                                        <p className="text-[#aaaaaa] text-[13.5px] sm:text-[14.5px] leading-[1.6] transition-colors duration-200">
                                            {formatHighlight(highlight)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* SKILLS APPLIED (replaces TECH STACK) */}
                        {item.skills && item.skills.length > 0 && (
                            <div>
                                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-3 font-medium">
                                    SKILLS APPLIED
                                </span>
                                <div className="flex flex-wrap gap-[8px]">
                                    {item.skills.map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = `rgba(${cardColorRgb}, 0.1)`;
                                                e.currentTarget.style.borderColor = `rgba(${cardColorRgb}, 0.35)`;
                                                e.currentTarget.style.color = item.color;
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
                        <div className="mt-7 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                            {item.linkedinUrl ? (
                                <a
                                    href={item.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-3 min-h-[44px] rounded-xl border flex items-center justify-center gap-2 text-[13.5px] font-medium transition-all duration-300 group w-full sm:w-auto"
                                    style={{ borderColor: `${item.color}50`, color: item.color }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = item.color;
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.borderColor = item.color;
                                        e.currentTarget.style.boxShadow = `0 4px 14px rgba(${cardColorRgb}, 0.4)`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = item.color;
                                        e.currentTarget.style.borderColor = `${item.color}50`;
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    View LinkedIn Page
                                    <Linkedin className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </a>
                            ) : (
                                <div className="hidden sm:block" />
                            )}

                            <button
                                onClick={onClose}
                                className="px-5 py-3 min-h-[44px] rounded-xl border border-[#2a2a2a] text-[#888] bg-transparent text-[13.5px] font-medium flex items-center justify-center transition-all duration-300 hover:border-[#a78bfa] hover:bg-[#a78bfa] hover:text-white hover:shadow-[0_4px_14px_rgba(167,139,250,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] w-full sm:w-auto"
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
