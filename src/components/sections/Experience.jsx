import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, Briefcase, Rocket, ArrowRight, Heart, GraduationCap } from 'lucide-react';
import { experienceData } from '@/data/experience';
import ExperienceModal from '@/components/ui/ExperienceModal';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const FilterTabs = ({ categories, activeCategory, setActiveCategory, categoryCounts }) => {
    return (
        <div className="w-full flex flex-wrap justify-center gap-[10px] min-w-0 overflow-hidden px-2 max-[480px]:px-1">
            {categories.map((cat, idx) => {
                const isActive = activeCategory === cat;
                return (
                    <button
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className={`group relative flex items-center px-[18px] py-[8px] rounded-[50px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                            ? 'bg-[#ff4d5a] text-white font-[700] shadow-[0_8px_24px_rgba(255,77,90,0.45),0_4px_12px_rgba(255,77,90,0.3)] -translate-y-[2px] border border-transparent'
                            : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#666] font-[500] hover:bg-[rgba(255,77,90,0.07)] hover:border-[rgba(255,77,90,0.3)] hover:text-[#ff4d5a] hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(255,77,90,0.1)]'
                            }`}
                    >
                        {cat}
                        <span className={`inline-flex items-center justify-center rounded-[50px] px-[7px] py-[1px] ml-[6px] text-[10px] transition-colors duration-300 ${isActive ? 'bg-[rgba(255,255,255,0.25)] text-white font-[700]' : 'bg-[rgba(255,255,255,0.07)] text-[#555] group-hover:bg-[rgba(255,77,90,0.15)] group-hover:text-[#ff9090]'
                            }`}>
                            {categoryCounts[cat]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
};

function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // easeOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return { count, ref };
}

// Stat Card Component
const StatCard = React.memo(({ icon: Icon, num, label, sub, color }) => {
    const numericValue = parseInt(num.replace(/\+/g, '').replace(/%/g, ''));
    const isPlus = num.includes('+');
    const isPercent = num.includes('%');
    const { count, ref } = useCountUp(numericValue, 1500);
    const colorRgb = hexToRgb(color) || '255,255,255';

    return (
        <div
            ref={ref}
            className="proj-stat-card bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 flex flex-col items-center justify-center text-center group cursor-default h-full w-full min-h-[140px]"
            style={{
                '--cat-color': color,
                '--cat-rgb': colorRgb
            }}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .proj-stat-card {
                    transition: all 0.3s ease;
                }
                .proj-stat-card:hover {
                    transform: translateY(-6px);
                    background-color: rgba(var(--cat-rgb), 0.08);
                    border-color: rgba(var(--cat-rgb), 0.3);
                    box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.2);
                }
                .proj-stat-card:hover .stat-icon {
                    filter: drop-shadow(0 0 8px var(--cat-color));
                }
                .proj-stat-card:hover .stat-value {
                    text-shadow: 0 0 12px var(--cat-color);
                }
                `
            }} />
            <Icon className="stat-icon w-6 h-6 mb-3 transition-all duration-300" style={{ color: color }} />
            <span
                className="stat-value font-bold text-[clamp(24px,3vw,32px)] leading-none mb-1.5 transition-all duration-300"
                style={{ color: color }}
            >
                {count}{isPlus && '+'}{isPercent && '%'}
            </span>
            <span className="text-[#555] text-[10px] uppercase tracking-[1.5px] font-bold">
                {label}
            </span>
            <span className="text-[#333] text-[11px] mt-[3px]">
                {sub}
            </span>
        </div>
    );
});
StatCard.displayName = 'StatCard';

const ExperienceCard = React.memo(({ item, index, layoutIndex, onClick, totalCards }) => {
    const cardColorRgb = hexToRgb(item.color);
    const isHitachi = item.company.includes("Hitachi");

    // Hardcoded brief summaries map based on requested specs
    const getBriefSummary = (company, role) => {
        if (company.includes("Hitachi")) return "Built industrial AI systems including AutoML platform, Unified Gateway, and analytics dashboards.";
        if (company.includes("Netfotech")) return "Developed SmartGoodsMatch web app using Flask, SQLite, and RESTful APIs.";
        if (company.includes("Eagle Wears")) return "Founded premium apparel brand, secured ₹1L+ order, managed full operations.";
        if (company.includes("Aashraya") && role.includes("Representative")) return "Campus representative organizing social awareness programs and outreach.";
        if (company.includes("Aashraya") && role.includes("Volunteer")) return "Permanent volunteer supporting community welfare across Maharashtra.";
        if (company.includes("Sahyadri")) return "Contributed to social development and community outreach initiatives.";
        return "";
    };

    return (
        <motion.div
            layout
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            className={`relative w-full h-full ${totalCards % 2 !== 0 && index === totalCards - 1 ? 'md:col-span-1 md:max-w-[560px] md:mx-auto lg:col-span-2' : ''}`}
        >
            {/* The Card */}
            <div
                className="experience-card group"
                onClick={() => onClick(item)}
                style={{
                    '--cat-color': item.color,
                    '--cat-rgb': cardColorRgb
                }}
            >
                {/* Advanced Hover Styles */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .experience-card {
                      position: relative;
                      overflow: hidden;
                      background: linear-gradient(145deg, #111111, #0c0c0c);
                      border: 1px solid rgba(255, 255, 255, 0.06);
                      border-radius: 20px;
                      padding: 24px;
                      display: flex;
                      flex-direction: column;
                      height: 100%;
                      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                      cursor: pointer;
                    }

                    .experience-card:hover {
                      transform: translateY(-8px) scale(1.012);
                      border-color: rgba(var(--cat-rgb), 0.55);
                      box-shadow:
                        0 28px 70px rgba(0,0,0,0.55),
                        0 12px 30px rgba(0,0,0,0.35),
                        0 0 0 1px rgba(var(--cat-rgb), 0.15),
                        0 0 50px rgba(var(--cat-rgb), 0.1);
                    }

                    .experience-card .top-stripe {
                      position: absolute;
                      top: 0; left: 0; right: 0;
                      height: 2px;
                      background: linear-gradient(90deg,
                        transparent,
                        rgba(var(--cat-rgb), 1) 50%,
                        transparent);
                      opacity: 0;
                      transition: opacity 0.35s;
                      border-radius: 20px 20px 0 0;
                    }
                    .experience-card:hover .top-stripe {
                      opacity: 1;
                    }

                    .experience-card:hover .role-title { color: var(--cat-color) !important; }
                    .experience-card:hover .company-name { color: #ddd !important; }

                    .experience-card .card-number {
                      position: absolute;
                      top: 16px; right: 20px;
                      font-size: 56px;
                      font-weight: 900;
                      color: rgba(255,255,255,0.03);
                      pointer-events: none;
                      user-select: none;
                      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
                      line-height: 1;
                      z-index: 0;
                    }
                    .experience-card:hover .card-number {
                      color: var(--cat-color);
                      text-shadow: 0 0 30px rgba(var(--cat-rgb), 0.6), 0 0 60px rgba(var(--cat-rgb), 0.25);
                      transform: scale(1.08) translateY(-4px);
                      opacity: 0.15;
                    }

                    .experience-card::after {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background: linear-gradient(
                        108deg,
                        transparent 35%,
                        rgba(255,255,255,0.03) 50%,
                        transparent 65%
                      );
                      transform: translateX(-100%);
                      transition: transform 0.7s ease;
                      pointer-events: none;
                      border-radius: inherit;
                      z-index: 1;
                    }
                    .experience-card:hover::after {
                      transform: translateX(100%);
                    }

                    .experience-card .view-details-btn {
                      width: 100%;
                      margin-top: auto;
                      padding: 11px 20px;
                      background: transparent;
                      border: 1px solid rgba(var(--cat-rgb), 0.3);
                      color: var(--cat-color);
                      font-size: 13px;
                      font-weight: 600;
                      border-radius: 12px;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      gap: 8px;
                      cursor: pointer;
                      position: relative;
                      overflow: hidden;
                      transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
                      z-index: 2;
                    }

                    .experience-card .view-details-btn::before {
                      content: '';
                      position: absolute;
                      inset: 0;
                      background: linear-gradient(135deg,
                        var(--cat-color),
                        rgba(var(--cat-rgb), 0.8));
                      opacity: 0;
                      transition: opacity 0.35s ease;
                      border-radius: 11px;
                      z-index: 0;
                    }

                    .experience-card .view-details-btn span,
                    .experience-card .view-details-btn svg {
                      position: relative;
                      z-index: 1;
                      transition: color 0.35s, transform 0.35s;
                    }

                    .experience-card .view-details-btn:hover {
                      border-color: var(--cat-color);
                      transform: translateY(-2px);
                      box-shadow:
                        0 10px 28px rgba(var(--cat-rgb), 0.45),
                        0 4px 12px rgba(var(--cat-rgb), 0.25);
                    }

                    .experience-card .view-details-btn:hover::before {
                      opacity: 1;
                    }

                    .experience-card .view-details-btn:hover span {
                      color: white;
                    }

                    .experience-card .view-details-btn:hover svg {
                      color: white;
                      transform: translateX(5px);
                    }

                    .experience-card .view-details-btn:active {
                      transform: translateY(0) scale(0.97);
                      box-shadow: 0 4px 14px rgba(var(--cat-rgb), 0.3);
                    }

                    .experience-card .accent-bar {
                      position: absolute;
                      left: 0; top: 0; bottom: 0;
                      width: 3px;
                      border-radius: 0 2px 2px 0;
                      background: linear-gradient(to bottom,
                        transparent 0%,
                        var(--cat-color) 30%,
                        var(--cat-color) 70%,
                        transparent 100%);
                      opacity: 0.15;
                      transition: opacity 0.4s ease, width 0.3s ease;
                      z-index: 2;
                    }
                    .experience-card:hover .accent-bar {
                      opacity: 1;
                      width: 4px;
                    }

                    .experience-card .skill-pill {
                      background-color: rgba(var(--cat-rgb), 0.08);
                      border: 1px solid rgba(var(--cat-rgb), 0.2);
                      color: var(--cat-color);
                      font-size: 12px;
                      font-weight: 500;
                      border-radius: 8px;
                      padding: 4px 12px;
                      letter-spacing: 0.3px;
                      opacity: 0.9;
                      transition: all 0.25s ease;
                    }
                    .experience-card:hover .skill-pill {
                      background-color: rgba(var(--cat-rgb), 0.15);
                      border-color: rgba(var(--cat-rgb), 0.4);
                      color: var(--cat-color);
                      transform: translateY(-2px);
                      box-shadow: 0 4px 12px rgba(var(--cat-rgb), 0.2);
                      opacity: 1;
                    }

                    .experience-card .skill-pill.more-pill {
                      background-color: rgba(var(--cat-rgb), 0.05);
                      border: 1px solid rgba(var(--cat-rgb), 0.15);
                      color: rgba(var(--cat-rgb), 0.7);
                      font-size: 11px;
                      border-radius: 8px;
                      padding: 4px 10px;
                    }
                    .experience-card:hover .skill-pill.more-pill {
                      background-color: rgba(var(--cat-rgb), 0.12);
                      border-color: rgba(var(--cat-rgb), 0.3);
                      color: var(--cat-color);
                      transform: translateY(-2px);
                    }
                `}} />

                {/* Top Stripe */}
                <div className="top-stripe" />

                {/* Number Indicator */}
                <div className="card-number">
                    {String(layoutIndex + 1).padStart(2, '0')}
                </div>

                {/* Left Accent Bar */}
                <div className="accent-bar" />

                {/* INNER CONTENT */}
                <div className="relative z-10 flex flex-col h-full min-w-0">
                    {/* TOP SECTION */}
                    {/* Row 1 */}
                    <div className="flex flex-row justify-between items-center gap-2 pr-[80px] h-[28px] shrink-0">
                        <div className="flex flex-wrap items-center gap-[6px]">
                            <span
                                className="inline-flex items-center px-[12px] py-[4px] rounded-[50px] text-[10px] uppercase tracking-[2.5px] font-[700] border"
                                style={{ backgroundColor: `rgba(var(--cat-rgb), 0.12)`, borderColor: `rgba(var(--cat-rgb), 0.35)`, color: 'var(--cat-color)' }}
                            >
                                {item.category}
                            </span>
                            {item.badge && (
                                <span
                                    className="inline-flex items-center gap-[6px] px-[12px] py-[4px] rounded-[50px] text-[10px] font-[700] tracking-[2px] uppercase border"
                                    style={{
                                        backgroundColor: item.badge.includes('FOUNDER') ? 'rgba(245, 158, 11, 0.12)' : 'rgba(255, 77, 90, 0.12)',
                                        borderColor: item.badge.includes('FOUNDER') ? 'rgba(245, 158, 11, 0.35)' : 'rgba(255, 77, 90, 0.35)',
                                        color: item.badge.includes('FOUNDER') ? '#f59e0b' : '#ff4d5a'
                                    }}
                                >
                                    {item.badge === 'Current Role' ? '★ CURRENT ROLE' : item.badge === 'Founder' ? 'FOUNDER' : item.badge}
                                </span>
                            )}
                        </div>
                        <div
                            className="inline-flex items-center gap-[6px] rounded-[50px] px-[12px] py-[4px] shrink-0"
                            style={{
                                backgroundColor: item.duration.includes("Present") ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                                border: item.duration.includes("Present") ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(255,255,255,0.1)',
                                color: item.duration.includes("Present") ? '#22c55e' : '#666'
                            }}
                        >
                            {item.duration.includes("Present") ? (
                                <div className="w-[7px] h-[7px] rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                            ) : null}
                            <span className="text-[12px] whitespace-nowrap">{item.duration}</span>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="mt-3 flex flex-col gap-1 shrink-0">
                        <h3 className="role-title text-white font-[700] text-[17px] max-[480px]:text-[15px] min-[481px]:text-[19px] leading-[22px] transition-colors duration-300 pr-[60px] h-[44px] break-words min-w-0" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.role}
                        </h3>
                        {/* Company & Type Row */}
                        <div className="flex items-center gap-[6px] sm:gap-[8px] mt-[4px] overflow-hidden relative z-10 h-[20px] shrink-0">
                            <div className="flex items-center gap-[4px] min-w-0">
                                {item.company.includes("St. Vincent Pallotti") ? (
                                    <GraduationCap className="w-[14px] h-[14px] shrink-0 text-[#777]" />
                                ) : (
                                    <Building2 className="w-[14px] h-[14px] shrink-0 text-[#777]" />
                                )}
                                <span className="company-name text-[13px] font-[500] text-[#bbb] transition-colors duration-300 truncate leading-none">{item.company}</span>
                            </div>
                            <span className="text-[#444] text-[12px] shrink-0">•</span>
                            <span className="bg-[rgba(255,255,255,0.05)] px-2 py-[2px] rounded text-[#777] text-[10px] sm:text-[11px] font-medium shrink-0 leading-none">{item.type}</span>
                        </div>
                        {/* Location Row */}
                        <div className="flex items-center gap-[4px] text-[#777] mt-[2px] shrink-0 h-[16px] overflow-hidden">
                            <MapPin className="w-[12px] h-[12px] shrink-0" />
                            <span className="text-[11px] sm:text-[12px] whitespace-nowrap truncate leading-none">{item.location}</span>
                        </div>
                    </div>

                    {/* DIVIDER */}
                    <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] my-[12px] relative z-10 opacity-40 shrink-0" />

                    {/* BRIEF SUMMARY */}
                    <div className="relative z-10 mb-2 mt-1 min-h-[64px] shrink-0 min-w-0">
                        <p className="text-[#888888] text-[13px] max-[480px]:text-[12px] leading-[1.6] line-clamp-3 break-words" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {getBriefSummary(item.company, item.role)}
                        </p>
                    </div>

                    {/* Pushed to bottom section */}
                    <div className="relative z-10 mt-auto pt-4 flex flex-col justify-end">
                        {/* SKILLS PREVIEW (Max 3) */}
                        <div className="min-h-[26px] mb-4">
                            {(item.techStack || item.skills) && (
                                <div className="flex flex-wrap gap-[6px]">
                                    {(item.techStack || item.skills).slice(0, 3).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="skill-pill inline-flex items-center justify-center cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {(item.techStack || item.skills).length > 3 && (
                                        <span className="skill-pill more-pill inline-flex items-center justify-center cursor-default">
                                            + {(item.techStack || item.skills).length - 3} more
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Action Button */}
                        <div className="flex flex-col mt-auto relative z-10 w-full">
                            <button
                                onClick={(e) => { e.stopPropagation(); onClick(item); }}
                                className="view-details-btn"
                            >
                                <span>View Details</span>
                                <ArrowRight className="w-[14px] h-[14px]" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

const Experience = React.memo(function Experience() {
    const sectionRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedExperience, setSelectedExperience] = useState(null);

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
        <section ref={sectionRef} id="experience" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden" style={{ contain: 'layout style' }}>

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

            <div className="relative z-10 max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 w-full min-w-0">

                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-10 w-full min-w-0"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="w-full flex justify-center mb-6 min-w-0">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] max-[480px]:text-[10px] font-medium uppercase rounded-[50px] px-[22px] max-[480px]:px-4 py-[7px] relative max-w-full truncate">
                            ● EXPERIENCE
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-4 font-display break-words">
                        Work Experience
                    </h2>
                    <p className="max-w-[580px] w-full text-[#888888] text-[16px] max-[480px]:text-[14px] italic min-w-0 break-words px-2">
                        Where industry experience, entrepreneurship, and social impact come together to build meaningful technology.
                    </p>
                </motion.div>

                {/* STATS ROW — 4 cards: 2x2 tablet/mobile, single row desktop */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-2 min-[1025px]:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-7 items-stretch"
                >
                    <motion.div className="h-full" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <StatCard icon={Briefcase} num="2" label="INDUSTRY INTERNSHIPS" color="#ff4d5a" />
                    </motion.div>
                    <motion.div className="h-full" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <StatCard icon={Rocket} num="1" label="STARTUP FOUNDED" color="#3b82f6" />
                    </motion.div>
                    <motion.div className="h-full" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <StatCard icon={Building2} num="5" label="ORGANIZATIONS" color="#f59e0b" />
                    </motion.div>
                    <motion.div className="h-full" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                        <StatCard icon={Heart} num="2" label="SOCIAL IMPACT" color="#22c55e" />
                    </motion.div>
                </motion.div>

                {/* FILTER TABS */}
                <div className="mb-5">
                    <FilterTabs
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                        categoryCounts={categoryCounts}
                    />
                </div>

                {/* HORIZONTAL DIVIDER - NEW */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.4),transparent)] mb-7" />

                {/* VERTICAL TIMELINE AND CARDS ROW */}
                <div className="relative w-full">

                    {/* SECTION TOP DIVIDER (decorative)
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.2),transparent)]" /> */}

                    {/* DECORATIVE YEAR MARKERS */}
                    <div className="absolute left-0 top-20 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2026</div>
                    <div className="absolute left-0 top-1/2 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2025</div>
                    <div className="absolute left-0 bottom-20 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2024</div>

                    {/* EXPERIENCE CARDS GRID — 1 col mobile, 2 cols tablet+ */}
                    <div className="relative z-10 w-full grid grid-cols-1 min-[481px]:grid-cols-2 gap-[20px] items-stretch min-[1025px]:px-6">
                        <AnimatePresence mode="popLayout">
                            {filteredData.map((exp, idx) => (
                                <ExperienceCard
                                    key={exp.role + exp.company}
                                    item={exp}
                                    index={idx}
                                    layoutIndex={idx}
                                    onClick={setSelectedExperience}
                                    totalCards={filteredData.length}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* EXPERIENCE MODAL PORTAL */}
            <ExperienceModal
                exp={selectedExperience}
                onClose={() => setSelectedExperience(null)}
            />

            <style dangerouslySetInnerHTML={{
                __html: `
        `}} />

        </section>
    );
});

export default Experience;
