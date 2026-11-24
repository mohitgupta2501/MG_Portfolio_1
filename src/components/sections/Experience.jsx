import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Building2, Briefcase, Rocket, ArrowRight, GraduationCap, FlaskConical } from 'lucide-react';
import { experienceData, fullTimeAccent } from '@/data/experience';
import ExperienceModal from '@/components/ui/ExperienceModal';
import ShowMoreButton from '@/components/ui/ShowMoreButton';
import StatCard from '@/components/ui/StatCard';
import { useIsMobile } from '@/hooks/useIsMobile';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const FilterTabs = ({ categories, activeCategory, setActiveCategory, categoryCounts }) => {
    return (
        <div className="w-full flex flex-wrap justify-center gap-[10px] min-w-0 px-2 max-[480px]:px-1">
            {categories.map((cat, idx) => {
                const isActive = activeCategory === cat;
                return (
                    <button
                        key={idx}
                        onClick={() => setActiveCategory(cat)}
                        className={`group relative flex items-center px-[18px] py-[8px] rounded-[50px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                            ? 'bg-[#ff4d5a] text-white font-[700] shadow-[0_8px_24px_rgba(255,77,90,0.45),0_4px_12px_rgba(255,77,90,0.3)] border border-transparent'
                            : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#666] font-[500] hover:bg-[rgba(255,77,90,0.07)] hover:border-[rgba(255,77,90,0.3)] hover:text-[#ff4d5a] hover:shadow-[0_4px_16px_rgba(255,77,90,0.1)]'
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

const ExperienceCard = React.memo(({ item, index, layoutIndex, onClick, totalCards, className = '' }) => {
    const cardColorRgb = hexToRgb(item.color);
    const isHitachi = item.company.includes("Hitachi");
    const skills = item.techStack || item.skills || [];

    const containerRef = useRef(null);
    const [visibleCount, setVisibleCount] = useState(skills.length);

    useEffect(() => {
        if (!containerRef.current) return;

        const calculateVisible = () => {
            if (!containerRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const gap = 6;
            const moreButtonWidth = 70;

            // Check if ALL fit without "more" button
            let totalWidthWithAll = 0;
            for (let i = 0; i < skills.length; i++) {
                totalWidthWithAll += (skills[i].length * 7.5 + 24) + (i > 0 ? gap : 0);
            }

            if (totalWidthWithAll <= containerWidth) {
                setVisibleCount(skills.length);
                return;
            }

            // If not all fit, find how many fit with "more" button
            let currentWidth = 0;
            let count = 0;
            for (let i = 0; i < skills.length; i++) {
                const pillWidth = (skills[i].length * 7.5 + 24);
                if (currentWidth + pillWidth + gap + moreButtonWidth > containerWidth) {
                    break;
                }
                currentWidth += pillWidth + (i > 0 ? gap : 0);
                count++;
            }
            setVisibleCount(Math.max(1, count));
        };

        const observer = new ResizeObserver(() => calculateVisible());
        observer.observe(containerRef.current);
        calculateVisible();

        return () => observer.disconnect();
    }, [skills]);

    // Hardcoded brief summaries map based on requested specs
    const getBriefSummary = (company, role) => {
        if (company.includes("Hitachi")) return "Built industrial AI systems including AutoML platform, Unified Gateway, and analytics dashboards.";
        if (company.includes("SS Infotech")) return "Building end-to-end machine learning workflows and analytics solutions, from data preparation to model evaluation and reporting.";
        if (company.includes("BIntelligenD") && role.includes("Research")) return "Explainable lightweight CNNs for leukaemia detection, reaching 95.48% accuracy with Grad-CAM visual explanations.";
        if (company.includes("EZY")) return "Multi-metric, domain-aware benchmarking framework for evaluating text-to-image diffusion models.";
        if (company.includes("BIntelligenD")) return "Applied Python data science and ML fundamentals on real-world datasets, from EDA to visualization.";
        if (company.includes("Eagle Wears")) return "Founded premium apparel brand, secured ₹1L+ order, managed full operations.";
        return "";
    };

    return (
        <motion.div
            layout
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            className={`relative w-full h-full ${className}`}
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
                      background-color: rgba(var(--cat-rgb), 0.10);
                      border: 1px solid rgba(var(--cat-rgb), 0.3);
                      color: rgba(var(--cat-rgb), 0.8);
                      transition: all 300ms ease;
                    }
                    .experience-card:hover .skill-pill {
                      background-color: rgba(var(--cat-rgb), 0.22);
                      border-color: rgba(var(--cat-rgb), 0.7);
                      color: var(--cat-color) !important; 
                      box-shadow: 0 0 8px rgba(var(--cat-rgb), 0.4);
                      transform: none;
                      opacity: 1;
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
                                style={{
                                    backgroundColor: `${item.color}15`,
                                    color: item.color,
                                    border: `1px solid ${item.color}30`
                                }}
                            >
                                {item.category}
                            </span>
                            {/* {item.badge && (
                                <span
                                    className="inline-flex items-center gap-[6px] px-[10px] py-[3px] rounded-full text-[10px] font-[700] tracking-[2px] uppercase border cursor-default"
                                    style={{
                                        '--cat-rgb': item.badge.includes('FOUNDER') ? '245, 158, 11' : '255, 77, 90',
                                        '--cat-color': item.badge.includes('FOUNDER') ? '#f59e0b' : '#ff4d5a'
                                    }}
                                >
                                    {item.badge === 'Current Role' ? '★ CURRENT ROLE' : item.badge === 'Founder' ? 'FOUNDER' : item.badge}
                                </span>
                            )} */}
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
                        <h3 className="role-title text-white font-[700] text-[17px] max-[480px]:text-[15px] min-[481px]:text-[19px] leading-[22px] transition-colors duration-300 pr-[60px] h-[44px] break-words min-w-0" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
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
                            {item.employmentType === "full-time" ? (
                                <span
                                    className="inline-flex items-center gap-[4px] px-2 py-[2px] rounded text-[10px] sm:text-[11px] font-[700] shrink-0 leading-none"
                                    style={{
                                        backgroundColor: `rgba(${fullTimeAccent.rgb}, 0.12)`,
                                        border: `1px solid rgba(${fullTimeAccent.rgb}, 0.25)`,
                                        color: fullTimeAccent.color
                                    }}
                                >
                                    <Briefcase className="w-[11px] h-[11px] shrink-0" />
                                    {item.type}
                                </span>
                            ) : (
                                <span className="bg-[rgba(255,255,255,0.05)] px-2 py-[2px] rounded text-[#777] text-[10px] sm:text-[11px] font-medium shrink-0 leading-none">{item.type}</span>
                            )}
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
                        <p className="text-[#888888] text-[13px] max-[480px]:text-[12px] leading-[1.6]" style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word'
                        }}>
                            {getBriefSummary(item.company, item.role)}
                        </p>
                    </div>

                    {/* Pushed to bottom section */}
                    <div className="relative z-10 mt-auto pt-4 flex flex-col justify-end">
                        {/* SKILLS PREVIEW (Dynamic) */}
                        <div ref={containerRef} className="min-h-[26px] mb-4">
                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-[6px]">
                                    {skills.slice(0, visibleCount).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="skill-pill px-[10px] py-[3px] border rounded-full text-[11px] sm:text-[12px] transition-all duration-300 cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {skills.length > visibleCount && (
                                        <span className="skill-pill px-[10px] py-[3px] border rounded-full text-[11px] sm:text-[12px] transition-all duration-300 cursor-default">
                                            + {skills.length - visibleCount} more
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
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useIsMobile();

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

    // Hero stat values derived from the experience data (via explicit employmentType)
    const statValues = useMemo(() => {
        const byType = (type) => experienceData.filter(item => item.employmentType === type);
        const internships = byType("internship");
        return {
            fullTime: byType("full-time").length,
            industryInternships: internships.filter(item => item.category !== "Research").length,
            researchInternships: internships.filter(item => item.category === "Research").length,
            startupFounded: byType("founder").length,
            organizations: new Set(experienceData.map(item => item.company)).size
        };
    }, []);

    const filteredData = useMemo(() => {
        if (activeCategory === "All") return experienceData;
        return experienceData.filter(item => item.category === activeCategory);
    }, [activeCategory]);

    const displayData = useMemo(() => {
        if (isMobile && !isExpanded) {
            return filteredData.slice(0, 1);
        }
        return filteredData;
    }, [filteredData, isMobile, isExpanded]);

    // Scroll Progress logic for indicator
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start center", "end end"]
    });

    const indicatorHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Column placement for the 2-col (4-track) grid used from 481px up.
    // Every card spans 2 tracks; when the number of visible cards is odd the last
    // one starts at track 2 (grid-column: 2 / span 2) so it is centred beneath the
    // row above at the same width — never full-width, never left-aligned.
    const cardColumnClass = (index) => {
        if (isMobile) return '';
        const isLastOdd = filteredData.length % 2 === 1 && index === filteredData.length - 1;
        return `col-span-2${isLastOdd ? ' col-start-2' : ''}`;
    };

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
                    <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-2 font-display break-words">
                        Work Experience
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)',
                        borderRadius: '999px',
                        margin: '8px auto 24px auto'
                    }} />
                    <p className="max-w-[580px] w-full text-[#888888] text-[16px] max-[480px]:text-[14px] italic min-w-0 break-words px-2">
                        Where industry experience, research, and entrepreneurship come together to build meaningful technology.
                    </p>
                </motion.div>

                {/* STATS ROW — 5 cards at the fixed Projects card width, wrap-centred:
                    5 per row (desktop), 3 + 2 (tablet), 2 + 2 + 1 (mobile) */}
                <div className="w-full">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="exp-stats-row flex flex-wrap justify-center items-stretch gap-[16px] w-full mx-auto mb-7"
                    >
                        {[
                            { icon: Briefcase, num: statValues.fullTime, label: "FULL-TIME ROLE", color: fullTimeAccent.color },
                            { icon: GraduationCap, num: statValues.industryInternships, label: "INDUSTRY INTERNSHIPS", color: "#ff4d5a" },
                            { icon: FlaskConical, num: statValues.researchInternships, label: "RESEARCH INTERNSHIPS", color: "#3b82f6" },
                            { icon: Rocket, num: statValues.startupFounded, label: "STARTUP FOUNDED", color: "#f59e0b" },
                            { icon: Building2, num: statValues.organizations, label: "ORGANIZATIONS", color: "#22c55e" }
                        ].map((card) => (
                            <motion.div
                                key={card.label}
                                variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                                className="exp-stat-item flex shrink-0 grow-0 basis-auto"
                            >
                                <StatCard icon={card.icon} num={card.num.toString()} label={card.label} color={card.color} alignLabels />
                            </motion.div>
                        ))}
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
                </div>

                {/* VERTICAL TIMELINE AND CARDS ROW */}
                <div className="relative w-full">

                    {/* SECTION TOP DIVIDER (decorative)
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.2),transparent)]" /> */}

                    {/* DECORATIVE YEAR MARKERS */}
                    <div className="absolute left-0 top-20 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2026</div>
                    <div className="absolute left-0 top-1/2 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2025</div>
                    <div className="absolute left-0 bottom-20 text-[rgba(255,255,255,0.05)] text-[10px] font-bold tracking-widest -rotate-90 origin-left pointer-events-none hidden lg:block">2024</div>

                    {/* EXPERIENCE CARDS GRID — 1 col on mobile; 2-col (4-track) grid otherwise.
                        Every card spans 2 tracks so an odd last card can be centred between
                        the two columns (grid-column: 2 / span 2) instead of sitting left-aligned. */}
                    <div className={`relative z-10 w-full grid gap-[20px] items-stretch min-[1025px]:px-6 ${isMobile
                            ? 'grid-cols-1'
                            : 'grid-cols-4'
                        }`}>

                        {filteredData.length > 0 && (
                            <ExperienceCard
                                key={filteredData[0].role + filteredData[0].company}
                                item={filteredData[0]}
                                index={0}
                                layoutIndex={0}
                                onClick={setSelectedExperience}
                                totalCards={filteredData.length}
                                className={cardColumnClass(0)}
                            />
                        )}

                        {isMobile ? (
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 16 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 16 }}
                                        className="flex flex-col gap-[20px]"
                                    >
                                        {filteredData.slice(1).map((exp, idx) => (
                                            <ExperienceCard
                                                key={exp.role + exp.company}
                                                item={exp}
                                                index={idx + 1}
                                                layoutIndex={idx + 1}
                                                onClick={setSelectedExperience}
                                                totalCards={filteredData.length}
                                                className={cardColumnClass(idx + 1)}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        ) : (
                            filteredData.slice(1).map((exp, idx) => (
                                <ExperienceCard
                                    key={exp.role + exp.company}
                                    item={exp}
                                    index={idx + 1}
                                    layoutIndex={idx + 1}
                                    onClick={setSelectedExperience}
                                    totalCards={filteredData.length}
                                    className={cardColumnClass(idx + 1)}
                                />
                            ))
                        )}
                    </div>

                    {isMobile && filteredData.length > 1 && (
                        <ShowMoreButton
                            isExpanded={isExpanded}
                            onClick={() => setIsExpanded(!isExpanded)}
                            color="#ff4d5a"
                        />
                    )}

                </div>
            </div>

            {/* EXPERIENCE MODAL PORTAL */}
            <ExperienceModal
                exp={selectedExperience}
                onClose={() => setSelectedExperience(null)}
            />

            {/* Experience stat-card sizing — fixed width identical to the Projects stat card
                (Projects: (680px − 3×16px) ÷ 4 = 158px). The row stays centred and wraps:
                5 per row (desktop) → 3 + 2 (tablet) → 2 + 2 + 1 (mobile). */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .exp-stat-item {
                    width: calc((100% - 16px) / 2);
                }
                .exp-stats-row {
                    max-width: 100%;
                }
                @media (min-width: 481px) {
                    .exp-stat-item { width: 158px; }
                    .exp-stats-row { max-width: calc((158px * 3) + 32px); }
                }
                @media (min-width: 1025px) {
                    .exp-stats-row { max-width: calc((158px * 5) + 64px); }
                }
        `}} />

        </section>
    );
});

export default Experience;
