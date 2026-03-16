import { useState, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Building2, Star, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { createPortal } from 'react-dom';

const INJECTED_STYLES = `
/* STAT CARDS */
.cert-stat-card {
    transition: all 0.3s ease;
}
.cert-stat-card:hover {
    transform: translateY(-6px);
    background-color: rgba(var(--cat-rgb), 0.08);
    border-color: rgba(var(--cat-rgb), 0.3);
    box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.2);
}
.cert-stat-card:hover .stat-icon {
    filter: drop-shadow(0 0 8px rgba(var(--cat-rgb), 0.6));
    transform: scale(1.1) rotate(-5deg);
}
.cert-stat-card:hover .stat-value {
    text-shadow: 0 0 20px rgba(var(--cat-rgb), 0.4);
}

/* COMPACT PROJECT CARD 1:1 CLONE */
.cert-card-wrapper {
    transition: all 0.35s ease;
}

.cert-card-inner {
    transition: all 0.35s cubic-bezier(0.4,0,0.2,1);
    background-color: #111111;
}
.cert-card-inner:hover {
    transform: translateY(-5px) scale(1.015);
    border-color: rgba(var(--cat-rgb), 0.35);
    box-shadow: 0 16px 40px rgba(var(--cat-rgb), 0.15);
}

/* Left Accent Bar Hover */
.cert-card-inner:hover .accent-bar {
    opacity: 1 !important;
    background-color: rgba(var(--cat-rgb), 1) !important;
}

/* Glow Blob Reveals */
.cert-card-inner .glow-blob {
    opacity: 0;
    transition: opacity 0.35s ease;
    background: radial-gradient(circle at 50% 0%, rgba(var(--cat-rgb), 0.06) 0%, transparent 70%);
}
.cert-card-inner:hover .glow-blob {
    opacity: 1;
}

/* Top Stripe Reveal */
.cert-card-inner:hover .top-stripe {
    opacity: 1 !important;
}

/* Number Index Text Hover Details */
.cert-card-inner:hover .card-num {
    color: rgba(var(--cat-rgb), 0.5) !important;
}

/* Title Color Hover */
.cert-card-inner:hover .role-title {
    color: var(--card-color) !important;
}

/* Shimmer Sweep Animation */
.cert-card-inner .shimmer {
    transform: translateX(-100%) skewX(-15deg);
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
}
.cert-card-inner:hover .shimmer {
    animation: cert-shimmer 0.7s ease forwards;
}
@keyframes cert-shimmer {
    0%   { transform: translateX(-100%) skewX(-15deg); }
    100% { transform: translateX(200%) skewX(-15deg); }
}

/* Skill Pills */
.skill-pill {
    background-color: rgba(var(--cat-rgb), 0.10);
    border-color: rgba(var(--cat-rgb), 0.3);
    color: rgba(var(--cat-rgb), 0.8);
    transition: all 0.2s ease;
}
.skill-pill:hover { 
    background-color: rgba(var(--cat-rgb), 0.22);
    border-color: rgba(var(--cat-rgb), 0.7);
    color: var(--card-color) !important; 
    box-shadow: 0 0 8px rgba(var(--cat-rgb), 0.4);
}

/* View Button */
.view-btn {
    background-color: transparent;
    border-color: rgba(var(--cat-rgb), 0.35);
    color: var(--card-color);
}
.view-btn:hover {
    background-color: var(--card-color) !important;
    color: #fff !important;
    border-color: var(--card-color) !important;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.35) !important;
}
.view-btn:active {
    transform: scale(0.98);
    box-shadow: 0 4px 12px rgba(var(--cat-rgb), 0.2) !important;
}
`;

function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
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
            if (progress < 1) window.requestAnimationFrame(step);
            else setCount(end);
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return { count, ref };
}

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255,255,255';
};

const stats = [
    { label: 'CERTIFICATIONS', value: '21', icon: Award, color: '#ff4d5a' },
    { label: 'ISSUERS', value: '4', icon: Building2, color: '#3b82f6' },
    { label: 'SPECIALIZATIONS', value: '3', icon: Star, color: '#a855f7' },
    { label: 'PROFESSIONAL CERTIFICATIONS', value: '2', icon: Calendar, color: '#22c55e' }
];

const FILTERS = [
    { name: 'All', count: 21 },
    { name: 'IBM', count: 13 },
    { name: 'Imperial', count: 4 },
    { name: 'Udemy', count: 2 },
    { name: 'Pronet', count: 2 }
];

const ISSUER_GROUPS = [
    {
        filterName: 'IBM',
        issuerLabel: 'IBM',
        issuerFull: 'IBM (Coursera)',
        issuerLogo: 'IBM',
        issuerSub: '13 Certifications · Feb 2026',
        catColor: '#3b82f6',
        catRGB: '59,130,246',
        cards: [
            {
                num: "01",
                title: "What is Data Science?",
                platform: "IBM · Coursera",
                date: "Feb 2026",
                certificateLink: "https://coursera.org/verify/3ATH2RD4FJUE",
                desc: "Introduced core concepts of Data Science, the role of data scientists, and how data-driven decision making is used to solve real-world business problems.",
                tags: ["Data Science", "Business Analytics", "Problem Solving"]
            },
            {
                num: "02",
                title: "Tools for Data Science",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/SLO21JKA7U10",
                date: "Feb 2026",
                desc: "Hands-on experience with essential Data Science tools including Jupyter Notebook, RStudio, GitHub, and IBM Watson Studio used in modern data workflows.",
                tags: ["Jupyter Notebook", "GitHub", "IBM Watson Studio"]
            },
            {
                num: "03",
                title: "Data Science Methodology",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/BZVZX0QZTBGM",
                date: "Feb 2026",
                desc: "Learned the CRISP-DM methodology for solving data science problems including business understanding, data preparation, modeling, evaluation, and deployment.",
                tags: ["CRISP-DM", "Data Science Process", "Problem Solving"]
            },
            {
                num: "04",
                title: "Python for Data Science, AI & Development",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/UYM9FHCXWPBG",
                date: "Feb 2026",
                desc: "Built strong foundations in Python programming including data manipulation, APIs, and data analysis using NumPy, Pandas, and Jupyter Notebook.",
                tags: ["Python", "NumPy", "Pandas"]
            },
            {
                num: "05",
                title: "Python Project for Data Science",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/X8YUHXV0QYP7",
                date: "Feb 2026",
                desc: "Completed real-world data analysis projects involving data extraction, web scraping, cleaning, analysis, and visualization using Python.",
                tags: ["Python", "Web Scraping", "Data Cleaning"]
            },
            {
                num: "06",
                title: "Databases and SQL for Data Science with Python",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/8KVJJMXKHOU4",
                date: "Feb 2026",
                desc: "Learned relational database concepts and SQL queries for data extraction, manipulation, and integration with Python for analytics tasks.",
                tags: ["SQL", "Database Management", "Python"]
            },
            {
                num: "07",
                title: "Data Analysis with Python",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/WD0XAWF5FC5B",
                date: "Feb 2026",
                desc: "Performed exploratory data analysis (EDA), statistical analysis, and data cleaning using Python libraries such as Pandas and NumPy.",
                tags: ["Python", "EDA", "Pandas"]
            },
            {
                num: "08",
                title: "Data Visualization with Python",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/46984H6SD9HN",
                date: "Feb 2026",
                desc: "Created compelling data visualizations using Matplotlib, Seaborn, and Folium to effectively communicate insights from real-world datasets.",
                tags: ["Data Visualization", "Matplotlib", "Seaborn"]
            },
            {
                num: "09",
                title: "Machine Learning with Python",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/MY76Y7VKBLVR",
                date: "Feb 2026",
                desc: "Implemented supervised and unsupervised machine learning algorithms including regression, classification, clustering, and model evaluation using Scikit-learn.",
                tags: ["Machine Learning", "Scikit-learn", "Model Evaluation"]
            },
            {
                num: "10",
                title: "Applied Data Science Capstone",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/X1I6GPPBBR62",
                date: "Feb 2026",
                desc: "Completed an end-to-end data science project including data collection, exploratory analysis, predictive modeling, and visualization to solve a real-world problem.",
                tags: ["Data Science", "Predictive Modeling", "Capstone"]
            },
            {
                num: "11",
                title: "Generative AI: Elevate Your Data Science Career",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/J1QX1CQQ14X3",
                date: "Feb 2026",
                desc: "Explored Generative AI concepts, Large Language Models (LLMs), and prompt engineering techniques used to enhance modern AI-driven data science workflows.",
                tags: ["Generative AI", "LLMs", "Prompt Engineering"]
            },
            {
                num: "12",
                title: "Data Scientist Career Guide & Interview Preparation",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/09R7VN5XQ00O",
                date: "Feb 2026",
                desc: "Learned strategies for building a data science portfolio, preparing for technical interviews, and understanding career pathways in data science and AI roles.",
                tags: ["Career Development", "Interview Preparation", "Portfolio"]
            },
            {
                num: "13",
                title: "IBM Data Science Professional Certificate",
                platform: "IBM · Coursera",
                certificateLink: "https://coursera.org/verify/professional-cert/3XZLXCVFX9JL",
                date: "Feb 2026",
                desc: "Completed the IBM Data Science Professional Certificate program covering Python, SQL, data analysis, visualization, machine learning, and real-world capstone projects.",
                tags: ["Professional Certificate", "IBM", "Data Science"],
                specialBadge: "PROFESSIONAL CERTIFICATE"
            }
        ]
    },
    {
        filterName: 'Imperial',
        issuerLabel: 'ICL',
        issuerFull: 'Imperial College London (Coursera)',
        issuerLogo: 'ICL',
        issuerSub: '4 Certifications · Mar 2026',
        catColor: '#ff4d5a',
        catRGB: '255,77,90',
        cards: [
            {
                num: "14", title: "Mathematics for ML: Linear Algebra",
                platform: "Imperial · Coursera", date: "Mar 2026",
                desc: "Vectors, matrices, eigenvalues, and linear transformations — ML mathematical foundations.",
                tags: ["Linear Algebra", "Mathematics", "ML"]
            },
            {
                num: "15", title: "Mathematics for ML: Multivariate Calculus",
                platform: "Imperial · Coursera", date: "Mar 2026",
                desc: "Partial derivatives, gradients, and optimization for training machine learning models.",
                tags: ["Calculus", "Optimization", "Math"]
            },
            {
                num: "16", title: "Mathematics for ML: PCA",
                platform: "Imperial · Coursera", date: "Mar 2026",
                desc: "Principal Component Analysis for dimensionality reduction and data variance optimization.",
                tags: ["PCA", "Dim. Reduction", "ML"]
            },
            {
                num: "17", title: "ICL Mathematics for Machine Learning Professional Certificate",
                platform: "Imperial · Coursera", date: "Mar 2026",
                desc: "3-course specialization: Linear Algebra, Multivariate Calculus, and PCA for ML foundations.",
                tags: ["Specialization", "Mathematics", "ML"],
                specialBadge: "PROFESSIONAL CERTIFICATE"
            }
        ]
    },
    {
        filterName: 'Udemy',
        issuerLabel: 'UD',
        issuerFull: 'Udemy',
        issuerLogo: 'UD',
        issuerSub: '2 Certifications · Jan 2026',
        catColor: '#a855f7',
        catRGB: '168,85,247',
        cards: [
            {
                num: "18",
                title: "Machine Learning A-Z: AI, Python & R + ChatGPT Prize",
                platform: "Udemy",
                date: "Jan 2026",
                certificateLink: "https://www.udemy.com/certificate/UC-57ee45b8-5c14-47f4-bea9-36d7e0e3acc6/",
                desc: "Comprehensive machine learning course covering data preprocessing, feature engineering, model building, evaluation, and implementation of supervised and unsupervised algorithms using Python and R, with exposure to modern AI tools like ChatGPT.",
                tags: [
                    "Machine Learning",
                    "Data Preprocessing",
                    "EDA",
                    "Model Evaluation",
                    "Python",
                    "R",
                    "AI"
                ]
            },
            {
                num: "19",
                title: "Object Detection: From Zero to Hero",
                platform: "Udemy",
                date: "Jan 2026",
                certificateLink: "https://www.udemy.com/certificate/UC-34ad11ae-b646-4668-952d-bdc7aa49d934/",
                desc: "Learned object detection and computer vision techniques using deep learning models, implementing detection pipelines and training models for real-world image recognition tasks.",
                tags: [
                    "Computer Vision",
                    "Object Detection",
                    "Deep Learning",
                    "Python",
                    "Machine Learning"
                ]
            }
        ]
    },
    {
        filterName: 'Pronet',
        issuerLabel: 'PRO',
        issuerFull: 'Pronet I.T. Professionals',
        issuerLogo: 'PRO',
        issuerSub: '2 Certifications · 2023',
        catColor: '#22c55e',
        catRGB: '34,197,94',
        cards: [
            {
                num: "20",
                title: "Certificate in Python Programming",
                platform: "Pronet I.T. Professionals",
                date: "Aug 2023",
                doc: "/certificates/Python.pdf",
                desc: "Successfully completed a Python Programming certification covering core Python fundamentals, control structures, functions, and object-oriented programming concepts. Achieved Grade A+ with an outstanding score of 95%.",
                tags: [
                    "Python Programming",
                    "Object-Oriented Programming",
                    "Control Structures",
                    "Functions"
                ]
            },
            {
                num: "21",
                title: "Certificate in C & C++ Programming",
                platform: "Pronet I.T. Professionals",
                date: "Mar 2023",
                doc: "/certificates/C and c++.pdf",
                desc: "Completed certification in C & C++ Programming focusing on core programming concepts, problem solving, memory management, and object-oriented programming principles using C++.",
                tags: [
                    "C Programming",
                    "C++",
                    "Object-Oriented Programming",
                    "Programming Fundamentals"
                ]
            }
        ]
    }
];

const StatCard = memo(({ icon: Icon, value, label, color }) => {
    const numericValue = parseInt(value.toString().replace(/\+/g, ''));
    const isPlus = value.toString().includes('+');
    const { count, ref } = useCountUp(numericValue, 1500);
    const colorRgb = hexToRgb(color) || '255,255,255';

    return (
        <div
            ref={ref}
            className="cert-stat-card bg-[#111] border border-[#1a1a1a] rounded-2xl p-5 flex flex-col items-center justify-center text-center group cursor-default h-full w-full"
            style={{ '--cat-color': color, '--cat-rgb': colorRgb }}
        >
            <Icon className="stat-icon w-6 h-6 mb-3 transition-all duration-300" style={{ color: color }} />
            <span
                className="stat-value font-bold text-[clamp(24px,3vw,32px)] leading-none mb-1.5 transition-all duration-300"
                style={{ color: color }}
            >
                {count}{isPlus && '+'}
            </span>
            <span className="text-[#666] text-[10px] uppercase tracking-[1.5px] font-bold">
                {label}
            </span>
        </div>
    );
});
StatCard.displayName = 'StatCard';

const CertCardCompact = memo(({ data, issuerLabel, color, rgb, onViewDetails }) => {
    const { num, title, platform, date, desc, tags, specialBadge } = data;
    const badgeLabel = specialBadge || issuerLabel;

    return (
        <div className="cert-card-wrapper h-full min-w-0">
            <div
                className="cert-card-inner group relative w-full h-full min-h-[300px] border border-[rgba(255,255,255,0.06)] rounded-[14px] p-[14px] max-[480px]:p-3 pb-[12px] flex flex-col overflow-hidden cursor-default min-w-0"
                style={{ '--card-color': color, '--cat-rgb': rgb }}
            >
                {/* Glow Blob */}
                <div className="glow-blob absolute inset-0 pointer-events-none z-0" />

                {/* Top Stripe */}
                <div
                    className="top-stripe absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-[0.35s] pointer-events-none z-10"
                    style={{ background: `linear-gradient(90deg, var(--card-color), transparent)` }}
                />

                {/* Shimmer Effect */}
                <div className="shimmer absolute top-0 bottom-0 h-full pointer-events-none z-0" />

                {/* Left Accent Bar */}
                <div
                    className="accent-bar absolute left-0 top-0 bottom-0 w-[3px] opacity-30 transition-opacity duration-[0.3s] ease-out z-10"
                    style={{ background: `rgba(${rgb}, 0.3)` }}
                />

                {/* ROW 1: Badge + Card number */}
                <div className="flex justify-between items-center mb-[10px] relative z-10">
                    <span
                        className="px-[8px] py-[2px] rounded-[50px] text-[9px] font-[700] tracking-[2px] uppercase border"
                        style={{
                            backgroundColor: `rgba(${rgb}, 0.1)`,
                            color: color,
                            borderColor: `rgba(${rgb}, 0.25)`
                        }}
                    >
                        {badgeLabel}
                    </span>
                    <span className="card-num text-[11px] text-[#333] font-[700] transition-colors duration-300 pointer-events-none select-none">
                        {num}
                    </span>
                </div>

                {/* ROW 2: Title */}
                <h3 className="role-title font-[700] text-[#fff] text-[12px] leading-[1.4] mb-[6px] line-clamp-2 transition-colors duration-300 relative z-10 min-h-[34px]">
                    {title}
                </h3>

                {/* ROW 3: Platform + Date */}
                <div className="flex justify-between items-center relative z-10 mb-[8px] min-h-[18px]">
                    <span className="text-[#555] text-[11px] truncate pr-2">{platform}</span>
                    <span className="text-[#555] text-[10px] whitespace-nowrap flex-shrink-0">{date}</span>
                </div>

                {/* ROW 4: Description */}
                <p className="text-[#666] text-[10px] leading-[1.5] mt-0 mb-[10px] line-clamp-3 relative z-10 min-h-[44px]">
                    {desc}
                </p>

                {/* Pushed to bottom section */}
                <div className="mt-auto relative z-10 flex flex-col">
                    {/* ROW 5: Tech Stack Pills */}
                    <div className="flex flex-wrap gap-[6px] mb-[12px] min-h-[28px]">
                        {tags.slice(0, 3).map((skill, index) => (
                            <span
                                key={index}
                                className="skill-pill px-[10px] py-[3px] border rounded-full text-[11px] transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>

                    {/* ROW 6: Action Buttons */}
                    <button
                        className="view-btn w-full mt-auto py-[10px] px-[16px] rounded-[12px] border flex items-center justify-center gap-[8px] text-[12px] max-[480px]:text-[11px] font-[600] tracking-[0.3px] transition-all duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] group/btn relative z-20"
                        onClick={() => onViewDetails({ ...data, issuerLabel, color, rgb })}
                    >
                        View Details
                        <ArrowRight className="w-[14px] h-[14px] group-hover/btn:translate-x-[3px] transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
});
CertCardCompact.displayName = 'CertCardCompact';

const CertificationModal = ({ cert, onClose }) => {
    const catRgb = cert ? (cert.rgb || hexToRgb(cert.color) || '255,255,255') : '255,255,255';

    useEffect(() => {
        if (cert) document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [cert]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (cert) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [cert, onClose]);

    if (!cert) return null;

    return createPortal(
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/85 backdrop-blur-md"
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full max-w-[720px] max-h-[88vh] bg-[linear-gradient(145deg,#0f0f0f,#0c0c0c)] border border-[#1e1e1e] rounded-[28px] overflow-hidden flex flex-col shadow-2xl"
                >
                    <div className="overflow-y-auto p-6 sm:p-10 custom-scrollbar relative">
                        <div
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                        />

                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-2 mb-4 pr-12">
                            <div className="flex flex-wrap items-center gap-[6px]">
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: `rgba(${catRgb}, 0.1)`,
                                        borderColor: `rgba(${catRgb}, 0.25)`,
                                        color: cert.color
                                    }}
                                >
                                    {cert.issuerLabel}
                                </span>
                                <span
                                    className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold tracking-wide uppercase border"
                                    style={{
                                        backgroundColor: 'rgba(163, 163, 163, 0.1)',
                                        borderColor: 'rgba(163, 163, 163, 0.3)',
                                        color: '#a3a3a3'
                                    }}
                                >
                                    {cert.num}
                                </span>
                            </div>
                        </div>

                        <h2 className="font-bold text-white mb-2 leading-tight pr-8 mt-3 text-[24px] sm:text-[28px]">
                            {cert.title}
                        </h2>

                        <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#666666] mb-8 border-b border-[#1e1e1e] pb-6">
                            <span className="flex items-center gap-1.5 border border-[#2a2a2a] px-3 py-1 rounded-md bg-[#111111]">
                                <Building2 className="w-4 h-4 text-[#777]" />
                                {cert.platform}
                            </span>
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {cert.date}
                            </div>
                        </div>

                        <div className="mb-8">
                            <p className="text-[#aaaaaa] text-[14px] sm:text-[15px] leading-[1.65]">
                                {cert.desc}
                            </p>
                        </div>

                        <div>
                            <span className="block text-[#555] text-[10px] uppercase tracking-[2px] mb-4 font-medium">
                                SKILLS
                            </span>
                            <div className="flex flex-wrap gap-[8px]">
                                {(cert.tags || []).map((skill, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.03)] border border-[#1e1e1e] text-[#aaaaaa] text-[12px] sm:text-[13px] rounded-full px-[14px] py-[6px] transition-all duration-300 cursor-default"
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = `rgba(${catRgb}, 0.1)`;
                                            e.currentTarget.style.borderColor = `rgba(${catRgb}, 0.35)`;
                                            e.currentTarget.style.color = cert.color;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                            e.currentTarget.style.borderColor = '#1e1e1e';
                                            e.currentTarget.style.color = '#aaaaaa';
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col min-[481px]:flex-row items-stretch min-[481px]:items-center justify-between gap-4">
                            <div className="flex flex-col max-[480px]:w-full min-[481px]:flex-row gap-4 min-[481px]:w-auto">
                                <button
                                    className="px-5 py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[14px] font-medium transition-all duration-300 group w-full min-[481px]:w-auto"
                                    style={{ borderColor: `${cert.color}50`, color: cert.color }}

                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = cert.color;
                                        e.currentTarget.style.color = "#ffffff";
                                        e.currentTarget.style.borderColor = cert.color;
                                        e.currentTarget.style.boxShadow = `0 4px 14px rgba(${catRgb}, 0.4)`;
                                    }}

                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = "transparent";
                                        e.currentTarget.style.color = cert.color;
                                        e.currentTarget.style.borderColor = `${cert.color}50`;
                                        e.currentTarget.style.boxShadow = "none";
                                    }}

                                    onClick={() => {
                                        if (cert?.certificateLink) {
                                            window.open(cert.certificateLink, "_blank", "noopener,noreferrer");
                                        }
                                        else if (cert?.doc) {
                                            window.open(cert.doc, "_blank");
                                        }
                                        else {
                                            console.warn("Certificate not available");
                                        }
                                    }}
                                >
                                    View Certificate

                                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </button>
                            </div>

                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-[#2a2a2a] text-[#888] bg-transparent text-[14px] font-medium flex items-center justify-center transition-all duration-300 hover:border-[#ff4d5a] hover:bg-[#ff4d5a] hover:text-white hover:shadow-[0_4px_14px_rgba(255,77,90,0.4)] w-full min-[481px]:w-auto mt-4 min-[481px]:mt-0"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>,
        document.body
    );
};

const Certifications = memo(() => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedCert, setSelectedCert] = useState(null);

    const visibleGroups = activeFilter === 'All'
        ? ISSUER_GROUPS
        : ISSUER_GROUPS.filter((g) => g.filterName === activeFilter);

    return (
        <section id="certifications" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden">
            <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

            <div className="max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 relative z-10 w-full min-w-0">
                {/* Section Header */}
                <div className="flex flex-col items-center justify-center mb-10 relative w-full min-w-0">
                    {/* Background Text */}
                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] max-[480px]:text-[60px] min-[481px]:text-[120px] min-[1025px]:text-[160px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-widest whitespace-nowrap overflow-hidden max-w-full" aria-hidden>
                        Certifications
                    </h2>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center min-w-0"
                    >
                        {/* Pill Badge */}
                        <div className="w-full flex justify-center mb-6 min-w-0">
                            <span className="px-[22px] max-[480px]:px-4 py-[7px] rounded-[50px] border font-medium bg-[rgba(255,77,90,0.1)] border-[rgba(255,77,90,0.3)] text-[#ff4d5a] text-[11px] max-[480px]:text-[10px] uppercase tracking-[4px] relative max-w-full truncate">
                                ● CERTIFICATIONS
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                            </span>
                        </div>

                        <h2 className="section-heading text-[#ffffff] text-center font-[800] break-words text-[clamp(24px,5.5vw,66px)] max-[480px]:text-[clamp(22px,5vw,30px)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                            Licenses &amp; Certifications
                        </h2>
                        <div style={{ 
                            width: '60px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)', 
                            borderRadius: '999px', 
                            margin: '8px auto 24px auto' 
                        }} />

                        <p className="text-[#888888] text-[15px] min-[481px]:text-[16px] max-[480px]:text-[14px] italic text-center max-w-2xl w-full font-light mt-3 min-w-0 break-words px-2">
                           Certifications that validate expertise and reflect a commitment to continuous learning.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Row — 4 cards: 2x2 tablet/mobile, single row desktop */}
                <div className="grid grid-cols-2 min-[1025px]:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-7 items-stretch">
                    {stats.map((stat, i) => (
                        <div key={i} className="h-full">
                            <StatCard icon={stat.icon} value={stat.value} label={stat.label} color={stat.color} />
                        </div>
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="w-full flex flex-wrap justify-center gap-[10px] mb-5 px-4 min-w-0 max-[480px]:px-2">
                    {FILTERS.map((filter) => {
                        const { name, count } = filter;
                        const isActive = activeFilter === name;

                        return (
                            <button
                                key={name}
                                onClick={() => setActiveFilter(name)}
                                className={`group relative flex items-center px-[18px] py-[8px] rounded-[50px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                                    ? 'bg-[#ff4d5a] text-white font-[700] shadow-[0_8px_24px_rgba(255,77,90,0.45),0_4px_12px_rgba(255,77,90,0.3)] border border-transparent'
                                    : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#666] font-[500] hover:bg-[rgba(255,77,90,0.07)] hover:border-[rgba(255,77,90,0.3)] hover:text-[#ff4d5a] hover:shadow-[0_4px_16px_rgba(255,77,90,0.1)]'
                                    }`}
                            >
                                {name}
                                <span className={`inline-flex items-center justify-center rounded-[50px] px-[7px] py-[1px] ml-[6px] text-[10px] transition-colors duration-300 ${isActive ? 'bg-[rgba(255,255,255,0.25)] text-white font-[700]' : 'bg-[rgba(255,255,255,0.07)] text-[#555] group-hover:bg-[rgba(255,77,90,0.15)] group-hover:text-[#ff9090]'
                                    }`}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.4),transparent)] mb-7" />

                {/* Certifications Grid */}
                <div className="w-full flex flex-col gap-6 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {visibleGroups.map((group) => (
                            <motion.div
                                key={group.filterName}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.1 }}
                                transition={{ duration: 0.5 }}
                                className="w-full"
                            >
                                <div
                                    className="relative w-full mb-[18px] rounded-[16px] border overflow-hidden"
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.03)',
                                        borderColor: `rgba(${group.catRGB}, 0.18)`
                                    }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ backgroundColor: group.catColor }} />
                                    <div className="flex items-center justify-between gap-4 px-[16px] sm:px-[18px] py-[12px]">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className="w-[40px] h-[40px] rounded-[12px] border flex items-center justify-center text-[12px] font-[800] tracking-[1px] shrink-0"
                                                style={{
                                                    backgroundColor: `rgba(${group.catRGB}, 0.10)`,
                                                    borderColor: `rgba(${group.catRGB}, 0.25)`,
                                                    color: group.catColor
                                                }}
                                            >
                                                {group.issuerLogo}
                                            </div>
                                            <div className="min-w-0">
                                                <h3 className="text-white font-[800] text-[15px] sm:text-[16px] leading-tight truncate">
                                                    {group.issuerFull}
                                                </h3>
                                                <p className="text-[#777] text-[12px] sm:text-[13px] truncate">
                                                    {group.issuerSub}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden sm:flex items-center gap-2">
                                            <span
                                                className="px-3 py-1 rounded-full text-[10px] font-[700] tracking-[2px] uppercase border"
                                                style={{
                                                    backgroundColor: `rgba(${group.catRGB}, 0.10)`,
                                                    borderColor: `rgba(${group.catRGB}, 0.25)`,
                                                    color: group.catColor
                                                }}
                                            >
                                                {group.issuerLabel}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 min-[481px]:grid-cols-2 min-[1025px]:grid-cols-3 min-[1280px]:grid-cols-4 gap-4 sm:gap-6 items-stretch w-full">
                                    {group.cards.map((card) => (
                                        <motion.div
                                            key={card.num}
                                            initial={{ opacity: 0, y: 30 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.1 }}
                                            transition={{ duration: 0.5 }}
                                            className="h-full"
                                        >
                                            <CertCardCompact
                                                data={card}
                                                issuerLabel={group.issuerLabel}
                                                color={group.catColor}
                                                rgb={group.catRGB}
                                                onViewDetails={setSelectedCert}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <CertificationModal
                cert={selectedCert}
                onClose={() => setSelectedCert(null)}
            />
        </section>
    );
});
Certifications.displayName = 'Certifications';

export default Certifications;
