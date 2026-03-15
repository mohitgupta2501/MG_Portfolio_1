// import { useState, useMemo, memo } from 'react';
// import { motion } from 'framer-motion';
// import {
//     Brain, Cpu, Globe, Code2, Database, BarChart2,
//     Wrench, Heart, Eye, Users, LayoutGrid, Layers
// } from 'lucide-react';

// const stats = [
//     { value: "14", label: "SKILL CATEGORIES", icon: LayoutGrid, color: "#ff4d5a", rgb: "255, 77, 90" },
//     { value: "50+", label: "TECHNOLOGIES", icon: Cpu, color: "#3b82f6", rgb: "59, 130, 246" },
//     { value: "10+", label: "FRAMEWORKS", icon: Layers, color: "#a855f7", rgb: "168, 85, 247" },
//     { value: "6", label: "DOMAINS", icon: Globe, color: "#22c55e", rgb: "34, 197, 94" },
// ];

// const filterTabs = [
//     'All', 'AI & ML', 'Deep Learning', 'Programming',
//     'Web & Backend', 'Data & Viz', 'Tools', 'Healthcare',
//     'Computer Vision', 'Soft Skills'
// ];

// const tagThemeColors = [
//     { color: '#ff4d5a', rgb: '255,77,90' },
//     { color: '#3b82f6', rgb: '59,130,246' },
//     { color: '#a855f7', rgb: '168,85,247' },
//     { color: '#22c55e', rgb: '34,197,94' },
//     { color: '#f59e0b', rgb: '245,158,11' },
//     { color: '#ec4899', rgb: '236,72,153' },
// ];

// const tagsRow1 = ['Python', 'Django', 'React.js', 'PyTorch', 'XGBoost', 'TensorFlow', 'SQL', 'Angular', 'LightGBM', 'CatBoost', 'Python', 'Django', 'React.js', 'PyTorch', 'XGBoost'];
// const tagsRow2 = ['Machine Learning', 'Deep Learning', 'AutoML', 'EDA', 'REST APIs', 'JWT Auth', 'RBAC', 'Docker', 'AWS', 'Machine Learning', 'Deep Learning', 'AutoML', 'EDA', 'REST APIs'];

// const SkillPill = ({ name, categoryRGB }) => (
//     <div
//         className="skill-pill"
//         style={{
//             '--cat-rgb': categoryRGB
//         }}
//     >
//         <span className="leading-tight">{name}</span>
//     </div>
// );

// const BentoBox = ({ children, className, rgb, color, category, activeFilter, delay = 0 }) => {
//     const isMismatched = activeFilter !== 'All' && category !== activeFilter;

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.5, delay }}
//             className={`bento-box group ${isMismatched ? 'bento-mismatched' : 'bento-matched'} ${className}`}
//             style={{
//                 '--cat-rgb': rgb,
//                 '--cat-color': color,
//             }}
//         >
//             <div className="bento-glow-blob" />
//             {children}
//             <div className="top-edge-glow" />
//         </motion.div>
//     );
// };

// const SkillsSection = () => {
//     const [activeFilter, setActiveFilter] = useState('All');

//     return (
//         <section id="skills" className="relative py-[64px] min-h-screen bg-[#080808] overflow-hidden">
//             <div className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_20%,rgba(255,255,255,0.06)_80%,transparent_100%)] z-10" />

//             {/* Background Effects */}
//             <div className="absolute inset-0 pointer-events-none z-0">
//                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(255,77,90,0.04)] rounded-full blur-[100px] animate-[breathe_18s_ease-in-out_infinite]" />
//                 <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[rgba(139,92,246,0.04)] rounded-full blur-[100px] animate-[breathe_22s_ease-in-out_infinite_reverse]" />
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[rgba(59,130,246,0.025)] rounded-full blur-[120px] animate-[breathe_28s_ease-in-out_infinite]" />
//                 <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
//             </div>

//             <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 {/* Section Header */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true, amount: 0.2 }}
//                     transition={{ duration: 0.6 }}
//                     className="flex flex-col items-center text-center mb-16 relative"
//                 >
//                     <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-[15vw] md:text-[140px] font-bold text-white/[0.015] pointer-events-none select-none tracking-widest uppercase">
//                         SKILLS
//                     </span>
//                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-[12px] font-bold uppercase tracking-[4px] mb-6 backdrop-blur-md">
//                         <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
//                         Skills
//                     </div>
//                     <h2 className="text-white font-light text-[clamp(42px,5.5vw,66px)] leading-tight mb-4 tracking-tight">
//                         Technical <span className="font-bold">Skills</span>
//                     </h2>
//                     <div className="w-[40px] h-[3px] bg-[var(--accent)] rounded-full mb-6" />
//                     <p className="text-[#888] text-[16px] italic max-w-2xl mx-auto">
//                         "A comprehensive toolkit built through research, industry projects, and continuous learning"
//                     </p>
//                 </motion.div>

//                 {/* Stats Row */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.6, delay: 0.1 }}
//                     className="flex flex-nowrap justify-between gap-4 sm:gap-6 lg:gap-8 max-w-[1000px] mx-auto mb-[32px]"
//                 >
//                     {stats.map((stat, i) => {
//                         const Icon = stat.icon;
//                         return (
//                             <div
//                                 key={i}
//                                 className="stat-card flex-1 flex flex-col items-center justify-center bg-white/[0.02] border border-white/[0.05] rounded-[16px] py-6 px-4 backdrop-blur-sm"
//                                 style={{
//                                     '--cat-color': stat.color,
//                                     '--cat-rgb': stat.rgb
//                                 }}
//                             >
//                                 <div
//                                     className="stat-icon-box w-[44px] h-[44px] rounded-[12px] flex items-center justify-center mb-3 transition-colors duration-300"
//                                 >
//                                     <Icon className="stat-icon w-6 h-6 transition-all duration-300" style={{ color: stat.color }} />
//                                 </div>
//                                 <span className="stat-value text-[36px] font-bold transition-all duration-300 leading-none" style={{ color: stat.color }}>{stat.value}</span>
//                                 <span className="text-[12px] text-[#666] font-semibold uppercase tracking-widest mt-2 justify-center text-center transition-colors duration-300">{stat.label}</span>
//                             </div>
//                         )
//                     })}
//                 </motion.div>

//                                 {/* Marquee Banner */}
//                 <div className="mb-[24px] overflow-hidden relative fade-edges">
//                     <div className="marquee-container mb-4">
//                         <div className="marquee-content row-1">
//                             {tagsRow1.map((skill, i) => {
//                                 const theme = tagThemeColors[i % tagThemeColors.length];
//                                 return (
//                                     <span
//                                         key={i}
//                                         className="marquee-tag"
//                                         style={{
//                                             backgroundColor: `rgba(${theme.rgb}, 0.08)`,
//                                             borderColor: `rgba(${theme.rgb}, 0.2)`,
//                                             color: theme.color
//                                         }}
//                                     >
//                                         {skill}
//                                     </span>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                     <div className="marquee-container">
//                         <div className="marquee-content row-2">
//                             {tagsRow2.map((skill, i) => {
//                                 const theme = tagThemeColors[(i + 2) % tagThemeColors.length];
//                                 return (
//                                     <span
//                                         key={i}
//                                         className="marquee-tag"
//                                         style={{
//                                             backgroundColor: `rgba(${theme.rgb}, 0.08)`,
//                                             borderColor: `rgba(${theme.rgb}, 0.2)`,
//                                             color: theme.color
//                                         }}
//                                     >
//                                         {skill}
//                                     </span>
//                                 )
//                             })}
//                         </div>
//                     </div>
//                 </div>

//                 {/* BENTO GRID */ }
//     <div className="bento-grid">

//         {/* BOX 1 — CORE EXPERTISE (col 1, rows 1+2) */ }
//         <BentoBox
//     className="bento-box-1"
//     color="#ff4d5a"
//     rgb="255,77,90"
//     category="AI & ML"
//     activeFilter={activeFilter}
//     delay={0.06 * 0 }
//     >
//                         <div className="flex justify-between items-start mb-4 relative z-10">
//                             <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-[50px] bg-[rgba(255,77,90,0.12)] border border-[rgba(255,77,90,0.3)]">
//                                 <span className="text-[10px] uppercase font-bold tracking-[3px] text-[#ff4d5a]">CORE EXPERTISE</span>
//                             </div>
//                         </div>

//                         <div className="flex items-center gap-4 mb-2 relative z-10">
//                             <div className="inline-flex items-center justify-center p-3 rounded-[14px] bg-[rgba(255,77,90,0.1)]">
//                                 <Brain className="w-8 h-8 text-[#ff4d5a]" />
//                             </div>
//                             <div>
//                                 <h3 className="text-[20px] font-[800] text-white transition-colors duration-300 group-hover:text-[#ff4d5a]">AI & Machine Learning</h3>
//                                 <p className="text-[#555] text-[13px]">Primary domain of expertise</p>
//                             </div>
//                         </div>

// {/* Static Featured Skill Ring */ }
// <div className="relative w-[120px] h-[120px] rounded-full border-2 border-[rgba(255,77,90,0.2)] margin-center my-6 z-10">
//     <div className="absolute top-1/2 left-1/2 w-[110px] h-[110px] rounded-full border-2 border-dashed border-[rgba(255,77,90,0.25)] -translate-x-1/2 -translate-y-1/2 animate-[spin-slow_12s_linear_infinite]" />
//     <div className="absolute top-1/2 left-1/2 w-[80px] h-[80px] rounded-full border-2 border-[rgba(255,77,90,0.35)] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center orbit-core-pulse z-20">
//         <Brain className="w-[24px] h-[24px] text-[#ff4d5a]" />
//     </div>
// </div>

// {/* Skill Pills */ }
// <div className="flex flex-wrap gap-2 relative z-10">
//     {[
//         { name: 'Supervised Learning' },
//         { name: 'Unsupervised Learning' },
//         { name: 'Feature Engineering' },
//         { name: 'Ensemble Methods' },
//         { name: 'XGBoost' },
//         { name: 'LightGBM' },
//         { name: 'CatBoost' },
//         { name: 'Random Forest' },
//         { name: 'Predictive Analytics' },
//         { name: 'Data Preprocessing' },
//         { name: 'CRISP-DM' },
//         { name: 'Model Evaluation' }
//     ].map((skill, i) => (
//         <SkillPill key={i} name={skill.name} categoryRGB="255,77,90" />
//     ))}
// </div>
//                     </BentoBox>

//     {/* BOX 2 — DEEP LEARNING (col 2, row 1) */ }
//     <BentoBox
//     className="bento-box-2"
//     color="#ec4899"
//     rgb="236,72,153"
//     category="Deep Learning"
//     activeFilter={activeFilter}
//     delay={0.06 * 1 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(236,72,153,0.12)] border border-[rgba(236,72,153,0.25)] group-hover:bg-[rgba(236,72,153,0.2)] transition-colors duration-300">
//                                 <Cpu className="w-5 h-5 text-[#ec4899]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#ec4899] transition-colors">Deep Learning</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 relative z-10">
//                             {[
//                                 { name: 'Neural Networks' },
//                                 { name: 'CNN' },
//                                 { name: 'LSTM' },
//                                 { name: 'PyTorch' },
//                                 { name: 'Diffusion Models' },
//                                 { name: 'Generative AI' },
//                                 { name: 'EEG Processing' },
//                                 { name: 'Biomedical Signal' }
//                             ].map((skill, i) => (
//                                 <SkillPill key={i} name={skill.name} categoryRGB="236,72,153" />
//                             ))}
//                         </div>
//                     </BentoBox>

//     {/* BOX 3 — WEB & BACKEND (col 3, row 1) */ }
//     <BentoBox
//     className="bento-box-3"
//     color="#22c55e"
//     rgb="34,197,94"
//     category="Web & Backend"
//     activeFilter={activeFilter}
//     delay={0.06 * 2 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] group-hover:bg-[rgba(34,197,94,0.2)] transition-colors duration-300">
//                                 <Globe className="w-5 h-5 text-[#22c55e]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#22c55e] transition-colors">Web & Backend</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 relative z-10">
//                             {[
//                                 { name: 'Django' },
//                                 { name: 'React.js' },
//                                 { name: 'Flask' },
//                                 { name: 'Angular' },
//                                 { name: 'REST APIs' },
//                                 { name: 'JWT Auth' },
//                                 { name: 'RBAC' },
//                                 { name: 'Full-Stack Dev' }
//                             ].map((skill, i) => (
//                                 <SkillPill key={i} name={skill.name} categoryRGB="34,197,94" />
//                             ))}
//                         </div>
//                     </BentoBox>

//     {/* BOX 4 — PROGRAMMING (col 2, row 2) */ }
//     <BentoBox
//     className="bento-box-4"
//     color="#f59e0b"
//     rgb="245,158,11"
//     category="Programming"
//     activeFilter={activeFilter}
//     delay={0.06 * 3 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] group-hover:bg-[rgba(245,158,11,0.2)] transition-colors duration-300">
//                                 <Code2 className="w-5 h-5 text-[#f59e0b]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#f59e0b] transition-colors">Programming</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 relative z-10">
//                             {[
//                                 { name: 'Python' },
//                                 { name: 'C' },
//                                 { name: 'C++' },
//                                 { name: 'OOP' },
//                                 { name: 'Algorithms' }
//                             ].map((skill, i) => (
//                                 <SkillPill key={i} name={skill.name} categoryRGB="245,158,11" />
//                             ))}
//                         </div>
//                     </BentoBox>

//     {/* BOX 5 — DATABASES (col 3, row 2) */ }
//     <BentoBox
//     className="bento-box-5"
//     color="#06b6d4"
//     rgb="6,182,212"
//     category="Data & Viz"
//     activeFilter={activeFilter}
//     delay={0.06 * 4 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(6,182,212,0.12)] border border-[rgba(6,182,212,0.25)] group-hover:bg-[rgba(6,182,212,0.2)] transition-colors duration-300">
//                                 <Database className="w-5 h-5 text-[#06b6d4]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#06b6d4] transition-colors">Databases</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 relative z-10">
//                             {[
//                                 { name: 'MySQL' },
//                                 { name: 'SQLite' },
//                                 { name: 'MS SQL Server' },
//                                 { name: 'MongoDB' },
//                                 { name: 'Database Design' }
//                             ].map((skill, i) => (
//                                 <SkillPill key={i} name={skill.name} categoryRGB="6,182,212" />
//                             ))}
//                         </div>
//                     </BentoBox>

//     {/* BOX 6 — DATA ANALYSIS & VIZ (col 1+2, row 3) */ }
//     <BentoBox
//     className="bento-box-6"
//     color="#f97316"
//     rgb="249,115,22"
//     category="Data & Viz"
//     activeFilter={activeFilter}
//     delay={0.06 * 5 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(249,115,22,0.12)] border border-[rgba(249,115,22,0.25)] group-hover:bg-[rgba(249,115,22,0.2)] transition-colors duration-300">
//                                 <BarChart2 className="w-5 h-5 text-[#f97316]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#f97316] transition-colors">Data Analysis & Visualization</h3>
//                         </div>
//                         <div className="flex flex-col md:flex-row gap-6 relative z-10">
//                             <div className="flex-1 flex flex-wrap gap-2">
//                                 {[
//                                     { name: 'Power BI' },
//                                     { name: 'Tableau' },
//                                     { name: 'Plotly / Dash' },
//                                     { name: 'EDA' },
//                                     { name: 'Data Visualization' },
//                                     { name: 'Business Analytics' },
//                                     { name: 'Data Cleaning' },
//                                     { name: 'Decision Making' }
//                                 ].map((skill, i) => (
//                                     <SkillPill key={i} name={skill.name} categoryRGB="249,115,22" />
//                                 ))}
//                             </div>
//                             <div className="w-full md:w-[160px] flex flex-col gap-2">
//                                 <div className="bg-[rgba(249,115,22,0.08)] border border-[rgba(249,115,22,0.25)] rounded-xl p-3 text-center">
//                                     <div className="text-[16px] font-bold text-[#f97316]">Power BI</div>
//                                     <div className="text-[10px] text-[#666] uppercase font-bold tracking-[2px] mt-1">ADVANCED</div>
//                                 </div>
//                                 <div className="bg-[rgba(249,115,22,0.08)] border border-[rgba(249,115,22,0.25)] rounded-xl p-3 text-center">
//                                     <div className="text-[16px] font-bold text-[#f97316]">EDA Expert</div>
//                                     <div className="text-[10px] text-[#666] uppercase font-bold tracking-[2px] mt-1">CERTIFIED</div>
//                                 </div>
//                                 <div className="bg-[rgba(249,115,22,0.08)] border border-[rgba(249,115,22,0.25)] rounded-xl p-3 text-center">
//                                     <div className="text-[16px] font-bold text-[#f97316]">8 Tools</div>
//                                     <div className="text-[10px] text-[#666] uppercase font-bold tracking-[2px] mt-1">MASTERED</div>
//                                 </div>
//                             </div>
//                         </div>
//                     </BentoBox>

//     {/* BOX 7 — DEV TOOLS + CLOUD (col 3, row 3) */ }
//     <BentoBox
//     className="bento-box-7"
//     color="#64748b"
//     rgb="100,116,139"
//     category="Tools"
//     activeFilter={activeFilter}
//     delay={0.06 * 6 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(100,116,139,0.12)] border border-[rgba(100,116,139,0.25)] group-hover:bg-[rgba(100,116,139,0.2)] transition-colors duration-300">
//                                 <Wrench className="w-5 h-5 text-[#64748b]" />
//                             </div>
//                             <h3 className="text-[18px] font-bold text-white group-hover:text-[#64748b] transition-colors">Dev Tools & Cloud</h3>
//                         </div>
//                         <div className="flex flex-wrap gap-2 relative z-10">
//                             {[
//                                 { name: 'VS Code' },
//                                 { name: 'Jupyter' },
//                                 { name: 'Git/GitHub' },
//                                 { name: 'Docker' },
//                                 { name: 'AWS' },
//                                 { name: 'Cloud Deployment' },
//                                 { name: 'RStudio' },
//                                 { name: 'IBM Watson' }
//                             ].map((skill, i) => (
//                                 <SkillPill key={i} name={skill.name} categoryRGB="100,116,139" />
//                             ))}
//                         </div>
//                     </BentoBox>

//     {/* BOX 8 — HEALTHCARE AI (col 1+2, row 4) */ }
//     <BentoBox
//     className="bento-box-8"
//     color="#f43f5e"
//     rgb="244,63,94"
//     category="Healthcare"
//     activeFilter={activeFilter}
//     delay={0.06 * 7 }
//     >
//                         <div className="flex items-center gap-3 mb-5 relative z-10 transition-colors duration-300">
//                             <div className="p-2.5 rounded-xl bg-[rgba(244,63,94,0.12)] border border-[rgba(244,63,94,0.25)] group-hover:bg-[rgba(244,63,94,0.2)] transition-colors duration-300">
//                                 <Heart className="w-5 h-5 text-[#f43f5e]" />
//                             </div>
//                     <h3 className="text-[18px] font-bold text-white group-hover:text-[#f43f5e] transition-colors">Healthcare AI & Biomedical</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-3 mb-5 relative z-10">
//                     <div className="inline-flex items-center gap-2 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.25)] rounded-md px-3 py-1.5">
//                         <span className="font-bold text-[#f43f5e] text-[15px]">97% Accuracy</span>
//                         <span className="text-[12px] text-[#ccc]">Seizure Detection</span>
//                     </div>
//                     <div className="inline-flex items-center gap-2 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.25)] rounded-md px-3 py-1.5">
//                         <span className="font-bold text-[#f43f5e] text-[15px]">82% AUC</span>
//                         <span className="text-[12px] text-[#ccc]">Barrett's Prediction</span>
//                     </div>
//                     <div className="inline-flex items-center gap-2 bg-[rgba(244,63,94,0.1)] border border-[rgba(244,63,94,0.25)] rounded-md px-3 py-1.5">
//                         <span className="font-bold text-[#f43f5e] text-[15px]">40% Reduction</span>
//                         <span className="text-[12px] text-[#ccc]">Gastroscopy procedures</span>
//                     </div>
//                 </div>
//                 <div className="flex flex-wrap gap-2 relative z-10">
//                         { name: 'EEG Signal Processing' },
//                         { name: 'Biomedical Data Analysis' },
//                         { name: 'Clinical Risk Stratification' },
//                         { name: 'Medical Decision Support' },
//                         { name: 'Clinical Decision Support' },
//                         { name: 'Healthcare AI' }
//                     ].map((skill, i) => (
//                         <SkillPill key={i} name={skill.name} categoryRGB="244,63,94" />
//                     ))}
//                 </div>
//             </BentoBox>

//     {/* BOX 9 — COMPUTER VISION + EXPLAINABILITY (col 3, row 4) */ }
//     <BentoBox
//     className="bento-box-9"
//     color="#8b5cf6"
//     rgb="139,92,246"
//     category="Computer Vision"
//     activeFilter={activeFilter}
//     delay={0.06 * 8 }
//     >
//                 <div className="flex items-center gap-3 mb-5 relative z-10">
//                     <Eye className="w-6 h-6 text-[#8b5cf6]" />
//                     <h3 className="text-[18px] font-bold text-white group-hover:text-[#8b5cf6] transition-colors">Computer Vision & XAI</h3>
//                 </div>
//                 <div className="flex flex-wrap gap-2 relative z-10">
//                     {[
//                         { name: 'OpenCV' },
//                         { name: 'Object Detection' },
//                         { name: 'Image Processing' },
//                         { name: 'torchvision' },
//                         { name: 'SHAP' },
//                         { name: 'LIME' },
//                         { name: 'Pattern Recognition' }
//                     ].map((skill, i) => (
//                         <SkillPill key={i} name={skill.name} categoryRGB="139,92,246" />
//                     ))}
//                 </div>
//             </BentoBox>

//     {/* BOX 10 — SOFT SKILLS (col 1 span 3, row 5) */ }
//     <BentoBox
//     className="bento-box-10"
//     color="#a855f7"
//     rgb="168,85,247"
//     category="Soft Skills"
//     activeFilter={activeFilter}
//     delay={0.06 * 9 }
//     >
//     <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10 transition-colors duration-300">
//         <div className="flex-1 md:max-w-[300px]">
//             <div className="flex items-center gap-3 mb-3 relative z-10 transition-colors duration-300">
//                 <div className="p-2.5 rounded-xl bg-[rgba(168,85,247,0.12)] border border-[rgba(168,85,247,0.25)] group-hover:bg-[rgba(168,85,247,0.2)] transition-colors duration-300">
//                     <Users className="w-5 h-5 text-[#a855f7]" />
//                 </div>
//                 <h3 className="text-[20px] font-bold text-white group-hover:text-[#a855f7] transition-colors">Leadership & Soft Skills</h3>
//             </div>
//             <p className="text-[#888] text-[14px]">Beyond the code — building teams and communities</p>
//         </div>
//         <div className="flex-1 flex flex-wrap gap-2">
//             {[
//                 { name: 'Leadership' },
//                 { name: 'Public Speaking' },
//                 { name: 'Community Outreach' },
//                 { name: 'Program Coordination' },
//                 { name: 'Stakeholder Communication' },
//                 { name: 'Problem Solving' },
//                 { name: 'Volunteer Management' },
//                 { name: 'Event Planning' },
//                 { name: 'Social Impact' },
//                 { name: 'Entrepreneurship' },
//                 { name: 'Business Strategy' }
//             ].map((skill, i) => (
//                 <SkillPill key={i} name={skill.name} categoryRGB="168,85,247" />
//             ))}
//         </div>
//     </div>
//             </BentoBox>

//         </div>


//         </section>
//     );
// }

// export default memo(SkillsSection);
//                 /* Stats Row */
//                 .stat-card {
//     background: #111111;
//     border: 1px solid rgba(var(--cat-rgb), 0.15);
//     transition: all 0.3s ease;
// }
//                 .stat-card:hover {
//     transform: translateY(-6px);
//     background-color: rgba(var(--cat-rgb), 0.08);
//     border-color: rgba(var(--cat-rgb), 0.3);
//     box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.2);
// }
//                 .stat-card:hover.stat-icon {
//     transform: scale(1.1) rotate(-5deg);
//     filter: drop-shadow(0 0 8px rgba(var(--cat-rgb), 0.6));
// }
//                 .stat-card:hover.stat-value {
//     text-shadow: 0 0 20px rgba(var(--cat-rgb), 0.4);
// }

//                 /* Scrollbar hide for filter tabs */
//                 .scrollbar-hide::-webkit-scrollbar {
//     display: none;
// }
//                 .scrollbar-hide {
//     -ms-overflow-style: none;
//     scrollbar-width: none;
// }

//                 /* Bento Grid Layout */
//                 .bento-grid {
//     display: grid;
//     grid-template-columns: 1.4fr 1fr 1fr;
//     grid-template-rows: auto;
//     gap: 14px;
//     width: 100%;
// }
//                 .bento-box-1 { grid-column: 1; grid-row: 1 / span 2; min-height: 380px; }
//                 .bento-box-2 { grid-column: 2; grid-row: 1; }
//                 .bento-box-3 { grid-column: 3; grid-row: 1; }
//                 .bento-box-4 { grid-column: 2; grid-row: 2; }
//                 .bento-box-5 { grid-column: 3; grid-row: 2; }
//                 .bento-box-6 { grid-column: 1 / span 2; grid-row: 3; }
//                 .bento-box-7 { grid-column: 3; grid-row: 3; }
//                 .bento-box-8 { grid-column: 1 / span 2; grid-row: 4; }
//                 .bento-box-9 { grid-column: 3; grid-row: 4; }
//                 .bento-box-10 { grid-column: 1 / span 3; grid-row: 5; }

// @media(max-width: 1024px) {
//                     .bento-grid {
//         grid-template-columns: 1fr 1fr;
//     }
//                     .bento-box-1 { grid-column: 1 / span 2; grid-row: auto; }
//                     .bento-box-2 { grid-column: 1; grid-row: auto; }
//                     .bento-box-3 { grid-column: 2; grid-row: auto; }
//                     .bento-box-4 { grid-column: 1; grid-row: auto; }
//                     .bento-box-5 { grid-column: 2; grid-row: auto; }
//                     .bento-box-6 { grid-column: 1 / span 2; grid-row: auto; }
//                     .bento-box-7 { grid-column: 1 / span 2; grid-row: auto; }
//                     .bento-box-8 { grid-column: 1 / span 2; grid-row: auto; }
//                     .bento-box-9 { grid-column: 1 / span 2; grid-row: auto; }
//                     .bento-box-10 { grid-column: 1 / span 2; grid-row: auto; }
// }

// @media(max-width: 640px) {
//                     .bento-grid {
//         grid-template-columns: 1fr;
//     }
//                     .bento-box-1, .bento-box-2, .bento-box-3, .bento-box-4, .bento-box-5,
//                     .bento-box-6, .bento-box-7, .bento-box-8, .bento-box-9, .bento-box-10 {
//         grid-column: 1;
//         grid-row: auto;
//     }
// }

//                 /* Bento Box Base Styles */
//                 .bento-box {
//     background: #0e0e0e;
//     border: 1px solid rgba(255, 255, 255, 0.07);
//     border-radius: 20px;
//     padding: 22px;
//     position: relative;
//     overflow: hidden;
//     cursor: default ;
//     transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// }

//                 .bento-mismatched {
//     opacity: 0.3;
//     transform: scale(0.97);
//     filter: grayscale(0.5);
// }
//                 .bento-matched {
//     opacity: 1;
//     filter: grayscale(0);
// }

//                 .bento-box:hover.bento-matched,
//                 .bento-box:hover.bento-mismatched {
//     opacity: 1;
//     filter: grayscale(0);
//     border-color: rgba(var(--cat-rgb), 0.45);
//     box-shadow: 0 0 0 1px rgba(var(--cat-rgb), 0.15),
//     0 24px 64px rgba(var(--cat-rgb), 0.18);
//     transform: translateY(-6px) scale(1.01);
// }

//                 .bento-glow-blob {
//     position: absolute;
//     top: 0; left: 0; right: 0; bottom: 0;
//     margin: auto;
//     background: radial-gradient(circle at 50% 0%, rgba(var(--cat-rgb), 0.12) 0%, transparent 70%);
//     opacity: 0;
//     transition: opacity 0.4s ease;
//     pointer-events: none;
//     z-index: 1;
// }
//                 .bento-box:hover .bento-glow-blob { opacity: 1; }

//                 .top-edge-glow {
//     position: absolute;
//     top: 0; left: 10%; right: 10%; height: 1px;
//     background: linear-gradient(90deg, transparent, rgba(var(--cat-rgb), 0.8), transparent);
//     opacity: 0;
//     transition: opacity 0.4s ease;
//     pointer-events: none;
//     z-index: 2;
// }
//                 .bento-box:hover .top-edge-glow { opacity: 1; }

//                 /* Skill Pill Style */
//                 .skill-pill {
//     background-color: rgba(var(--cat-rgb), 0.07);
//     border: 1px solid rgba(var(--cat-rgb), 0.18);
//     color: rgba(255, 255, 255, 0.82);
//     font-size: 12px;
//     font-weight: 500;
//     border-radius: 8px;
//     padding: 5px 12px;
//     transition: all 0.2s ease;
//     display: inline-flex;
//     align-items: center;
//     gap: 6px;
// }
//                 .skill-pill:hover {
//     background-color: rgba(var(--cat-rgb), 0.16);
//     border-color: rgba(var(--cat-rgb), 0.45);
//     color: #fff;
//     transform: translateY(-2px) scale(1.03);
//     box-shadow: 0 4px 14px rgba(var(--cat-rgb), 0.22);
// }

//                 /* Orbit Animation (CSS Only) */
//                 .margin-center { margin: 24px auto; }

// @keyframes pulse-glow {
//     0%, 100% { box-shadow: 0 0 0 0 rgba(255, 77, 90, 0.4);
// }
// 50% { box-shadow: 0 0 0 16px rgba(255, 77, 90, 0); }
//                 }
//                 .orbit-core-pulse {
//     animation: pulse-glow 3s ease-in-out infinite;
// }

// @keyframes spin-slow {
//                     from { transform: translate(-50%, -50%) rotate(0deg); }
//                     to { transform: translate(-50%, -50%) rotate(360deg); }
// }

//                 /* Marquee Styles */
//                 .fade-edges {
//     mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
//     -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
// }
//                 .marquee-container {
//     display: flex;
//     width: max-content;
// }
//                 .marquee-content {
//     display: flex;
//     gap: 16px;
//     padding-right: 16px;
// }
//                 .row-1 { animation: scroll-left 30s linear infinite; }
//                 .row-2 { animation: scroll-right 30s linear infinite; }
//                 .marquee-container:hover .marquee-content { animation-play-state: paused; }

//                 .marquee-tag {
//     border-radius: 50px;
//     padding: 4px 16px;
//     font-size: 13px;
//     white-space: nowrap;
//     cursor: default ;
//     border: 1px solid;
//     transition: all 0.3s ease;
// }

// @keyframes scroll-left {
//     0% { transform: translateX(0); }
//     100% { transform: translateX(-50%); }
// }
// @keyframes scroll-right {
//     0% { transform: translateX(-50%); }
//     100% { transform: translateX(0); }
// }

// @keyframes breathe {
//     0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.8; }
//     50% { transform: scale(1.1) translate(20px, 20px); opacity: 1; }
// }
// `}</style>
//         </section>
//     );
// }

// export default memo(SkillsSection);
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
                    <div className="inline-flex items-center justify-center mb-0">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] font-medium uppercase rounded-[50px] px-[22px] py-[7px]">
                            ● SKILLS
                        </span>
                    </div>
                    <div className="w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px] mx-auto mb-6 mt-[8px]" />
                    <h2 className="text-[#ffffff] font-[800] text-[clamp(42px,5.5vw,66px)] leading-tight mb-4 tracking-tight">
                        Technical Skills
                    </h2>
                    <p className="text-[#888] text-[16px] italic max-w-2xl mx-auto">
                        &ldquo;A comprehensive toolkit built through research, industry projects, and continuous learning&rdquo;
                    </p>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-[32px]"
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