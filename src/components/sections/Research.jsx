import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Brain, Cpu, FileText, Award } from 'lucide-react';
import { researchData } from '@/data/research';
import ResearchCard from '@/components/ui/ResearchCard';
import ResearchModal from '@/components/ui/ResearchModal';

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

// Stat Counter Hook (from Projects)
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


const FilterTabs = ({ categories, activeCategory, setActiveCategory, categoryCounts }) => {
    return (
        <div className="w-full flex flex-wrap justify-center gap-[10px] min-w-0 px-2 max-[480px]:px-1 mb-8">
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

// Stat Card Component
const StatCard = memo(({ icon: Icon, num, label, color }) => {
    const numericValue = parseInt(num.replace(/\+/g, ''));
    const isPlus = num.includes('+');
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
                {count}{isPlus && '+'}
            </span>
            <span className="text-[#555] text-[9px] uppercase tracking-[1.5px] font-bold w-full text-center whitespace-pre-line break-words leading-tight">
                {label}
            </span>
        </div>
    );
});
StatCard.displayName = 'StatCard';

const Research = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedResearch, setSelectedResearch] = useState(null);

    const categories = useMemo(() => {
        const cats = new Set(researchData.map(item => item.category));
        return ["All", ...Array.from(cats)];
    }, []);

    const categoryCounts = useMemo(() => {
        const counts = { "All": researchData.length };
        researchData.forEach(item => {
            counts[item.category] = (counts[item.category] || 0) + 1;
        });
        return counts;
    }, []);

    const filteredResearch = useMemo(() => {
        if (activeFilter === 'All') return researchData;
        return researchData.filter(item => item.category === activeFilter);
    }, [activeFilter]);

    const stats = [
        { color: "#a855f7", icon: FileText, value: "3", label: "PUBLICATIONS", },
        { color: "#ec4899", icon: Brain, value: "2", label: "DOMAINS", },
        { color: "#3b82f6", icon: Cpu, value: "15+", label: "AI/ML Models \nImplemented", },
    ];

    return (
        <section id="research" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.04)_0%,transparent_70%)] animate-[breathe_18s_infinite] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.04)_0%,transparent_70%)] animate-[breathe_22s_infinite_reverse] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.025)_0%,transparent_70%)] animate-[breathe_28s_ease-in-out_infinite] pointer-events-none" />

            {/* Dot grid */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

            {/* DNA Helix Decorative Element */}
            <div className="absolute right-10 top-20 bottom-20 w-[60px] pointer-events-none hidden lg:block overflow-hidden opacity-40 z-0 dna-helix-container" />

            {/* Background huge text */}
            <div className="absolute top-40 left-1/2 -translate-x-1/2 text-[15vw] max-[480px]:text-[12vw] font-black leading-none pointer-events-none select-none z-0 overflow-hidden max-w-full" style={{ color: 'rgba(255,255,255,0.015)' }} aria-hidden>
                RESEARCH
            </div>

            <div className="max-w-[1280px] mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 relative z-10 w-full min-w-0">

                {/* Header */}
                <motion.div
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center mb-10 w-full min-w-0"
                >
                    <div className="w-full flex justify-center mb-6 min-w-0">
                        <span className="text-[#ff4d5a] text-[11px] max-[480px]:text-[10px] font-medium uppercase tracking-[4px] bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] px-[22px] max-[480px]:px-4 py-[7px] rounded-[50px] relative max-w-full truncate">
                            ● RESEARCH
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>

                    <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-2 font-display break-words">
                        Research & Publications
                    </h2>
                    <div style={{ 
                        width: '60px', 
                        height: '3px', 
                        background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)', 
                        borderRadius: '999px', 
                        margin: '8px auto 24px auto' 
                    }} />

                    <p className="text-[#888] text-[16px] max-[480px]:text-[14px] italic max-w-[600px] w-full mx-auto leading-[1.6] min-w-0 break-words px-2">
                        Exploring ideas, validating them with data, and sharing knowledge through research.
                    </p>
                </motion.div>

                {/* Stats Row — 3 cards: 2 on top + 1 centered below on tablet/mobile */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}
                    className="grid grid-cols-2 min-[1025px]:grid-cols-3 gap-[16px] max-w-[680px] min-[1025px]:max-w-[510px] mx-auto mb-7 items-stretch"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            className={`h-full w-full ${i === 2 ? 'col-span-2 min-[1025px]:col-span-1 flex justify-center min-[1025px]:block' : ''}`}
                        >
                            <div className={i === 2 ? 'w-full max-w-[280px] min-[1025px]:max-w-none min-[1025px]:w-full h-full' : ''}>
                                <StatCard
                                    icon={stat.icon}
                                    num={stat.value}
                                    label={stat.label}
                                    sub={stat.sub}
                                    color={stat.color}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Filter Tabs */}
                <FilterTabs 
                    categories={categories} 
                    activeCategory={activeFilter} 
                    setActiveCategory={setActiveFilter} 
                    categoryCounts={categoryCounts} 
                />

                {/* HORIZONTAL DIVIDER */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.4),transparent)] mb-7" />

                {/* Research Cards — 1 col mobile, 2 tablet, 3 desktop */}
                <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[1025px]:grid-cols-3 gap-[20px] mb-8">
                    <AnimatePresence mode="popLayout">
                        {filteredResearch.map((research, index) => (
                            <motion.div
                                key={research.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ResearchCard
                                    research={research}
                                    index={index}
                                    onClick={setSelectedResearch}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>



            </div>

            {/* Modal */}
            {selectedResearch && (
                <ResearchModal
                    research={selectedResearch}
                    onClose={() => setSelectedResearch(null)}
                />
            )}

            {/* Inline styles for custom elements in this component */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .line-draw-anim {
          animation: drawLine 1.5s ease-out forwards;
            transform-origin: left;
        }
            @keyframes drawLine {
                from {transform: scaleX(0); opacity: 0; }
            to {transform: scaleX(1); opacity: 1; }
        }

            .dna-helix-container {
                background - image:
            radial-gradient(circle at center, rgba(236,72,153,0.15) 2px, transparent 3px),
            radial-gradient(circle at center, rgba(168,85,247,0.15) 2px, transparent 3px);
            background-size: 40px 100px;
            background-position: 0 0, 20px 50px;
            animation: dna-float 20s linear infinite;
        }

            @keyframes dna-float {
                0 % { background- position: 0 0, 20px 50px; }
            100% {background - position: 0 200px, 20px 250px; }
        }
      `}} />
        </section>
    );
};

// Removed duplicate hexToRgb since it's already top-level
export default React.memo(Research);
