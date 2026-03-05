import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import SocialIcon from '@/components/ui/SocialIcon';
import StatCard from '@/components/ui/StatCard';
import InfoCard from '@/components/ui/InfoCard';
import SkillBar from '@/components/ui/SkillBar';
import { personalInfo } from '@/data/personalInfo';

// Mock highlights
const highlights = [
    { icon: "🎓", title: "Academic Excellence", desc: "CGPA 9.6/10 — Student of the Year (2022–2026)" },
    { icon: "🤖", title: "AI & ML Engineer", desc: "Industrial AI systems at Hitachi Automation India Pvt. Ltd." },
    { icon: "📊", title: "Data Scientist", desc: "AutoML, Energy Monitoring & healthcare prediction models" },
    { icon: "🏆", title: "National Athlete", desc: "Gold medals in Shot Put & Discus Throw — Nagpur University" },
    { icon: "🚀", title: "Founder & CEO", desc: "Eagle Wears — entrepreneurship, strategy & operations" },
    { icon: "🌐", title: "Leadership & Community", desc: "Events, workshops, social initiatives & sports tournaments" }
];

const localSkills = [
    { name: "Python", value: 95 },
    { name: "Machine Learning", value: 90 },
    { name: "Deep Learning", value: 85 },
    { name: "Data Science", value: 88 },
    { name: "TensorFlow", value: 88 },
    { name: "React / Full-Stack", value: 80 },
    { name: "SQL & Databases", value: 85 },
    { name: "Django", value: 82 }
];

const About = React.memo(function About() {
    return (
        <section id="about" className="py-24 relative overflow-hidden" style={{ contain: 'layout' }}>

            {/* SECTION BACKGROUND */}
            <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(ellipse,rgba(255,77,90,0.05)_0%,transparent_65%)] pointer-events-none animate-[blob-breathe_12s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 left-[-80px] w-[400px] h-[400px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.04)_0%,transparent_65%)] pointer-events-none animate-[blob-breathe_16s_ease-in-out_infinite_reverse]" />
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute w-full h-[1px] bg-[rgba(255,77,90,0.06)] animate-[scanline_12s_linear_infinite]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* SECTION HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.7 }}
                    className="flex flex-col items-center justify-center max-w-[700px] mx-auto text-center mb-16"
                >
                    <div className="flex flex-col items-center">
                        <span className="px-[22px] py-[7px] rounded-full bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] border border-[rgba(255,77,90,0.3)] text-[var(--accent)] text-[11px] font-semibold tracking-[4px] uppercase hover:shadow-[0_0_20px_rgba(255,77,90,0.3)] transition-shadow duration-300">
                            ABOUT ME
                        </span>
                        {/* Expanding Underline */}
                        <div className="w-0 h-[2px] bg-[var(--accent)] mt-2 mb-6 animate-[line-expand_0.6s_ease-out_forwards]" />
                    </div>

                    <h2 className="text-[clamp(44px,6vw,68px)] font-[200] text-white tracking-[-1px] leading-tight mb-3">
                        About Me
                    </h2>

                    <p className="text-[17px] italic bg-clip-text text-transparent bg-[linear-gradient(90deg,#fff_0%,#ff4d5a_100%)]">
                        Turning Data into Decisions. Building the Future with AI.
                    </p>
                </motion.div>

                {/* 📐 NEW TWO-PART LAYOUT */}

                {/* PART 1: TOP ROW - Profile + Quick Bio */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mb-16">

                    {/* LEFT: SLIM PROFILE CARD */}
                    <motion.div
                        initial={{ opacity: 0, x: -70 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24 group relative"
                        style={{ contain: 'layout style' }}
                    >
                        <div className="relative bg-[linear-gradient(160deg,#111111,#0c0c0c)] border border-[#1e1e1e] rounded-[24px] p-6 sm:p-8 hover:-translate-y-[5px] hover:border-[rgba(255,77,90,0.3)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.5),0_0_40px_rgba(255,77,90,0.07)] transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]">

                            <div className="flex flex-col items-center text-center">

                                {/* AVATAR with animated gradient ring */}
                                <div className="relative mb-2 flex items-center justify-center">
                                    <div className="w-[120px] h-[120px] rounded-full bg-[conic-gradient(#ff4d5a_0%,#ff8c42_30%,#1e0a0d_60%,#ff4d5a_100%)] animate-[spin_5s_linear_infinite] flex items-center justify-center p-[3px]">
                                        <div className="w-full h-full rounded-full border-[3px] border-white overflow-hidden bg-[#0c0c0c]">
                                            <img
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
                                                alt={personalInfo.name}
                                                className="w-full h-full object-cover rounded-full hover:scale-[1.06] transition-transform duration-400 cursor-pointer block"
                                                loading="lazy"
                                                decoding="async"
                                                width="120"
                                                height="120"
                                            />
                                        </div>
                                    </div>
                                    {/* Green pulse dot */}
                                    <div className="absolute bottom-2 right-1 w-[12px] h-[12px] rounded-full bg-[#22c55e] animate-[pulse-ring_2s_ease_infinite]" />
                                </div>

                                <h3 className="text-[20px] font-bold text-white mt-4">{personalInfo.name}</h3>
                                <p className="text-[var(--accent)] text-[12px] font-[500] tracking-[0.5px] mt-1">
                                    Software Engineer & Data Scientist Intern
                                </p>

                                {/* ROLE TAGS */}
                                <div className="flex flex-wrap gap-2 justify-center mt-3">
                                    {["AI/ML Researcher", "Data Scientist", "Full-Stack Dev", "Founder @ Eagle Wears"].map(tag => (
                                        <span key={tag} className="bg-[rgba(255,77,90,0.08)] border border-[rgba(255,77,90,0.2)] text-[#ff7070] text-[10px] rounded-full px-3 py-1 hover:bg-[rgba(255,77,90,0.15)] hover:border-[var(--accent)] transition-all duration-250 cursor-default">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* STARS */}
                                <div className="flex items-center gap-1 mt-4 mb-4 text-[var(--star-color)] text-[16px]">
                                    ★ ★ ★ ★ ½ <span className="text-[#888] text-[14px] ml-1">4.8</span>
                                </div>

                                {/* DIVIDER */}
                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-5" />

                                {/* STATS (3 mini cards grid) */}
                                <div className="w-full grid grid-cols-3 gap-2 mb-6">
                                    <StatCard label="PROJECTS" value="10" hasPlus variant="card" />
                                    <StatCard label="YEARS" value="2" hasPlus variant="card" />
                                    <StatCard label="PAPERS" value="3" variant="card" />
                                </div>

                                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#2a2a2a] to-transparent mb-5" />

                                {/* FULL WIDTH BUTTONS */}
                                <div className="w-full flex flex-col gap-3 mb-6">
                                    <a
                                        href="#download"
                                        className="w-full flex justify-center items-center bg-gradient-to-r from-[#ff4d5a] to-[#ff7043] rounded-[14px] p-[14px] font-[600] text-white hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(255,77,90,0.4)] transition-all duration-300"
                                    >
                                        Download CV
                                    </a>
                                    <a
                                        href="#contact"
                                        className="w-full flex justify-center items-center bg-transparent border border-[var(--accent)] text-[var(--accent)] rounded-[14px] p-[14px] font-[600] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                                    >
                                        Contact Me
                                    </a>
                                </div>

                                {/* SOCIALS */}
                                <div className="flex items-center justify-center gap-3">
                                    {personalInfo.socials.map((social) => (
                                        <SocialIcon key={social.name} network={social.icon} url={social.url} />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: BIO HIGHLIGHTS (Visual Highlight Cards) */}
                    <div className="flex-1 w-full flex flex-col pt-2">

                        <h3 className="text-[28px] font-bold text-white mb-2 leading-tight">
                            Transforming Ideas into Digital Reality
                        </h3>
                        <p className="text-[#888888] text-[15px] mb-8">
                            B.Tech CS (Data Science) · CGPA 9.6/10 · Student of the Year 2022–2026
                        </p>

                        {/* HIGHLIGHT CARDS GRID */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {highlights.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                                    className="relative group bg-[#111111] border border-[#1a1a1a] rounded-2xl p-5 overflow-hidden transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[var(--accent)] hover:-translate-y-[4px] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                                >
                                    {/* Shimmer ::after sweep effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.03)_50%,transparent_60%)] -translate-x-full transition-transform duration-[600ms] ease-out group-hover:translate-x-full pointer-events-none" />

                                    <div className="text-[28px] mb-3 transition-transform duration-[350ms] group-hover:scale-[1.15] group-hover:rotate-[10deg] inline-block">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-[16px] font-bold text-white mb-2 leading-tight">{item.title}</h4>
                                    <p className="text-[#888888] text-[13px] leading-[1.6]">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* PART 2: BOTTOM ROW - Info Cards + Skills */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start mt-12 pb-12">

                    {/* LEFT: QUICK INFO CARDS */}
                    <div className="w-full lg:w-[50%] flex flex-col">
                        <div className="flex flex-col items-start mb-6">
                            <span className="px-[14px] py-[5px] rounded-full bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] text-[var(--accent)] text-[10px] font-[600] tracking-[3px] uppercase border border-[rgba(255,77,90,0.3)]">
                                CONTACT & DETAILS
                            </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {personalInfo.infoCards.map((card, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{ delay: idx * 0.07, duration: 0.5 }}
                                >
                                    <InfoCard
                                        label={card.label}
                                        value={card.value}
                                        iconName={card.icon}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: SKILLS (SINGLE COLUMN) */}
                    <div className="w-full lg:w-[50%] flex flex-col">

                        <div className="flex flex-col items-start mb-6">
                            <span className="px-[14px] py-[5px] rounded-full bg-[linear-gradient(135deg,#1e0a0d,#2a1215)] text-[var(--accent)] text-[10px] font-[600] tracking-[3px] uppercase border border-[rgba(255,77,90,0.3)]">
                                CORE SKILLS
                            </span>
                        </div>

                        <h4 className="text-[24px] xl:text-[28px] font-[700] mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-[#ff4d5a]">
                            Technical Proficiency
                        </h4>

                        <div className="flex flex-col w-full gap-5">
                            {localSkills.map((skill, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                                >
                                    <SkillBar name={skill.name} value={skill.value} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
});

export default About;
