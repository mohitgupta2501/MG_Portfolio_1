
import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import {
    Brain, Cpu, Globe, Code2, Database, BarChart2,
    Wrench, Heart, Eye, Users, LayoutGrid, Layers
} from 'lucide-react';

export const skillStats = [
  {
    value: "65+",
    label: "Technologies",
    icon: "cpu",
    color: "#ff4d5a"
  },
  {
    value: "9+",
    label: "AI / ML Models",
    icon: "brain",
    color: "#3b82f6"
  },
  {
    value: "14+",
    label: "Frameworks",
    icon: "layers",
    color: "#a855f7"
  },
  {
    value: "5",
    label: "Languages",
    icon: "code",
    color: "#22c55e"
  }
];

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const iconMap = {
    cpu: Cpu,
    brain: Brain,
    layers: Layers,
    code: Code2,
};

const stats = skillStats.map((stat) => ({
    value: stat.value,
    label: stat.label,
    icon: iconMap[stat.icon] || Cpu,
    color: stat.color,
    rgb: hexToRgb(stat.color) || '255, 255, 255',
}));

const filterTabs = [
    'All', 'AI & ML', 'Deep Learning', 'Programming',
    'Web & Backend', 'Data & Viz', 'Tools', 'Healthcare',
    'Computer Vision', 'Soft Skills'
];

const SkillPill = ({ name, categoryRGB }) => (
    <div
        className="skill-pill"
        style={{ '--cat-rgb': categoryRGB }}
    >
        <span className="leading-tight">{name}</span>
    </div>
);

const BentoBox = ({ children, className, rgb, color, category, activeFilter, delay = 0 }) => {
    const isMismatched = activeFilter !== 'All' && category !== activeFilter;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className={`bento-box group ${isMismatched ? 'bento-mismatched' : 'bento-matched'} ${className}`}
            style={{
                '--cat-rgb': rgb,
                '--cat-color': color,
            }}
        >
            <div className="bento-glow-blob" />
            {children}
            <div className="top-edge-glow" />
        </motion.div>
    );
};

const SkillsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    return (
        <section id="skills" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden">
            <style>{`
                .stat-card {
                    background: #111;
                    border: 1px solid #1a1a1a;
                    border-radius: 16px;
                    transition: all 0.3s ease;
                }
                .stat-card:hover {
                    transform: translateY(-6px);
                    background-color: rgba(var(--cat-rgb), 0.08);
                    border-color: rgba(var(--cat-rgb), 0.3);
                    box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.2);
                }
                .stat-card:hover .stat-icon {
                    filter: drop-shadow(0 0 8px var(--cat-color));
                }
                .stat-card:hover .stat-value {
                    text-shadow: 0 0 12px var(--cat-color);
                }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

                .bento-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                    align-items: start;
                    width: 100%;
                }
                .bento-col {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                @media (max-width: 1024px) {
                    .bento-grid { grid-template-columns: repeat(2, 1fr); }
                    .bento-col { display: contents; }
                    .bento-box-10 { grid-column: span 2; }
                }
                @media (max-width: 640px) {
                    .bento-grid { grid-template-columns: 1fr; }
                    .bento-box-10 { grid-column: span 1; }
                }

                .bento-box {
                    background: #0e0e0e;
                    border: 1px solid rgba(255, 255, 255, 0.07);
                    border-radius: 20px;
                    padding: 22px;
                    position: relative;
                    overflow: hidden;
                    cursor: default;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .bento-mismatched { opacity: 0.3; transform: scale(0.97); filter: grayscale(0.5); }
                .bento-matched    { opacity: 1;   filter: grayscale(0); }
                .bento-box:hover {
                    opacity: 1;
                    filter: grayscale(0);
                    border-color: rgba(var(--cat-rgb), 0.45);
                    box-shadow: 0 0 0 1px rgba(var(--cat-rgb), 0.15),
                                0 24px 64px rgba(var(--cat-rgb), 0.18);
                    transform: translateY(-6px) scale(1.01);
                }
                .bento-glow-blob {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    margin: auto;
                    background: radial-gradient(circle at 50% 0%, rgba(var(--cat-rgb), 0.12) 0%, transparent 70%);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 1;
                }
                .bento-box:hover .bento-glow-blob { opacity: 1; }
                .top-edge-glow {
                    position: absolute;
                    top: 0; left: 10%; right: 10%; height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(var(--cat-rgb), 0.8), transparent);
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 2;
                }
                .bento-box:hover .top-edge-glow { opacity: 1; }

                .skill-pill {
                    background-color: rgba(var(--cat-rgb), 0.07);
                    border: 1px solid rgba(var(--cat-rgb), 0.18);
                    color: rgba(255, 255, 255, 0.82);
                    font-size: 12px;
                    font-weight: 500;
                    border-radius: 8px;
                    padding: 5px 12px;
                    transition: all 0.2s ease;
                    display: inline-flex;
                    align-items: center;
                    white-space: nowrap;
                    gap: 6px;
                }
                .skill-pill:hover {
                    background-color: rgba(var(--cat-rgb), 0.16);
                    border-color: rgba(var(--cat-rgb), 0.45);
                    color: #fff;
                    transform: translateY(-2px) scale(1.03);
                    box-shadow: 0 4px 14px rgba(var(--cat-rgb), 0.22);
                }
            `}</style>


            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(255,77,90,0.04)] rounded-full blur-[100px] animate-[breathe_18s_ease-in-out_infinite]" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[rgba(139,92,246,0.04)] rounded-full blur-[100px] animate-[breathe_22s_ease-in-out_infinite_reverse]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(59,130,246,0.025)] rounded-full blur-[120px] animate-[breathe_28s_ease-in-out_infinite]" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center mb-10 relative"
                >
                    <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[15vw] md:text-[140px] font-bold text-white/[0.015] pointer-events-none select-none tracking-widest uppercase">
                        SKILLS
                    </span>
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] font-medium uppercase rounded-[50px] px-[22px] py-[7px] relative">
                            ● SKILLS
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="text-[#ffffff] font-[800] text-[clamp(42px,5.5vw,66px)] leading-tight tracking-tight">
                        Technical Skills
                    </h2>
                    <p className="text-[#888] text-[16px] italic max-w-2xl mx-auto mt-3">
                       A powerful toolkit of technologies built through hands-on projects and continuous learning.
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-7"
                >
                    {stats.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={i}
                                className="stat-card p-5 flex flex-col items-center justify-center text-center group cursor-default"
                                style={{ '--cat-color': stat.color, '--cat-rgb': stat.rgb }}
                            >
                                <Icon className="stat-icon w-6 h-6 mb-3 transition-all duration-300" style={{ color: stat.color }} />
                                <span className="stat-value font-bold text-[clamp(24px,3vw,32px)] leading-none mb-1.5 transition-all duration-300" style={{ color: stat.color }}>{stat.value}</span>
                                <span className="text-[#555] text-[10px] uppercase tracking-[1.5px] font-bold">{stat.label}</span>
                            </div>
                        );
                    })}
                </motion.div>

                {/* BENTO GRID */}
                <div className="bento-grid">

                    {/* LEFT COLUMN */}
                    <div className="bento-col">
                        {/* BOX 1 — CORE EXPERTISE */}
                        <BentoBox
                            color="#ff4d5a"
                            rgb="255,77,90"
                            delay={0.06 * 0}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(255,77,90,0.12)] border border-[rgba(255,77,90,0.25)] group-hover:bg-[rgba(255,77,90,0.2)] transition-colors duration-300">
                                    <Brain className="w-5 h-5 text-[#ff4d5a]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#ff4d5a] transition-colors">AI & Machine Learning</h3>
                            </div>
                            {/* Skill Pills */}
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'Supervised Learning', 'Unsupervised Learning', 'Feature Engineering',
                                    'Ensemble Methods', 'XGBoost', 'LightGBM', 'CatBoost',
                                    'Random Forest', 'Predictive Analytics', 'Data Preprocessing',
                                    'CRISP-DM', 'Model Evaluation',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="255,77,90" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 6 — DATA ANALYSIS & VIZ */}
                        <BentoBox
                            color="#f97316"
                            rgb="249,115,22"
                            delay={0.06 * 5}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(249,115,22,0.12)] border border-[rgba(249,115,22,0.25)] group-hover:bg-[rgba(249,115,22,0.2)] transition-colors duration-300">
                                    <BarChart2 className="w-5 h-5 text-[#f97316]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#f97316] transition-colors">Data Analysis & Visualization</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'Power BI', 'Tableau', 'Plotly / Dash', 'EDA',
                                    'Data Visualization', 'Business Analytics', 'Data Cleaning', 'Decision Making',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="249,115,22" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 10 — SOFT SKILLS */}
                        <BentoBox
                            className="bento-box-10"
                            color="#a855f7"
                            rgb="168,85,247"
                            delay={0.06 * 9}
                        >
                            <div className="flex flex-col w-full relative z-10">
                                {/* Top Header Section */}
                                <div className="flex flex-row items-center gap-[16px] mb-[16px]">
                                    <div className="w-[44px] h-[44px] rounded-[12px] bg-[rgba(168,85,247,0.12)] border border-[rgba(168,85,247,0.25)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(168,85,247,0.2)] transition-colors duration-300">
                                        <Users className="w-5 h-5 text-[#a855f7]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-[18px] font-bold text-white group-hover:text-[#a855f7] transition-colors leading-tight">
                                            Leadership & Soft Skills
                                        </h3>
                                        {/* <p className="text-[#555] text-[12px] mt-[3px]">
                                            Beyond the code — building teams and communities
                                        </p> */}
                                    </div>
                                </div>

                                {/* Bottom Pills Section */}
                                <div className="flex flex-wrap gap-2 w-full">
                                    {[
                                        'Leadership', 'Public Speaking', 'Community Outreach',
                                        'Program Coordination', 'Stakeholder Communication', 'Problem Solving',
                                        'Volunteer Management', 'Event Planning', 'Social Impact',
                                        'Entrepreneurship', 'Business Strategy',
                                    ].map((name, i) => (
                                        <SkillPill key={i} name={name} categoryRGB="168,85,247" />
                                    ))}
                                </div>
                            </div>
                        </BentoBox>
                    </div>

                    {/* MIDDLE COLUMN */}
                    <div className="bento-col">
                        {/* BOX 2 — DEEP LEARNING */}
                        <BentoBox
                            color="#ec4899"
                            rgb="236,72,153"
                            delay={0.06 * 1}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(236,72,153,0.12)] border border-[rgba(236,72,153,0.25)] group-hover:bg-[rgba(236,72,153,0.2)] transition-colors duration-300">
                                    <Cpu className="w-5 h-5 text-[#ec4899]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#ec4899] transition-colors">Deep Learning</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'Neural Networks', 'CNN', 'LSTM', 'PyTorch',
                                    'Diffusion Models', 'Generative AI', 'EEG Processing', 'Biomedical Signal',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="236,72,153" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 5 — DATABASES */}
                        <BentoBox
                            color="#06b6d4"
                            rgb="6,182,212"
                            delay={0.06 * 4}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(6,182,212,0.12)] border border-[rgba(6,182,212,0.25)] group-hover:bg-[rgba(6,182,212,0.2)] transition-colors duration-300">
                                    <Database className="w-5 h-5 text-[#06b6d4]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#06b6d4] transition-colors">Databases</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {['MySQL', 'SQLite', 'MS SQL Server', 'MongoDB', 'Database Design'].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="6,182,212" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 8 — HEALTHCARE AI */}
                        <BentoBox
                            color="#f43f5e"
                            rgb="244,63,94"
                            delay={0.06 * 7}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(244,63,94,0.12)] border border-[rgba(244,63,94,0.25)] group-hover:bg-[rgba(244,63,94,0.2)] transition-colors duration-300">
                                    <Heart className="w-5 h-5 text-[#f43f5e]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#f43f5e] transition-colors">Healthcare AI & Biomedical</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'EEG Signal Processing', 'Biomedical Data Analysis',
                                    'Clinical Risk Stratification', 'Medical Decision Support',
                                    'Clinical Decision Support', 'Healthcare AI',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="244,63,94" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 9 — COMPUTER VISION + XAI */}
                        <BentoBox
                            color="#8b5cf6"
                            rgb="139,92,246"
                            delay={0.06 * 8}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.25)] group-hover:bg-[rgba(139,92,246,0.2)] transition-colors duration-300">
                                    <Eye className="w-5 h-5 text-[#8b5cf6]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#8b5cf6] transition-colors">Computer Vision & XAI</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'OpenCV', 'Object Detection', 'Image Processing',
                                    'torchvision', 'SHAP', 'LIME', 'Pattern Recognition',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="139,92,246" />
                                ))}
                            </div>
                        </BentoBox>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="bento-col">
                        {/* BOX 3 — WEB & BACKEND */}
                        <BentoBox
                            color="#22c55e"
                            rgb="34,197,94"
                            delay={0.06 * 2}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] group-hover:bg-[rgba(34,197,94,0.2)] transition-colors duration-300">
                                    <Globe className="w-5 h-5 text-[#22c55e]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#22c55e] transition-colors">Web & Backend</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'Django', 'React.js', 'Flask', 'Angular',
                                    'REST APIs', 'JWT Auth', 'RBAC', 'Full-Stack Dev',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="34,197,94" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 4 — PROGRAMMING */}
                        <BentoBox
                            color="#f59e0b"
                            rgb="245,158,11"
                            delay={0.06 * 3}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] group-hover:bg-[rgba(245,158,11,0.2)] transition-colors duration-300">
                                    <Code2 className="w-5 h-5 text-[#f59e0b]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#f59e0b] transition-colors">Programming</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {['Python', 'C', 'C++', 'OOP', 'Algorithms'].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="245,158,11" />
                                ))}
                            </div>
                        </BentoBox>

                        {/* BOX 7 — DEV TOOLS + CLOUD */}
                        <BentoBox
                            color="#64748b"
                            rgb="100,116,139"
                            delay={0.06 * 6}
                        >
                            <div className="flex items-center gap-3 mb-5 relative z-10">
                                <div className="p-2.5 rounded-xl bg-[rgba(100,116,139,0.12)] border border-[rgba(100,116,139,0.25)] group-hover:bg-[rgba(100,116,139,0.2)] transition-colors duration-300">
                                    <Wrench className="w-5 h-5 text-[#64748b]" />
                                </div>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-[#64748b] transition-colors">Dev Tools & Cloud</h3>
                            </div>
                            <div className="flex flex-wrap gap-2 relative z-10">
                                {[
                                    'VS Code', 'Jupyter', 'Git/GitHub', 'Docker',
                                    'AWS', 'Cloud Deployment', 'RStudio', 'IBM Watson',
                                ].map((name, i) => (
                                    <SkillPill key={i} name={name} categoryRGB="100,116,139" />
                                ))}
                            </div>
                        </BentoBox>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default memo(SkillsSection);