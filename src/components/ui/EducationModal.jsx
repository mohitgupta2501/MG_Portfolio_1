import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Award, Star, BookOpen, Trophy } from 'lucide-react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 77, 90';
};

export default function EducationModal({ edu, onClose }) {
    useEffect(() => {
        if (edu) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [edu]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (edu) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [edu, onClose]);

    if (!edu) return null;

    const colorRgb = hexToRgb(edu.color);
    const safeResearchProjects = Array.isArray(edu.activities?.research) ? edu.activities.research : [];
    const safeLeadershipRoles = Array.isArray(edu.activities?.leadership?.roles) ? edu.activities.leadership.roles : [];
    const safeSportsHighlights = Array.isArray(edu.activities?.sports?.highlights) ? edu.activities.sports.highlights : [];
    const sportsSummary = edu.activities?.sports?.summary;

    const renderBTechDetails = () => (
        <>
            {/* CGPA Section */}
            <div className="mb-10">
                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">ACADEMIC EXCELLENCE</span>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-6">
                    <div className="flex items-baseline gap-2">
                        <span className="text-[48px] font-[900] leading-none text-[#ff4d5a]">{edu.cgpa.value}</span>
                        <span className="text-[20px] text-[#555]">/{edu.cgpa.outOf}</span>
                        <span className="text-[12px] text-[#555] uppercase tracking-wider ml-1">CGPA</span>
                    </div>
                    {edu.cgpa.description && (
                        <div className="px-4 py-2 rounded-lg bg-[#ff4d5a]/10 border border-[#ff4d5a]/30 text-[#ff4d5a] text-[13px] font-bold tracking-wide">
                            {edu.cgpa.description}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {edu.cgpa.semesters.map((sem, idx) => (
                        <div key={idx} className="bg-[#111] border border-[#222] rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden group">
                            {sem.perfect && (
                                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff4d5a] to-transparent opacity-50" />
                            )}
                            <span className="text-[#888] text-[11px] uppercase tracking-wider mb-1">{sem.sem}</span>
                            <span className={`text-[18px] font-bold ${sem.perfect ? 'text-[#ff4d5a] flex items-center gap-1' : 'text-white'}`}>
                                {sem.value || '-'} {sem.perfect && <Star className="w-3.5 h-3.5 fill-[#ff4d5a]" />}
                            </span>
                        </div>
                    ))}
                </div>

                {edu.cgpa.awards && edu.cgpa.awards.map((award, idx) => (
                    <div key={idx} className="inline-flex items-center gap-2 bg-[#ff4d5a]/10 border border-[#ff4d5a]/30 text-[#ff4d5a] text-[13px] rounded-full px-4 py-2 mt-2">
                        {award}
                    </div>
                ))}
            </div>

            {/* Research */}
            <div className="mb-10">
                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">RESEARCH PROJECTS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {safeResearchProjects.map((project, idx) => (
                        <div key={idx} className="bg-[#0d0d0d] border border-[#1a1a1a] rounded-xl p-5 hover:border-[#ff4d5a]/30 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-pink-500" />
                                <h4 className="text-white font-bold text-[14px] leading-tight flex-1">{project.title}</h4>
                            </div>
                            <p className="text-[#666] text-[12px] mb-3">{project.institution}</p>
                            <span className="inline-block px-2 py-1 bg-amber-500/10 text-amber-500 text-[10px] rounded mb-3 border border-amber-500/20">{project.status}</span>
                            <p className="text-[#888] text-[13px] leading-relaxed">{project.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Leadership */}
            <div className="mb-10">
                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">LEADERSHIP & ACTIVITIES</span>
                <div className="flex flex-wrap gap-3">
                    {safeLeadershipRoles.map((role, idx) => (
                        <div key={idx} className="bg-[#111] border-l-4 border-l-[#ff4d5a] rounded-r-lg p-3 pr-5 min-w-[200px]">
                            <h4 className="text-white font-bold text-[13px] leading-tight mb-1">{role.role}</h4>
                            <span className="text-[#666] text-[11px] tracking-wide">{role.duration}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sports */}
            <div className="mb-6">
                <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">SPORTS ACHIEVEMENTS</span>
                <div className="flex items-center gap-3 mb-5">
                    <Trophy className="w-6 h-6 text-[#ff4d5a]" />
                    <span className="text-white text-[18px] font-bold">{sportsSummary}</span>
                </div>
                <ul className="flex flex-col gap-3">
                    {safeSportsHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex gap-3 items-start">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 bg-[#ff4d5a]" />
                            <p className="text-[#aaa] text-[14px]">
                                {highlight.includes('4× Gold Medalist') || highlight.includes('4× RTMNU Gold') ? (
                                    <span className="text-[#ff4d5a] font-medium">{highlight}</span>
                                ) : (
                                    highlight
                                )}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );

    const renderSecondaryDetails = () => (
        <>
            <div className="mb-10 flex flex-col sm:flex-row items-center sm:items-baseline gap-4 sm:gap-6 border-b border-[#111] pb-8">
                <div className="flex items-baseline gap-1">
                    <span className="text-[56px] font-[900] leading-none" style={{ color: edu.color }}>{edu.percentage}</span>
                </div>
                {edu.achievementBadge && (
                    <div className="px-4 py-2 rounded-lg border text-[13px] font-bold tracking-wide"
                        style={{ backgroundColor: `rgba(${colorRgb}, 0.1)`, borderColor: `rgba(${colorRgb}, 0.3)`, color: edu.color }}>
                        {edu.achievementBadge}
                    </div>
                )}
            </div>

            {edu.category === 'SSC' && edu.modalDetails.abacus && (
                <div className="mb-10">
                    <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">ABACUS & VEDIC MATHEMATICS</span>

                    <div className="bg-gradient-to-br from-[#1a1500] to-[#0a0a0a] border border-amber-500/30 rounded-2xl p-6 mb-5 relative overflow-hidden">
                        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                            <Trophy className="w-40 h-40 text-amber-500" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-500 border border-amber-500/40 px-4 py-2 rounded-full text-[14px] font-bold mb-4">
                                🏆 {edu.modalDetails.abacus.trophy}
                            </div>
                            <p className="text-white text-[16px] font-medium mb-4">{edu.modalDetails.abacus.medals}</p>
                            <ul className="flex flex-col gap-2">
                                {edu.modalDetails.abacus.highlights.map((h, i) => (
                                    <li key={i} className="flex gap-2 items-start text-[#aaa] text-[14px]">
                                        <span className="text-amber-500 mt-0.5">•</span> {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            {edu.category === 'SSC' && edu.modalDetails.mathematics && (
                <div className="mb-10">
                    <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">MATHEMATICS EXCELLENCE</span>
                    <ul className="flex flex-col gap-3">
                        {edu.modalDetails.mathematics.map((h, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ backgroundColor: edu.color }} />
                                <p className="text-[#aaa] text-[14px]">{h}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {edu.category === 'SSC' && edu.modalDetails.leadership && (
                <div className="mb-6">
                    <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">LEADERSHIP ROLES</span>
                    <ul className="flex flex-col gap-3">
                        {edu.modalDetails.leadership.map((h, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <Award className="w-4 h-4 mt-0.5" style={{ color: edu.color }} />
                                <p className="text-[#aaa] text-[14px]">{h}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {edu.category === 'HSC' && edu.modalDetails.sports && (
                <div className="mb-6">
                    <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">SPORTS & EXTRACURRICULAR</span>
                    <ul className="flex flex-col gap-3">
                        {edu.modalDetails.sports.map((h, i) => (
                            <li key={i} className="flex gap-3 items-start">
                                <Trophy className="w-4 h-4 mt-0.5" style={{ color: edu.color }} />
                                <p className="text-[#aaa] text-[14px]">{h}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={{ duration: 0.25 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/85 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[720px] max-h-[88vh] bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1e1e1e] rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
                >
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 w-[36px] h-[36px] rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-white flex items-center justify-center hover:bg-[#ff4d5a] hover:rotate-90 transition-all duration-300 z-20"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar relative">
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)` }}
                        />

                        <div className="flex flex-wrap items-center gap-4 mb-4 pr-12">
                            {edu.type === 'primary' && (
                                <>
                                    <div className="inline-flex items-center gap-2 bg-[#ff4d5a]/10 border border-[#ff4d5a]/30 text-[#ff4d5a] text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                                        {edu.badge}
                                    </div>
                                    <span className="px-3 py-1.5 rounded-full bg-white/5 border border-[#222] text-[#888] text-[11px] font-medium tracking-wide">
                                        B.Tech
                                    </span>
                                </>
                            )}
                            {edu.type === 'secondary' && (
                                <>
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border"
                                        style={{ backgroundColor: `rgba(${colorRgb}, 0.1)`, borderColor: `rgba(${colorRgb}, 0.25)`, color: edu.color }}>
                                        {edu.category}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase border bg-[#22c55e]/10 border-[#22c55e]/25 text-[#22c55e]">
                                        Completed ✓
                                    </span>
                                </>
                            )}
                        </div>

                        <h2 className="font-bold text-white mb-2 leading-tight pr-8 mt-3 text-[26px]">
                            {edu.institution}
                        </h2>

                        <h3 className="text-[17px] font-medium mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#aaa]">
                            {edu.degree}
                            {edu.field && ` — ${edu.field}`}
                        </h3>

                        <div className="flex flex-wrap items-center gap-6 text-[13px] text-[#666] mb-8 border-b border-[#1e1e1e] pb-6">
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#aaa]" />
                                {edu.location}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#aaa]" />
                                {edu.duration}
                            </div>
                        </div>

                        {edu.type === 'primary' ? renderBTechDetails() : renderSecondaryDetails()}

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-center sm:justify-end">
                            <button
                                onClick={onClose}
                                className="text-[#666] text-[14px] font-medium hover:text-white transition-colors w-full sm:w-auto text-center px-6 py-2"
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
