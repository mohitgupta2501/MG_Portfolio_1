import { useState, useRef, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

const EducationCard = memo(({ edu, onViewDetails, index }) => {
    const isBTech = edu.id === 'btech';
    const isHSC = edu.id === 'hsc';
    const isSSC = edu.id === 'ssc';

    const color = edu.color;
    const rgb = hexToRgb(color);

    const barRef = useRef(null);
    const [barWidth, setBarWidth] = useState(0);

    const targetWidth = isBTech ? 96 : (isHSC ? 87.67 : 89.40);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setBarWidth(targetWidth);
                observer.disconnect();
            }
        }, { threshold: 0.1 });

        if (barRef.current) observer.observe(barRef.current);
        return () => observer.disconnect();
    }, [targetWidth]);

    const getHighlights = () => {
        if (isBTech) {
            return [
                "CGPA 9.60/10 — Class Topper all 4 years",
                "2 Best Project Nominees (Barrett's + Seizure Detection)",
                "Whole College Student Representative — IQAC & CDC"
            ];
        }
        return edu.topAchievements || [];
    };

    const highlights = getHighlights();

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group relative flex flex-col h-full min-w-0 bg-[#111] border border-[#1a1a1a] rounded-2xl overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[8px] hover:scale-[1.015]"
            style={{
                '--cat-color': color,
                '--cat-rgb': rgb
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `rgba(${rgb}, 0.6)`;
                e.currentTarget.style.boxShadow = `0 20px 60px rgba(${rgb}, 0.25)`;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a';
                e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => onViewDetails(edu)}
        >
            {/* Top gradient stripe */}
            <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${color} 30%, ${color} 70%, transparent 100%)` }}
            />

            {/* Shimmer sweep animation */}
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.03)_50%,transparent_60%)] -translate-x-full transition-transform duration-[600ms] ease-out group-hover:translate-x-full pointer-events-none z-10" />

            {/* Left Accent Bar */}
            <div className="absolute top-[20%] bottom-[20%] left-0 w-[3px] rounded-r-md transition-colors duration-300"
                style={{
                    backgroundColor: `rgba(${rgb}, 0.3)`,
                    boxShadow: `2px 0 8px rgba(${rgb}, 0)`
                }}
            />
            {/* Hover state for Left Accent Bar handled by CSS class/group */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .group:hover .left-accent-${edu.id} {
                    background-color: rgba(${rgb}, 1) !important;
                    box-shadow: 2px 0 12px rgba(${rgb}, 0.4) !important;
                }
            `}} />
            <div className={`absolute top-[20%] bottom-[20%] left-0 w-[3px] rounded-r-md transition-all duration-300 left-accent-${edu.id}`}
                style={{ backgroundColor: `rgba(${rgb}, 0.3)` }} />

                <div className="p-6 max-[480px]:p-4 min-[481px]:p-8 flex flex-col flex-grow relative z-20 cursor-pointer min-w-0">

                {/* TOP SECTION: Badges */}
                <div className="flex items-center justify-between gap-2 mb-4 w-full">
                    {isBTech ? (
                        <>
                            <span
                                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase border transition-all duration-300"
                                style={{ backgroundColor: 'rgba(255,77,90,0.12)', borderColor: 'rgba(255,77,90,0.3)', color: '#ff4d5a' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 0 14px rgba(255,77,90,0.28)';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,77,90,0.18)';
                                    e.currentTarget.style.borderColor = 'rgba(255,77,90,0.45)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.backgroundColor = 'rgba(255,77,90,0.12)';
                                    e.currentTarget.style.borderColor = 'rgba(255,77,90,0.3)';
                                }}
                            >
                                B.TECH
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase bg-green-500/10 border border-green-500/20 text-green-500">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse-ring_2s_ease_infinite]" />
                                Currently Pursuing
                            </span>
                        </>
                    ) : (
                        <>
                            <span
                                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase border transition-all duration-300"
                                style={isHSC
                                    ? { backgroundColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)', color: '#f59e0b' }
                                    : { backgroundColor: 'rgba(34,197,94,0.12)', borderColor: 'rgba(34,197,94,0.3)', color: '#22c55e' }
                                }
                                onMouseEnter={(e) => {
                                    if (isHSC) {
                                        e.currentTarget.style.boxShadow = '0 0 14px rgba(245,158,11,0.24)';
                                        e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.18)';
                                        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.45)';
                                    } else {
                                        e.currentTarget.style.boxShadow = '0 0 14px rgba(34,197,94,0.22)';
                                        e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.18)';
                                        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.45)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    if (isHSC) {
                                        e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.12)';
                                        e.currentTarget.style.borderColor = 'rgba(245,158,11,0.3)';
                                    } else {
                                        e.currentTarget.style.backgroundColor = 'rgba(34,197,94,0.12)';
                                        e.currentTarget.style.borderColor = 'rgba(34,197,94,0.3)';
                                    }
                                }}
                            >
                                {edu.category}
                            </span>
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold tracking-[2px] uppercase bg-green-500/10 border border-green-500/20 text-green-500">
                                Completed
                            </span>
                        </>
                    )}
                </div>

                {/* CONTENT */}
                <h3 className="text-white font-[700] text-[17px] max-[480px]:text-[15px] min-[481px]:text-[18px] leading-[1.3] mb-1 transition-colors duration-300 group-hover:!text-[var(--cat-color)] break-words">
                    {edu.institution}
                </h3>

                {edu.board && (
                    <div className="text-[#888] text-[12px] mb-1">{edu.board}</div>
                )}

                <div className="text-[#aaa] text-[13px] italic mb-4">
                    {edu.degree}
                </div>

                <div className="flex items-center gap-4 text-[#888] text-[12px] font-medium mb-6">
                    <div className="flex items-center gap-1.5">
                        <MapPin size={14} className="opacity-70" />
                        {edu.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="opacity-70" />
                        {edu.duration}
                    </div>
                </div>

                <div className="w-full h-[1px] bg-gradient-to-r from-[#222] to-transparent mb-6" />

                {/* SCORE DISPLAY */}
                <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-[800] text-[42px] sm:text-[48px] leading-none" style={{ color: color }}>
                            {isBTech ? edu.cgpa.value : edu.percentage}
                        </span>
                        {isBTech && (
                            <span className="text-[#666] text-[16px] font-medium">/{edu.cgpa.outOf} CGPA</span>
                        )}
                    </div>
                    <div className="text-[#888] text-[13px] font-medium mb-3">
                        {isBTech ? edu.cgpa.description : edu.achievementBadge}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-[#1a1a1a] rounded-full overflow-hidden" ref={barRef}>
                        <div
                            className="h-full rounded-full transition-all duration-[1.5s] ease-out"
                            style={{
                                width: `${barWidth}%`,
                                background: `linear-gradient(to right, ${color}, rgba(${rgb}, 0.4))`
                            }}
                        />
                    </div>
                </div>

                {/* ACHIEVEMENT PILLS REMOVED FOR B.TECH AS PER REQUEST */}

                {/* TOP 3 HIGHLIGHTS */}
                <ul className="flex flex-col gap-2.5 mb-8 flex-grow min-w-0">
                    {highlights.slice(0, 3).map((hl, i) => (
                        <li key={i} className="flex gap-3 items-start text-[13px] max-[480px]:text-[12px] text-[#aaa] leading-[1.5] break-words">
                            <div className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0"
                                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                            <span>{hl}</span>
                        </li>
                    ))}
                </ul>

                {/* TAGS (SSC & HSC) */}
                {!isBTech && edu.skills && (
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {edu.skills.map((skill, i) => (
                            <span key={i} className="tag-pill"
                                style={{
                                    backgroundColor: `rgba(${rgb}, 0.08)`,
                                    borderColor: `rgba(${rgb}, 0.2)`,
                                    color: color
                                }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                )}

                {/* BOTTOM BUTTON REMOVED AS PER REQUEST */}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .tag-pill {
                    font-size: 11px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    border-radius: 8px;
                    padding: 4px 10px;
                    border: 1px solid transparent;
                    transition: all 0.3s ease;
                }
                .tag-pill:hover {
                    background-color: rgba(var(--cat-rgb), 0.15) !important;
                    border-color: rgba(var(--cat-rgb), 0.4) !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(var(--cat-rgb), 0.2);
                }
                .group:hover .btn-hover {
                    background-color: var(--cat-color) !important;
                    color: #000 !important;
                }
            `}} />
        </motion.div>
    );
});

function hexToRgb(hex) {
    if (!hex) return '255, 255, 255';
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
}

export default EducationCard;
