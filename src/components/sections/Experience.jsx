import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, Rocket, Briefcase, Clock } from 'lucide-react';
import { experienceData } from '@/data/experience';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const FilterTabs = ({ categories, activeCategory, setActiveCategory, categoryCounts }) => {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center gap-[10px] overflow-x-auto pb-4 md:pb-0 mb-16 scrollbar-hide px-4 md:px-0 w-full max-w-[800px] mx-auto"
        >
            {categories.map((cat, idx) => {
                const isActive = activeCategory === cat;
                return (
                    <button
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className={`group relative flex items-center gap-[8px] whitespace-nowrap px-[20px] py-[8px] rounded-full text-[13px] font-medium transition-all duration-300 border ${isActive
                                ? 'bg-[linear-gradient(135deg,#ff4d5a,#ff7043)] border-transparent text-white font-[600] shadow-[0_4px_20px_rgba(255,77,90,0.35)] -translate-y-[2px]'
                                : 'bg-[#111111] border-[#1e1e1e] text-[#888888] hover:border-[rgba(255,77,90,0.3)] hover:text-[#cccccc] hover:-translate-y-[1px]'
                            }`}
                    >
                        {cat}
                        <span className={`inline-flex items-center justify-center px-[6px] py-[2px] rounded-full text-[10px] transition-colors duration-300 ${isActive ? 'bg-[rgba(255,255,255,0.2)] text-white' : 'bg-[rgba(255,255,255,0.08)] text-[#888888] group-hover:text-[#aaa]'
                            }`}>
                            {categoryCounts[cat]}
                        </span>
                    </button>
                );
            })}
        </motion.div>
    );
};

const StatCard = ({ icon: Icon, num, label, colorClass }) => {
    return (
        <div className="group bg-[linear-gradient(145deg,#111111,#0d0d0d)] border border-[#1a1a1a] rounded-[16px] py-5 px-3 sm:px-4 text-center flex-1 transition-all duration-400 hover:-translate-y-[3px] hover:border-[rgba(255,77,90,0.3)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-center mb-3">
                <Icon className={`w-[20px] h-[20px] ${colorClass} transition-transform duration-500 ease-in-out group-hover:rotate-[360deg]`} />
            </div>
            <div className="text-[var(--accent)] font-bold text-[24px] sm:text-[28px] leading-none mb-2">{num}</div>
            <div className="text-[#666] text-[9px] sm:text-[10px] uppercase tracking-[1px] sm:tracking-[2px] font-medium">{label}</div>
        </div>
    );
};

const ExperienceCard = React.memo(({ item, index, layoutIndex }) => {
    // Alternating layout on desktop based on VISUAL index
    const isLeft = layoutIndex % 2 === 0;
    const isFirstCard = layoutIndex === 0; // for bullet-pulse specifically
    const cardColorRgb = hexToRgb(item.color);

    // Format text to highlight the first word with new styling
    const formatHighlight = (text) => {
        const words = text.split(' ');
        if (words.length === 0) return text;
        const firstWord = words[0];
        const rest = words.slice(1).join(' ');
        return (
            <>
                <span
                    className="text-white font-[600] transition-colors duration-200"
                    style={{
                        textDecoration: 'underline',
                        textDecorationColor: `rgba(${cardColorRgb}, 0.4)`,
                        textUnderlineOffset: '3px'
                    }}
                >
                    {firstWord}
                </span> {rest}
            </>
        );
    };

    const getSystemIcon = (sys) => {
        if (sys.includes("AutoML")) return "🤖";
        if (sys.includes("Unified Gateway")) return "🔗";
        if (sys.includes("Roll Analytics")) return "📊";
        if (sys.includes("Coil")) return "🏭";
        if (sys.includes("Energy")) return "⚡";
        return "⚙️";
    };

    return (
        <motion.div
            layout
            initial={{ x: isLeft ? -80 : 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.15 }}
            className={`relative w-full flex justify-between items-center mb-10 md:mb-16 ${isLeft ? 'flex-row-reverse md:flex-row' : 'flex-row-reverse'}`}
        >
            {/* Desktop Empty Space */}
            <div className="hidden md:block w-[45%]" />

            {/* Center Timeline Dot (Now with Ripple and Double Ring) */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }} // 0.3s delay as requested
                className="absolute left-[20px] md:left-1/2 -translate-x-1/2 w-[28px] h-[28px] rounded-full flex items-center justify-center z-10 timeline-dot-container"
                style={{
                    border: `1px solid rgba(${cardColorRgb}, 0.2)`,
                    backgroundColor: '#080808'
                }}
            >
                {/* Inner Dot */}
                <div
                    className="w-[14px] h-[14px] rounded-full relative"
                    style={{ backgroundColor: item.color }}
                >
                    {/* Ripple Effect Pseudo */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .timeline-dot-container::after {
                            content: '';
                            position: absolute;
                            inset: 0;
                            border-radius: 50%;
                            background-color: ${item.color};
                            animation: enter-ripple 1s cubic-bezier(0.1, 0, 0.3, 1) forwards;
                            animation-delay: 0.5s;
                            opacity: 0;
                            z-index: -1;
                        }
                        @keyframes enter-ripple {
                            0% { transform: scale(1); opacity: 0.8; }
                            100% { transform: scale(2.5); opacity: 0; }
                        }
                    `}} />
                </div>
            </motion.div>

            {/* Horizontal Connector Line */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: '40px', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className={`absolute h-[2px] top-[40px] md:top-1/2 md:-translate-y-1/2 hidden md:block z-0
                    ${isLeft ? 'right-[calc(50%+14px)]' : 'left-[calc(50%+14px)]'}
                `}
                style={{ backgroundColor: item.color }}
            />
            {/* Mobile Connector */}
            <motion.div
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 'calc(44px - 20px - 14px)', opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="absolute left-[34px] h-[2px] top-[40px] md:hidden z-0"
                style={{ backgroundColor: item.color }}
            />

            {/* The Card */}
            <div
                className="group relative w-full md:w-[45%] bg-[linear-gradient(145deg,rgba(17,17,17,0.9),rgba(12,12,12,0.95))] backdrop-blur-[2px] border border-[#1a1a1a] rounded-[22px] p-[20px] sm:p-[28px] ml-[44px] md:ml-0 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-[6px]"
                style={{
                    '--card-color': item.color,
                    '--card-color-rgb': cardColorRgb
                }}
            >
                {/* Advanced Hover Styles & Corner Glow rendering */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .group:hover {
                        border-color: rgba(var(--card-color-rgb), 0.4);
                        box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(var(--card-color-rgb), 0.1), 0 0 40px rgba(var(--card-color-rgb), 0.06);
                    }
                    .group:hover .accent-bar { transform: scaleY(1); }
                    .group:hover .shimmer { transform: translateX(100%); }
                    .group:hover .role-title { color: var(--card-color); }
                    .group:hover .top-stripe { opacity: 1; }
                    .group:hover::before { opacity: 1; }
                    .group:hover .bg-index { color: rgba(var(--card-color-rgb), 0.08); }
                    
                    /* Corner Glow */
                    .group::before {
                        content: '';
                        position: absolute;
                        top: -40px;
                        right: -40px;
                        width: 100px;
                        height: 100px;
                        background: radial-gradient(circle, rgba(var(--card-color-rgb), 0.12), transparent 65%);
                        opacity: 0;
                        transition: opacity 0.5s ease;
                        pointer-events: none;
                        border-radius: 50%;
                    }

                    /* Skills Hover */
                    .skill-pill:hover { 
                        background-color: rgba(var(--card-color-rgb), 0.1) !important; 
                        border-color: rgba(var(--card-color-rgb), 0.35) !important; 
                        color: var(--card-color) !important; 
                        transform: translateY(-2px) scale(1.05);
                        box-shadow: 0 4px 12px rgba(var(--card-color-rgb), 0.15);
                    }
                    
                    /* Bullet Text Hover */
                    .bullet-text:hover { color: rgba(255,255,255,0.9); }
                `}} />

                {/* Top Stripe */}
                <div
                    className="top-stripe absolute top-0 left-0 right-0 h-[1px] opacity-0 transition-opacity duration-400 rounded-t-[22px] pointer-events-none z-10"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, rgba(${cardColorRgb}, 0.6) 30%, rgba(${cardColorRgb}, 0.8) 50%, rgba(${cardColorRgb}, 0.6) 70%, transparent 100%)`
                    }}
                />

                {/* Number Indicator */}
                <div className="bg-index absolute top-[10px] sm:top-[20px] right-[20px] text-[rgba(255,255,255,0.04)] font-[900] text-[48px] leading-none pointer-events-none transition-colors duration-400 z-0">
                    {String(layoutIndex + 1).padStart(2, '0')}
                </div>

                {/* Shimmer Effect */}
                <div className="shimmer absolute inset-0 -translate-x-[100%] transition-transform duration-[600ms] ease-out pointer-events-none z-0 rounded-[22px] overflow-hidden">
                    <div className="w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.025),transparent)]" />
                </div>

                {/* Left Accent Bar */}
                <div
                    className="accent-bar absolute left-0 top-[15%] bottom-[15%] w-[3px] rounded-r-[3px] scale-y-0 origin-center transition-transform duration-300 ease-out z-10"
                    style={{ backgroundColor: 'var(--card-color)' }}
                />

                {/* INNER CONTENT */}
                <div className="relative z-10">
                    {/* TOP SECTION */}
                    {/* Row 1 */}
                    <div className="flex flex-col xl:flex-row justify-between items-start gap-4 xl:gap-2 pr-[40px]">
                        <div className="flex flex-wrap items-center gap-[6px]">
                            <span
                                className="inline-flex items-center px-[10px] py-[3px] rounded-full text-[10px] uppercase tracking-[2px] font-bold border"
                                style={{ backgroundColor: `rgba(${cardColorRgb}, 0.1)`, borderColor: `rgba(${cardColorRgb}, 0.25)`, color: 'var(--card-color)' }}
                            >
                                {item.category}
                            </span>
                            {item.badge && (
                                <span
                                    className="inline-flex items-center gap-[4px] px-[8px] py-[3px] rounded-full text-[10px] font-bold tracking-[1px] uppercase border"
                                    style={{ backgroundColor: `rgba(${cardColorRgb}, 0.15)`, borderColor: `rgba(${cardColorRgb}, 0.3)`, color: 'var(--card-color)' }}
                                >
                                    {item.badge}
                                </span>
                            )}
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

                    {/* Row 2 */}
                    <div className="mt-4">
                        <h3 className="role-title text-white font-[700] text-[clamp(17px,2vw,21px)] leading-tight transition-colors duration-300">
                            {item.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-[8px] mt-[8px]">
                            <div className="flex items-center gap-[6px] text-[#aaaaaa]">
                                <Building2 className="w-[14px] h-[14px] shrink-0" />
                                <span className="text-[14px] font-[500]">{item.company}</span>
                            </div>
                            <span className="text-[#444] text-[12px] hidden sm:inline">•</span>
                            <div className="flex items-center gap-[4px] text-[#666] text-[13px]">
                                <MapPin className="w-[12px] h-[12px] shrink-0" />
                                <span>{item.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,#1e1e1e,transparent)] my-[16px] relative z-10" />

                {/* SPECIAL HIGHLIGHT ROWS */}

                {/* Key Systems (Hitachi) */}
                {item.keySystems && (
                    <div className="relative z-10 mb-5">
                        <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-3 font-medium">KEY SYSTEMS</span>
                        <div className="flex flex-wrap gap-[8px]">
                            {item.keySystems.map((sys, idx) => (
                                <span
                                    key={idx}
                                    className="inline-flex items-center gap-[6px] bg-[rgba(255,77,90,0.06)] border border-[rgba(255,77,90,0.15)] text-[#ff7070] text-[11px] rounded-lg px-[12px] py-[4px] transition-all duration-300 hover:bg-[rgba(255,77,90,0.15)] hover:-translate-y-[3px] hover:scale-[1.05] hover:shadow-[0_6px_16px_rgba(255,77,90,0.2)] cursor-default"
                                >
                                    <span className="text-[12px]">{getSystemIcon(sys)}</span>
                                    {sys}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Project (Netfotech) */}
                {item.keyProject && (
                    <div className="relative z-10 mb-5">
                        <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-3 font-medium">KEY PROJECT</span>
                        <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-[12px] flex items-center gap-[8px] hover:border-[rgba(59,130,246,0.3)] transition-colors duration-300">
                            <Rocket className="w-[14px] h-[14px] text-[var(--accent)]" />
                            <span className="text-white text-[13px] font-bold">{item.keyProject}</span>
                        </div>
                    </div>
                )}

                {/* CONTRIBUTIONS */}
                <div className="relative z-10 mt-[8px]">
                    <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-3 font-medium">KEY CONTRIBUTIONS</span>
                    <div className="flex flex-col gap-[12px]">
                        {item.contributions.map((highlight, idx) => (
                            <div key={idx} className="flex gap-[10px] items-start">
                                <div
                                    className={`w-[6px] h-[6px] rounded-full mt-[7px] shrink-0 ${isFirstCard ? 'animate-[bullet-pulse_2s_ease_infinite]' : ''}`}
                                    style={{
                                        backgroundColor: 'var(--card-color)',
                                        boxShadow: `0 0 6px rgba(${cardColorRgb}, 0.5)`
                                    }}
                                >
                                    {isFirstCard && (
                                        <style dangerouslySetInnerHTML={{
                                            __html: `
                                            @keyframes bullet-pulse {
                                                0%, 100% { transform: scale(1); }
                                                50% { transform: scale(1.4); }
                                            }
                                        `}} />
                                    )}
                                </div>
                                <p className="bullet-text text-[#aaaaaa] text-[14px] leading-[1.65] transition-colors duration-200 cursor-default">
                                    {formatHighlight(highlight)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SKILLS / TECH STACK */}
                {(item.techStack || item.skills) && (
                    <div className="relative z-10 mt-[16px] pt-[16px] border-t border-[rgba(255,255,255,0.04)]">
                        <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-3 font-medium">
                            {item.techStack ? "TECH STACK" : "SKILLS"}
                        </span>
                        <div className="flex flex-wrap gap-[8px]">
                            {(item.techStack || item.skills).map((skill, idx) => (
                                <motion.span
                                    initial={{ y: 10, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: idx * 0.03 }}
                                    key={idx}
                                    className="skill-pill inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#777] text-[11px] rounded-full px-[12px] py-[4px] transition-all duration-[250ms] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
});

const Experience = React.memo(function Experience() {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = useMemo(() => {
        const cats = new Set(experienceData.map(item => item.category));
        return ["All", ...Array.from(cats)];
    }, []);

    const categoryCounts = useMemo(() => {
        const counts = { "All": experienceData.length };
        experienceData.forEach(item => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredData = useMemo(() => {
        if (activeCategory === "All") return experienceData;
        return experienceData.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    // Scroll Progress logic for indicator
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end end"]
    });

    const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={sectionRef} id="experience" className="relative py-24 lg:py-32 bg-[#080808] overflow-hidden" style={{ contain: 'layout style' }}>

            {/* BACKGROUND ENHANCEMENTS: 3 Orbs + Mesh Grid */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes float-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.08)} 66%{transform:translate(15px,-20px) scale(0.95)} }
                    @keyframes float-2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(0.9)} 66%{transform:translate(-20px,15px) scale(1.05)} }
                    @keyframes float-3 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-15px,-15px) scale(1.05)} 66%{transform:translate(30px,25px) scale(0.95)} }
                `}} />
                {/* Orb 1: Top-right Coral */}
                <div
                    className="absolute top-[5%] right-[-10%] w-[400px] h-[400px] rounded-full animate-[float-1_20s_ease-in-out_infinite] will-change-transform"
                    style={{ background: "radial-gradient(ellipse, rgba(255,77,90,0.05), transparent 65%)" }}
                />
                {/* Orb 2: Center-left Blue */}
                <div
                    className="absolute top-[40%] left-[-10%] w-[300px] h-[300px] rounded-full animate-[float-2_25s_ease-in-out_infinite] will-change-transform"
                    style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.04), transparent 65%)" }}
                />
                {/* Orb 3: Bottom-right Green */}
                <div
                    className="absolute bottom-[-5%] right-[10%] w-[250px] h-[250px] rounded-full animate-[float-3_30s_ease-in-out_infinite] will-change-transform"
                    style={{ background: "radial-gradient(ellipse, rgba(34,197,94,0.03), transparent 65%)" }}
                />
                {/* Dot Grid Layer */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                    }}
                />
            </div>

            {/* SCROLL PROGRESS INDICATOR */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#1a1a1a] hidden lg:block z-20">
                <motion.div
                    className="w-full bg-[var(--accent)]"
                    style={{ height: indicatorHeight }}
                />
            </div>

            {/* SECTION HEADER BACKGROUND TEXT */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-0 w-full overflow-hidden flex justify-center">
                <span
                    className="font-[900] text-[rgba(255,255,255,0.015)] tracking-[10px] whitespace-nowrap"
                    style={{ fontSize: 'clamp(80px, 12vw, 140px)', animation: 'header-scale 8s ease infinite' }}
                >
                    EXPERIENCE
                </span>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes header-scale {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.03); }
                    }
                `}} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-10"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] border border-[rgba(255,77,90,0.3)] text-[var(--accent)] tracking-[4px] text-[11px] uppercase rounded-full px-[22px] py-[7px] font-medium relative group">
                            EXPERIENCE
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--accent)] animate-[line-expand_0.8s_ease-out_forwards]" />
                        </span>
                    </div>
                    <h2 className="text-white font-[200] text-[clamp(42px,5.5vw,66px)] leading-tight mb-4 font-display">
                        Work Experience
                    </h2>
                    <p className="max-w-[580px] text-[#888888] text-[16px] italic">
                        My professional journey — from engineering to entrepreneurship
                    </p>
                </motion.div>

                {/* STATS ROW */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-[12px] sm:gap-[20px] max-w-[600px] mx-auto mb-14"
                >
                    <StatCard icon={Briefcase} num="3" label="INTERNSHIPS" colorClass="text-[#3b82f6]" />
                    <StatCard icon={Clock} num="2+" label="YEARS EXPERIENCE" colorClass="text-[#f59e0b]" />
                    <StatCard icon={Building2} num="5" label="ORGANIZATIONS" colorClass="text-[#22c55e]" />
                </motion.div>

                {/* FILTER TABS */}
                <FilterTabs
                    categories={categories}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    categoryCounts={categoryCounts}
                />

                {/* VERTICAL TIMELINE */}
                <div className="relative pt-4 md:pt-10">

                    {/* CENTER VERTICAL LINE: Animated Shimmering Gradient */}
                    <div className="absolute left-[20px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] pointer-events-none z-0">
                        <div className="absolute inset-0 bg-[#1a1a1a] h-full w-full" />
                        <motion.div
                            initial={{ height: "0%" }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute top-0 left-0 w-full"
                            style={{
                                background: "linear-gradient(to bottom, transparent 0%, rgba(255,77,90,0.15) 20%, rgba(255,77,90,0.7) 50%, rgba(255,77,90,0.15) 80%, transparent 100%)",
                                backgroundSize: "100% 200%",
                                animation: "line-shimmer 4s ease-in-out infinite"
                            }}
                        >
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes line-shimmer {
                                    0% { background-position: 0% 0%; }
                                    100% { background-position: 0% 100%; }
                                }
                            `}} />
                        </motion.div>
                    </div>

                    {/* EXPERIENCE CARDS */}
                    <div className="relative z-10 w-full flex flex-col">
                        <AnimatePresence mode="popLayout">
                            {filteredData.map((exp, idx) => (
                                <ExperienceCard
                                    key={exp.role + exp.company}
                                    item={exp}
                                    index={idx}
                                    layoutIndex={idx}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
});

export default Experience;
