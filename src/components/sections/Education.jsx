import { useState, useRef, useEffect, memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Trophy, Award, FileText } from 'lucide-react';
import EducationCard from '../ui/EducationCard';
import EducationModal from '../ui/EducationModal';
import { educationData } from '@/data/education';

// --- STYLES INJECTED AS CONSTANT (AVOIDING EXTERNAL CSS DEPENDENCY) ---
const INJECTED_STYLES = `
@keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(255, 77, 90, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(255, 77, 90, 0); }
    100% { box-shadow: 0 0 0 0 rgba(255, 77, 90, 0); }
}
`;

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

// Helper to get RGB from Hex for CSS custom properties
const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

// Stat Card Component
const StatCard = memo(({ icon: Icon, num, label, sub, color }) => {
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

const EducationStats = memo(() => {
    const stats = [
        { label: "CGPA", val: "9", icon: Star, color: "#ff4d5a", rgb: "255, 77, 90", suffix: "60" },
        { label: "1ST/2ND/3RD/4TH YEAR RANK", val: "1st", icon: Trophy, color: "#f59e0b", rgb: "245, 158, 11" },
        { label: "TOTAL AWARDS/MEDALS", val: "78+", icon: Award, color: "#22c55e", rgb: "34, 197, 94" },
        { label: "RESEARCH PAPERS", val: "4", icon: FileText, color: "#a855f7", rgb: "168, 85, 247" }
    ];

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 md:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-[32px] items-stretch"
        >
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                    className="h-full"
                >
                    <StatCard
                        icon={stat.icon}
                        num={stat.val}
                        label={stat.label}
                        sub={stat.sub}
                        color={stat.color}
                    />
                </motion.div>
            ))}
        </motion.div>
    );
});

const EducationTimeline = memo(() => {
    const timelineRef = useRef(null);
    const isInView = useInView(timelineRef, { once: true, margin: "-50px" });
    const lineRef = useRef(null);

    useEffect(() => {
        if (isInView && lineRef.current) {
            lineRef.current.style.width = '100%';
        }
    }, [isInView]);

    const nodes = [
        { year: "2009", label: "SSC", marker: "89.40%", color: "#22c55e", rgb: "34, 197, 94" },
        { year: "2020", label: "HSC", marker: "87.67%", color: "#f59e0b", rgb: "245, 158, 11" },
        { year: "2022", label: "B.Tech", marker: "9.60 CGPA", color: "#ff4d5a", rgb: "255, 77, 90" },
        { year: "2026", label: "(Current)", marker: "Pursuing", color: "#ff4d5a", rgb: "255, 77, 90", pulse: true }
    ];
});

export default function Education() {
    const [selectedEducation, setSelectedEducation] = useState(null);

    // Reorder: B.Tech (primary), HSC (secondary), SSC (secondary)
    const btech = educationData.find(e => e.id === 'btech');
    const hsc = educationData.find(e => e.id === 'hsc');
    const ssc = educationData.find(e => e.id === 'ssc');

    return (
        <section id="education" className="pt-[80px] pb-[80px] relative bg-[#080808] overflow-hidden">
            <style>{INJECTED_STYLES}</style>

            {/* Background Ambience (Unchanged as per rules) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.04)_0%,transparent_70%)] animate-[breathe_18s_ease-in-out_infinite]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.03)_0%,transparent_70%)] animate-[breathe_22s_ease-in-out_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.025)_0%,transparent_70%)] animate-[breathe_28s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)]" style={{ backgroundSize: '32px 32px' }} />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                {/* Header (Unchanged as per rules) */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center text-center relative mb-8"
                >
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(100px,18vw,260px)] font-[900] leading-none text-white/[0.015] pointer-events-none tracking-tighter w-full select-none z-0">
                        EDUCATION
                    </span>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center mb-0">
                            <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] font-medium uppercase rounded-[50px] px-[22px] py-[7px]">
                                ● EDUCATION
                            </span>
                        </div>
                        <div className="w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px] mx-auto mb-6 mt-[8px]" />

                        <h2 className="text-[#ffffff] font-[800] text-[clamp(42px,5.5vw,66px)] leading-[1.1] mb-5 tracking-tight">
                            Academic Journey
                        </h2>

                        <p className="text-[#888] text-[16px] italic max-w-[580px] leading-relaxed mx-auto">
                            From foundational excellence to cutting-edge AI research —
                            <br className="hidden sm:block" /> a decade of academic distinction
                        </p>
                    </div>
                </motion.div>

                {/* Stats */}
                <EducationStats />

                {/* NEW 3-COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-5 w-full mx-auto items-stretch">
                    <EducationCard edu={btech} index={0} onViewDetails={setSelectedEducation} />
                    <EducationCard edu={hsc} index={1} onViewDetails={setSelectedEducation} />
                    <EducationCard edu={ssc} index={2} onViewDetails={setSelectedEducation} />
                </div>

                {/* Timeline */}
                <EducationTimeline />
            </div>

            <EducationModal
                edu={selectedEducation}
                onClose={() => setSelectedEducation(null)}
            />

        </section>
    );
}
