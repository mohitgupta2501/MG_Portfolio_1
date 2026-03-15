import { useState, memo, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Briefcase, Trophy, Users, ClipboardCheck, Building2, GraduationCap, Crown, Dumbbell, Presentation, Code2, Zap, CalendarDays, Star, Rocket } from 'lucide-react';

function useCountUp(end, duration = 2000, inView) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (inView && !hasStarted) setHasStarted(true);
    }, [inView, hasStarted]);

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

    return count;
}

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const StatCard = memo(({ stat, i }) => {
    const color = stat.color;
    const colorRgb = hexToRgb(color) || '255,255,255';
    const Icon = stat.icon;

    return (
        <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
        >
            <div
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
                    {stat.value}
                </span>
                <span className="text-[#555] text-[10px] uppercase tracking-[1.5px] font-bold">
                    {stat.label}
                </span>
            </div>
        </motion.div>
    );
});
StatCard.displayName = 'StatCard';

const statsData = [
    { value: "4", label: "YEARS ACTIVE", color: "#22c55e", rgb: "34,197,94", icon: Calendar, },
    { value: "12+", label: "ROLES HELD", color: "#ff4d5a", rgb: "255,77,90", icon: Briefcase, },
    { value: "20+", label: "EVENTS LED", color: "#3b82f6", rgb: "59,130,246", icon: Trophy, },
    { value: "3", label: "COMMITTEES", color: "#f59e0b", rgb: "245,158,11", icon: Users, }
];

const tabData = {
    fourth: {
        id: 'fourth', label: "4th Year", range: "2025–Present", icon: Crown, title: "4th Year", color: '#22c55e', rgb: '34, 197, 94',
        yearLabel: "FOURTH YEAR", dateRange: "2025–Present", rolesCount: "4 Roles",
        items: [
            { type: 'header', label: "GOVERNANCE & MENTORSHIP" },
            {
                isFeatured: true, icon: GraduationCap, badge: "MENTOR",
                title: "Mentor, Departmental Forum NEXUS-DS",
                org: "NEXUS-DS FORUM · CSE DATA SCIENCE",
                desc: "Guiding junior students in academic planning and technical skill enhancement"
            },
            {
                icon: Users, title: "Member, Student Representative Council",
                org: "SRC · COLLEGE GOVERNANCE",
                desc: "Institutional student governance body"
            },
            {
                icon: ClipboardCheck, title: "Student Representative, IQAC",
                org: "INTERNAL QUALITY ASSURANCE CELL",
                desc: "Quality assurance and academic standards"
            },
            {
                icon: Building2, title: "Student Representative, CDC",
                org: "COLLEGE DEVELOPMENT COMMITTEE",
                desc: "College development and planning body"
            }
        ]
    },
    third: {
        id: 'third', label: "3rd Year", range: "2024–2025", icon: Star, title: "3rd Year", color: '#ff4d5a', rgb: '255, 77, 90',
        yearLabel: "THIRD YEAR", dateRange: "2024–2025", rolesCount: "8 Roles",
        items: [
            { type: 'header', label: "LEADERSHIP POSITIONS" },
            {
                isFeatured: true, icon: Crown, badge: "VICE PRESIDENT",
                title: "Vice President, Departmental Forum NEXUS-DS",
                org: "NEXUS-DS FORUM · CSE DATA SCIENCE",
                desc: "Departmental leadership for CSE Data Science"
            },
            {
                icon: Dumbbell, badge: "VICE PRESIDENT",
                title: "Vice President, Sports Club – SADC",
                org: "SPORTS CLUB · SADC",
                desc: "Student Affairs & Development Cell leadership"
            },
            {
                icon: Trophy, badge: "COORDINATOR",
                title: "Sports Coordinator (Overall College)",
                org: "INSIGHT · ANNUAL COLLEGE EVENT",
                desc: "Coordinated sports for annual cultural and sports festival"
            },
            {
                icon: ClipboardCheck, title: "Student Representative, IQAC",
                org: "INTERNAL QUALITY ASSURANCE CELL",
                desc: "Quality assurance representation"
            },
            {
                icon: Building2, title: "Student Representative, CDC",
                org: "COLLEGE DEVELOPMENT COMMITTEE",
                desc: "College development representation"
            },
            {
                icon: Users, title: "Member, Student Representative Council",
                org: "SRC · COLLEGE GOVERNANCE",
                desc: "Institutional student governance"
            },
            { type: 'header', label: "ACADEMIC & TECHNICAL" },
            {
                icon: Presentation, title: "Academic Events Coordinator",
                org: "DEPARTMENTAL · CSE DS",
                desc: "Managed multiple academic seminars, workshops, and departmental events"
            },
            {
                icon: Code2, title: "Technical Skills Facilitator",
                org: "DEPARTMENTAL · JUNIOR TRAINING",
                desc: "Delivered technical skill development sessions focusing on practical understanding"
            }
        ]
    },
    second: {
        id: 'second', label: "2nd Year", range: "2023–2024", icon: Zap, title: "2nd Year", color: '#3b82f6', rgb: '59, 130, 246',
        yearLabel: "SECOND YEAR", dateRange: "2023–2024", rolesCount: "5 Roles",
        items: [
            { type: 'header', label: "TECHNICAL LEADERSHIP" },
            {
                isFeatured: true, icon: Zap, badge: "TECHNICAL HEAD",
                title: "Technical Head (Hackathon)",
                org: "TECHNEX · COLLEGE TECHNICAL EVENT",
                desc: "Led hackathon at college-level technical flagship event"
            },
            {
                icon: Trophy, badge: "COORDINATOR",
                title: "Sports Coordinator (Dept – CSE DS)",
                org: "INSIGHT · ANNUAL COLLEGE EVENT",
                desc: "Departmental-level sports coordination"
            },
            {
                icon: Presentation, title: "Workshop Organiser",
                org: "DEPARTMENTAL · JUNIOR TRAINING",
                desc: "Organised technical skill development sessions for junior students"
            },
            { type: 'header', label: "EVENT MANAGEMENT" },
            {
                icon: CalendarDays, title: "Departmental Event Manager",
                org: "DEPARTMENTAL · CSE DS",
                desc: "Managed seminars, workshops and technical training programmes"
            },
            {
                icon: Users, title: "Member, Student Representative Council",
                org: "SRC · COLLEGE GOVERNANCE",
                desc: "Institutional student governance"
            }
        ]
    },
    first: {
        id: 'first', label: "1st Year", range: "2022–2023", icon: Rocket, title: "1st Year", color: '#f59e0b', rgb: '245, 158, 11',
        yearLabel: "FIRST YEAR", dateRange: "2022–2023", rolesCount: "3 Roles",
        items: [
            { type: 'header', label: "FOUNDATION YEAR" },
            {
                isFeatured: true, icon: Trophy, badge: "COORDINATOR",
                title: "Sports Coordinator (Entire First-Year Batch)",
                org: "INSIGHT · ANNUAL COLLEGE EVENT",
                desc: "Coordinated sports for the entire first-year batch"
            },
            {
                icon: Zap, badge: "TECHNICAL HEAD",
                title: "Technical Head, DATA DIVE",
                org: "DATA DIVE · DEPARTMENTAL EVENT",
                desc: "Led departmental technical flagship event"
            },
            {
                icon: CalendarDays, title: "Events Contributor",
                org: "INTRA-COLLEGE · ALL EVENTS",
                desc: "Planning and execution of technical, cultural, and sports activities"
            }
        ]
    }
};

const tabKeys = ['fourth', 'third', 'second', 'first'];

const Leadership = memo(() => {
    const [activeYear, setActiveYear] = useState('fourth');
    const currentTab = tabData[activeYear];
    const themeColor = '#ff4d5a';
    const themeRgb = '255, 77, 90';

    return (
        <section
            id="leadership"
            className="leadership-section pt-[80px] pb-[80px]"
            style={{ '--tab-color': themeColor, '--tab-rgb': themeRgb }}
        >
            <div className="lead-container">
                {/* HEADERS */}
                <div className="lead-header-wrap">
                    <h2 className="lead-watermark">LEADERSHIP</h2>
                    <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lead-header-content">
                        <div className="w-full flex justify-center mb-6 min-w-0">
                            <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] max-[480px]:text-[10px] font-medium uppercase rounded-[50px] px-[22px] max-[480px]:px-4 py-[7px] relative max-w-full truncate">
                                ● LEADERSHIP & ACTIVITIES
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                            </span>
                        </div>
                        <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] mb-4 leading-tight break-words">Leadership & Activities</h2>
                        <p className="lead-subtitle">From organizing events to guiding teams - leadership in action</p>
                    </motion.div>
                </div>

                {/* STATS ROW — 4 cards: 2x2 tablet/mobile, single row desktop */}
                <div className="grid grid-cols-2 min-[1025px]:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-7">
                    {statsData.map((stat, i) => (
                        <StatCard key={i} stat={stat} i={i} />
                    ))}
                </div>

                {/* TAB SWITCHER */}
                <div className="w-full flex flex-wrap justify-center gap-[10px] mb-5 px-4 min-w-0 overflow-hidden max-[480px]:px-2">
                    {tabKeys.map((key) => {
                        const tab = tabData[key];
                        const isActive = activeYear === key;
                        const Icon = tab.icon;
                        return (
                            <button
                                key={key}
                                onClick={() => setActiveYear(key)}
                                className={`group relative flex items-center px-[18px] py-[8px] rounded-[9999px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                                    ? 'text-white font-[700] shadow-[0_8px_24px_rgba(var(--tab-rgb),0.45),0_4px_12px_rgba(var(--tab-rgb),0.3)] -translate-y-[2px] border border-transparent'
                                    : 'bg-[rgba(255,255,255,0.04)] border transition-all duration-300 text-[#666] font-[500] hover:-translate-y-[2px] hover:shadow-[0_4px_16px_rgba(var(--tab-rgb),0.1)]'
                                    }`}
                                style={isActive ? {
                                    backgroundColor: 'var(--tab-color)'
                                } : {
                                    borderColor: `rgba(var(--tab-rgb), 0.3)`,
                                }}
                            >
                                <Icon className={`w-4 h-4 mr-2 transition-colors ${isActive ? 'text-white' : 'text-[#555] group-hover:text-[var(--tab-color)]'}`} />
                                {tab.title}
                            </button>
                        );
                    })}
                </div>

                {/* HORIZONTAL DIVIDER */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(var(--tab-rgb),0.4),transparent)] mb-7" />

                {/* ROLE GRID */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeYear}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-1 min-[481px]:grid-cols-2 gap-6"
                        >
                            {currentTab.items.filter((x) => x.type !== 'header').map((item, i) => (
                                <motion.div
                                    key={`${activeYear}-${i}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="ach-list-card bg-[#111] border border-[rgba(255,255,255,0.07)] rounded-xl p-5 flex items-start gap-5 transition-all duration-300 group cursor-default relative overflow-hidden border-l-[3px] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                                    style={{ borderLeftColor: 'var(--tab-color)' }}
                                >
                                    <div
                                        className="ach-badge-num flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold text-white transition-all duration-300"
                                        style={{ backgroundColor: 'var(--tab-color)' }}
                                    >
                                        {(i + 1).toString().padStart(2, '0')}
                                    </div>
                                    <p className="ach-description text-[#9ca3af] text-[15px] max-[480px]:text-[14px] leading-[1.6] transition-all duration-300 pt-1 break-words min-w-0">
                                        {item.title} {item.org && `— ${item.org}`} · {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* BOTTOM STRIP */}
                {/* <div className="lead-bottom-strip">
                    <span className="lbs-text">
                        ✦ <span className="lbs-emph">4</span> Years  ·  <span className="lbs-emph">12+</span> Roles  ·  <span className="lbs-emph">20+</span> Events Led  ·  Student Governance & Technical Leadership
                    </span>
                </div> */}
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .leadership-section {
                    position: relative;
                    background: #080808;
                    font-family: inherit;
                    min-height: 100vh;
                }
                .lead-container {
                    max-width: 1280px;
                    margin: 0 auto;
                    padding: 0 16px;
                    position: relative;
                    z-index: 10;
                }
                @media (max-width: 480px) {
                    .lead-container { padding: 0 12px; }
                }
                /* HEADER */
                .lead-header-wrap {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 40px;
                    position: relative;
                    width: 100%;
                    min-width: 0;
                }
                .lead-watermark {
                    position: absolute;
                    top: -20px; left: 50%;
                    transform: translateX(-50%);
                    font-size: 120px;
                    font-weight: 900;
                    color: rgba(255,255,255,0.015);
                    pointer-events: none;
                    user-select: none;
                    white-space: nowrap;
                    margin: 0;
                }
                @media (max-width: 480px) {
                    .lead-watermark { font-size: 70px; }
                }
                .lead-header-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    position: relative;
                    z-index: 10;
                }
                .lead-subtitle {
                    color: #aaaaaa;
                    font-size: 15px;
                    max-width: 560px;
                    margin: 0 auto;
                    line-height: 1.7;
                    text-align: center;
                    word-break: break-word;
                }
                @media (max-width: 480px) {
                    .lead-subtitle { font-size: 14px; }
                }



                /* TAB SWITCHER */
                .tab-switcher {
                    display: flex;
                    gap: 0;
                    margin: 0 auto 32px auto;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    overflow: hidden;
                    background: #0d0d0d;
                    width: fit-content;
                }
                .tab-wrapper { display: flex; align-items: stretch; }
                .tab-divider { width: 1px; background: rgba(255,255,255,0.05); }
                .tab-btn {
                    padding: 14px 36px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.3s;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: #444;
                    display: flex;
                    align-items: center;
                }
                .tab-icon { margin-right: 8px; width: 16px; height: 16px; }
                .tab-btn:hover:not(.active) {
                    color: #888;
                    background: rgba(255,255,255,0.03);
                }
                .tab-btn.active {
                    background: rgba(34,197,94,0.1);
                    color: #22c55e;
                    box-shadow: inset 0 0 0 1px rgba(34,197,94,0.25);
                }
                .tab-active-indicator {
                    position: absolute;
                    bottom: 0; left: 20%; right: 20%;
                    height: 2px;
                    background: #22c55e;
                    border-radius: 2px 2px 0 0;
                }

                /* CONTEXT STRIP */
                .ctx-strip {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }
                .ctx-dot {
                    width: 8px; height: 8px;
                    border-radius: 50%;
                    background: #22c55e;
                    box-shadow: 0 0 8px rgba(34,197,94,0.6);
                    animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse-dot {
                    0%, 100% { opacity: 1; }
                    50% { opacity: .5; }
                }
                .ctx-label {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    color: #22c55e;
                    font-weight: 700;
                }
                .ctx-date {
                    font-size: 12px;
                    color: #444;
                }
                .ctx-pill {
                    margin-left: auto;
                    background: rgba(34,197,94,0.08);
                    border: 1px solid rgba(34,197,94,0.18);
                    color: #22c55e;
                    font-size: 10px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    font-weight: 600;
                    border-radius: 50px;
                    padding: 3px 12px;
                }

                /* ROLE GRID */
                .role-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .list-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 4px;
                    margin-top: 24px;
                }
                .list-header.first { margin-top: 0; }
                .lh-label {
                    font-size: 9px;
                    color: #22c55e;
                    letter-spacing: 3px;
                    text-transform: uppercase;
                    font-weight: 700;
                }
                .lh-line {
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(to right, rgba(34,197,94,0.35), transparent);
                }

                /* ROLE CARD / LIST ITEM */
                .role-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    padding: 18px 22px;
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.05);
                    background: rgba(255,255,255,0.01);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.25s ease;
                }
                .role-accent {
                    position: absolute;
                    left: 0; top: 0; bottom: 0;
                    width: 3px;
                    background: rgba(var(--tab-rgb), 0.2);
                    transition: 0.25s;
                }
                .role-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    background: linear-gradient(90deg, transparent, rgba(var(--tab-rgb), 0.04), transparent);
                    transform: translateX(-100%);
                }
                @keyframes shimmer-role {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .role-card:hover {
                    background: rgba(var(--tab-rgb), 0.04);
                    border-color: rgba(var(--tab-rgb), 0.2);
                    transform: translateY(-4px);
                    box-shadow: 0 8px 32px rgba(var(--tab-rgb), 0.1);
                }
                .role-card:hover .role-accent {
                    background: rgba(var(--tab-rgb), 1);
                    width: 4px;
                }
                .role-card:hover::before {
                    animation: shimmer-role 0.6s ease-out;
                }
                .role-badge {
                    width: 32px; height: 32px;
                    border-radius: 50%;
                    background: rgba(var(--tab-rgb), 0.08);
                    border: 1px solid rgba(var(--tab-rgb), 0.18);
                    font-size: 11px;
                    font-weight: 800;
                    color: var(--tab-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    transition: all 0.25s;
                }
                .role-card:hover .role-badge {
                    background: rgba(var(--tab-rgb), 0.15);
                    border-color: rgba(var(--tab-rgb), 0.35);
                    transform: scale(1.1);
                }
                .role-text {
                    font-size: 13px;
                    color: #777;
                    line-height: 1.75;
                    transition: color 0.25s;
                    flex: 1;
                }
                .role-card:hover .role-text {
                    color: rgba(255,255,255,0.88);
                }

                /* BOTTOM STRIP */
                .lead-bottom-strip {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.06);
                    border-radius: 50px;
                    padding: 14px 40px;
                    width: fit-content;
                    margin: 48px auto 0;
                    display: block;
                    text-align: center;
                    transition: 0.3s;
                }
                .lead-bottom-strip:hover {
                    border-color: rgba(34,197,94,0.2);
                    background: rgba(34,197,94,0.03);
                }
                .lbs-text {
                    color: #555;
                    font-size: 13px;
                }
                .lbs-emph {
                    color: #22c55e;
                    font-weight: 700;
                }

                /* RESPONSIVE */
                @media (max-width: 768px) {
                    .tab-btn { padding: 10px 16px; font-size: 10px; }
                    .tab-range { display: none; }
                }

                /* Achievement List Card Hover Effects */
                .ach-list-card:hover {
                    transform: translateY(-2px);
                    background: rgba(var(--tab-rgb), 0.06) !important;
                    border-color: rgba(var(--tab-rgb), 0.35) !important;
                    border-left: 3px solid var(--tab-color) !important;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
                }
                .ach-list-card:hover .ach-badge-num {
                    transform: scale(1.05);
                    box-shadow: 0 0 8px rgba(var(--tab-rgb), 0.4);
                    background-color: var(--tab-color) !important;
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
Leadership.displayName = 'Leadership';
export default Leadership;
