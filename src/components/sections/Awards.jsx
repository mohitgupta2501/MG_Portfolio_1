import { useState, useMemo, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trophy, Medal, Users, Award,
    Target, Star, Zap, GraduationCap,
    Binary, Globe, School, Type,
    Flag, Landmark, Shield, Building2
} from 'lucide-react';

// Stats Data by Tab
const tabData = {
    athletics: {
        title: "Athletics",
        icon: Trophy,
        color: '#ff4d5a', // Vibrant Coral
        rgb: '255, 77, 90',
        stats: [
            { label: 'Total Medals', value: '64+', icon: Medal, color: '#ff4d5a' },
            { label: 'Gold Medals', value: '45', icon: Trophy, color: '#60a5fa' },
            { label: 'National Medal', value: '1', icon: Flag, color: '#e879f9' },
            { label: 'State Representations', value: '12+', icon: Building2, color: '#a78bfa' },
            { label: 'RTMNU Champion', value: '4×', icon: Award, color: '#fbbf24' },
            { label: 'Trophies / Shields', value: '7', icon: Shield, color: '#34d399' }
        ],
        items: [
            { text: "Earned 64+ Medals (45 Gold, 12 Silver, 7 Bronze) and 7 Trophies/Shields across multidisciplinary competitive sports" },
            { text: "Represented Maharashtra State on more than 12 occasions across major cities including Pune, Mumbai, and Nagpur" },
            { text: "Represented Nagpur University three times at State-Level Athletics Championships (Ashwamedh Games)" },
            { text: "Four-time consecutive Gold Medalist in Shot Put and Discus Throw at RTMNU University Championships" },
            { text: "Honoured with the title 'Best Thrower (Athlete)' at the Nagpur District level" },
            { text: "Secured Gold Medal at the National-Level Tug of War Championship" },
            { text: "Competed across Shot Put and Discus Throw at Taluka, District, Vidarbha, and State levels" },
            { text: "Actively competed in Powerlifting and Bodybuilding competitions" },
            { text: "Participated in Running, Skating, and Swimming" },
            { text: "Competed in Hockey, Football, and Cricket" }
        ]
    },
    mathematics: {
        title: "Mathematics",
        icon: Binary,
        color: '#ff4d5a', // Vibrant Coral
        rgb: '255, 77, 90',
        stats: [
            { label: 'Total Medals', value: '23', icon: Medal, color: '#ff4d5a' },
            { label: 'Gold Medals', value: '22', icon: Trophy, color: '#60a5fa' },
            { label: 'National Gold', value: '4×', icon: Flag, color: '#e879f9' },
            { label: 'International Qualified', value: '3×', icon: Globe, color: '#a78bfa' },
            { label: 'Trophies / Shields', value: '16', icon: Shield, color: '#fbbf24' }
        ],
        items: [
            { text: "Awarded 23 Medals (22 Gold, 1 Bronze) and 16 Trophies/Shields across Taluka, District, Vidarbha, State, and National competitions" },
            { text: "Secured First Rank at Taluka, District, Vidarbha, State, and National levels" },
            { text: "Four-time National Gold Medalist in Abacus competitions" },
            { text: "Qualified three times for the International Abacus Championship" },
            { text: "Recipient of the \"Champion of Champions\" Trophy at the National Level for two consecutive years" },
            { text: "Successfully completed 8 levels of Abacus and 2 levels of Vedic Mathematics with Maximum Grade (A++)" }
        ]
    },
    academic: {
        title: "Academic",
        icon: GraduationCap,
        color: '#ff4d5a', // Vibrant Coral
        rgb: '255, 77, 90',
        stats: [
            { label: 'University First Rank', value: '4×', icon: GraduationCap, color: '#ff4d5a' },
            { label: 'IMO National Level', value: '3×', icon: Target, color: '#60a5fa' },
            { label: 'Best Student Awards', value: '2', icon: Star, color: '#e879f9' },
            { label: 'NCC Rank', value: 'LCPL', icon: Zap, color: '#a78bfa' }
        ],
        items: [
            { text: "Awarded Best Student / Student of the Year for sustained academic excellence" },
            { text: "Secured First Rank consecutively in 1st, 2nd, 3rd, and 4th years of undergraduate engineering" },
            { text: "Gold Medalist, International Mathematics Olympiad (SOF); represented at national level for three consecutive years" },
            { text: "Participant, UNSW Global Examinations (Australia)" },
            { text: "Gold Medalist, Maharashtra Speed Mathematics Test" },
            { text: "Recipient of Best Student Award (School 1) from Class 1 to Class 4" },
            { text: "Recipient of Best Student Award (School 2) from Class 5 to Class 10" },
            { text: "Appointed Environment Minister (Class 4)" },
            { text: "Served as Red House Captain (Class 10)" },
            { text: "NCC Cadet, achieved rank of Lance Corporal (LCPL)" },
            { text: "Certified typing proficiency of 30 WPM with Distinction" }
        ]
    }
};

// Stat Counter Hook
function useCountUp(endStr, duration = 2000) {
    const end = parseInt(endStr.replace(/[^0-9]/g, '')) || 0;
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

// Helper to get RGB from Hex
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

// Stat Card Component
const StatCard = memo(({ icon: Icon, num, label, color }) => {
    const isPlus = num.includes('+');
    const isTimes = num.includes('×');
    const isText = isNaN(parseInt(num.replace(/[^0-9]/g, '')));
    const { count, ref } = useCountUp(num, 1500);
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
            <Icon className="stat-icon w-6 h-6 mb-3 transition-all duration-300" style={{ color: color }} />
            <span
                className="stat-value font-bold text-[clamp(24px,3vw,32px)] leading-none mb-1.5 transition-all duration-300"
                style={{ color: color }}
            >
                {isText ? num : (isTimes ? `${count}×` : `${count}${isPlus ? '+' : ''}`)}
            </span>
            <span className="text-[#555] text-[10px] uppercase tracking-[1.5px] font-bold">
                {label}
            </span>
        </div>
    );
});

StatCard.displayName = 'StatCard';

const Awards = memo(() => {
    const [activeTab, setActiveTab] = useState('athletics');
    const { color, rgb, stats, items } = tabData[activeTab];

    return (
        <section id="awards" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden min-h-screen" style={{ '--tab-color': color, '--tab-rgb': rgb }}>

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full animate-[breathe_18s_ease-in-out_infinite]"
                    style={{ background: `radial-gradient(circle, rgba(${rgb}, 0.04) 0%, transparent 70%)` }}
                />
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full animate-[breathe_22s_ease-in-out_infinite_reverse]"
                    style={{ background: `radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)` }}
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 relative z-10 w-full min-w-0">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center mb-10 relative w-full min-w-0">
                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] max-[480px]:text-[60px] min-[481px]:text-[120px] min-[1025px]:text-[160px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-widest whitespace-nowrap overflow-hidden max-w-full" aria-hidden>
                        Honors
                    </h2>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center min-w-0"
                    >
                        {/* RED BADGE (Matching other sections) */}
                        <div className="w-full flex justify-center mb-6 min-w-0">
                            <span className="px-[22px] max-[480px]:px-4 py-[7px] rounded-[50px] border font-medium bg-[rgba(255,77,90,0.1)] border-[rgba(255,77,90,0.3)] text-[#ff4d5a] text-[11px] max-[480px]:text-[10px] uppercase tracking-[4px] relative max-w-full truncate">
                                ● AWARDS & HONORS
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                            </span>
                        </div>

                        <h2 className="section-heading text-[#ffffff] text-center font-[800] break-words text-[clamp(24px,5.5vw,66px)] max-[480px]:text-[clamp(22px,5vw,30px)]" style={{ letterSpacing: '-0.02em' }}>
                            Awards & Honors
                        </h2>

                        <p className="text-[#888888] text-[15px] min-[481px]:text-[16px] max-[480px]:text-[14px] italic text-center max-w-2xl w-full font-light mt-3 min-w-0 break-words px-2">
                            Celebrating milestones achieved through passion, hard work, and determination.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Grid — 4→2x2, 3→2+1 centered, 6→3x2 tablet / 2x3 mobile */}
                <div className={`grid gap-[16px] max-w-[1100px] mx-auto mb-7 items-stretch
                    grid-cols-2
                    ${stats.length === 3 ? 'min-[1025px]:grid-cols-3' : stats.length === 4 ? 'min-[1025px]:grid-cols-4' : 'min-[481px]:grid-cols-3 min-[1025px]:grid-cols-6'}
                `}>
                    {stats.map((stat, i) => (
                        <div key={`${activeTab}-${i}`} className={`h-full min-w-0 ${stats.length === 3 && i === 2 ? 'col-span-2 min-[1025px]:col-span-1 flex justify-center min-[1025px]:block' : ''}`}>
                            <div className={stats.length === 3 && i === 2 ? 'w-full max-w-[280px] min-[1025px]:max-w-none min-[1025px]:w-full h-full' : 'h-full w-full'}>
                                <StatCard
                                    icon={stat.icon}
                                    num={stat.value}
                                    label={stat.label}
                                    color={stat.color}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pill Style Tabs */}
                <div className="w-full flex flex-wrap justify-center gap-[10px] mb-5 px-4 min-w-0 overflow-hidden max-[480px]:px-2">
                    {Object.entries(tabData).map(([key, data]) => {
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key)}
                                className={`group relative flex items-center px-[18px] py-[8px] rounded-[9999px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                                    ? 'text-white font-[700] shadow-[0_8px_24px_rgba(var(--tab-rgb),0.45),0_4px_12px_rgba(var(--tab-rgb),0.3)] -translate-y-[2px] border border-transparent'
                                    : 'bg-[rgba(255,255,255,0.04)] border transition-all duration-300 text-[#666] font-[500] hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(var(--tab-rgb),0.1)]'
                                    }`}
                                style={isActive ? {
                                    backgroundColor: data.color
                                } : {
                                    borderColor: `rgba(${data.rgb}, 0.3)`,
                                }}
                            >
                                <data.icon className={`w-4 h-4 mr-2 transition-colors ${isActive ? 'text-white' : 'text-[#555] group-hover:text-[var(--tab-color)]'}`} />
                                {data.title}
                            </button>
                        );
                    })}
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(var(--tab-rgb),0.4),transparent)] mb-7" />

                {/* TAB CONTENT PANEL */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 min-[481px]:grid-cols-2 gap-6"
                        >
                            {items.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="ach-list-card bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-xl p-5 flex items-start gap-5 transition-all duration-300 group cursor-default relative overflow-hidden border-l-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                                    style={{ borderLeftColor: '#ff4d5a' }}
                                >
                                    <div className="ach-badge-num flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white transition-all duration-300"
                                        style={{ backgroundColor: '#ff4d5a' }}>
                                        {(i + 1).toString().padStart(2, '0')}
                                    </div>
                                    <p className="ach-description text-[#9ca3af] text-[15px] max-[480px]:text-[14px] leading-[1.6] transition-all duration-300 pt-1 break-words min-w-0">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

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

                /* Achievement List Card Hover Effects */
                .ach-list-card:hover {
                    transform: translateY(-2px);
                    background: rgba(255, 77, 90, 0.06) !important;
                    border-color: #ef4444 !important;
                    border-left: 3px solid #ff4d5a !important;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                }
                .ach-list-card:hover .ach-badge-num {
                    transform: scale(1.05);
                    box-shadow: 0 0 8px rgba(255, 77, 90, 0.4);
                    background-color: #ff4d5a !important;
                }
                .ach-list-card:hover .ach-description {
                    color: #e2e8f0;
                }

                .ach-list-card {
                    transition: all 0.25s ease !important;
                }
                `
            }} />
        </section>
    );
});

Awards.displayName = 'Awards';
export default Awards;
