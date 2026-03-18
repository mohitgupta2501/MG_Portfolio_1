import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// =============================================
// 📸 FEATURED IMAGES — top carousel
// =============================================
const featuredImages = [
    {
        id: 1,
        src: '/gallery/Mohit_SOTY.jpeg',
        tag: 'ULTIMATE HONOR',
        title: 'Crowned at the Pinnacle — Student of the Year (Batch 2022–2026)',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 2,
        src: '/gallery/Combine_SOTY.jpeg',
        tag: 'LEGACY ACHIEVEMENT',
        title: 'A Defining Milestone — Student of the Year Recognition',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 3,
        src: '/gallery/Newsletter_Rank.jpg',
        tag: 'ACADEMIC DOMINANCE',
        title: 'Ranked #1 — Leading with Unmatched Academic Excellence',
        orientation: 'landscape',
        type: 'document',
    },
    {
        id: 4,
        src: '/gallery/Newsletter_Rank1.jpg',
        tag: 'TOPPER STATUS',
        title: 'At the Top — Recognized for Academic Brilliance',
        orientation: 'landscape',
        type: 'document',
    },
    {
        id: 5,
        src: '/gallery/Newsletter_Rank2.jpg',
        tag: 'MEDIA SPOTLIGHT',
        title: 'In the Headlines — Department Topper Featured',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 6,
        src: '/gallery/Newsletter_Achievements.jpg',
        tag: 'ALL-ROUND EXCELLENCE',
        title: 'Excelling Everywhere — Academic & Extracurricular Mastery',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 7,
        src: '/gallery/Newsletter_Achievements1.jpg',
        tag: 'BEYOND LIMITS',
        title: 'More than Academics — A Journey of Versatility & Success',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 8,
        src: '/gallery/Newsletter_Achievements2.jpg',
        tag: 'CONSISTENT GREATNESS',
        title: 'Dedication that Wins — Recognized for Consistent Excellence',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 9,
        src: '/gallery/Newsletter_Forum.jpg',
        tag: 'VISIONARY MENTORSHIP',
        title: 'Leading with Purpose — Mentor & Vice President, Nexus-DS',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 10,
        src: '/gallery/Newsletter_Forum1.jpg',
        tag: 'EMPOWERING LEADERSHIP',
        title: 'Shaping Minds — Forum Leadership & Mentorship Impact',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 11,
        src: '/gallery/Newsletter_Forum2.jpg',
        tag: 'INNOVATION DRIVER',
        title: 'Driving Change — Nexus-DS Leadership & Innovation',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 12,
        src: '/gallery/Newsletter_Internship.jpg',
        tag: 'INDUSTRY EXPERIENCE',
        title: 'Stepping into the Real World — Internship at Hitachi India',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 13,
        src: '/gallery/Newsletter_Internship1.jpg',
        tag: 'CAREER BUILDING',
        title: 'From Learning to Execution — Professional Growth at Hitachi',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 14,
        src: '/gallery/Newsletter_Sports.jpg',
        tag: 'CHAMPION MINDSET',
        title: 'Built to Win — Excellence in Sports & Leadership',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 15,
        src: '/gallery/Newsletter_Sports1.jpg',
        tag: 'GAME LEADER',
        title: 'Leading from the Front — Sports Achievements & Team Spirit',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 16,
        src: '/gallery/Newsletter_Teaching.jpg',
        tag: 'KNOWLEDGE LEADER',
        title: 'Guiding Minds — Delivering Impactful Learning Sessions',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 17,
        src: '/gallery/Newsletter_Writing.jpg',
        tag: 'CREATIVE EXPRESSION',
        title: 'Words that Inspire — Thoughts, Insights & Reflections',
        orientation: 'portrait',
        type: 'document',
    },
];

// =============================================
// 📸 MOMENTS IMAGES — bottom carousel
// =============================================
const momentsImages = [
    {
        id: 1,
        src: '/gallery/Sports_1.jpeg',
        tag: 'ELITE ATHLETICS',
        title: 'Dominating the Field — Shot Put & Discus Excellence',
        color: '#f59e0b',
        rgb: '245,158,11',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 2,
        src: '/gallery/Sports_3.jpeg',
        tag: 'MENTAL MASTERY',
        title: 'Precision & Brilliance — National Abacus Championship',
        color: '#ff4d5a',
        rgb: '255,77,90',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 3,
        src: '/gallery/Sports_4.jpeg',
        tag: 'COMPETITIVE SPIRIT',
        title: 'Cricketing Glory — INSIGHT Tournament Leadership',
        color: '#22c55e',
        rgb: '34,197,94',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 4,
        src: '/gallery/Abacus_1.jpeg',
        tag: 'VISIONARY LEADERSHIP',
        title: 'Leading Innovation — Nexus-DS Vice Presidency',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 5,
        src: '/gallery/Abacus_2.jpeg',
        tag: 'POWER & RESPONSIBILITY',
        title: 'Symbol of Authority — Steering Forum Excellence',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 6,
        src: '/gallery/Abacus_3.jpeg',
        tag: 'DATA SCIENCE LEADERSHIP',
        title: 'Empowering Minds — Driving Innovation in Data Science',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 7,
        src: '/gallery/Department_1.jpeg',
        tag: 'ACADEMIC INFLUENCE',
        title: 'Shaping Futures — Departmental Leadership Excellence',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 8,
        src: '/gallery/Department_2.jpeg',
        tag: 'EXCELLENCE IN ACTION',
        title: 'Driving Academic Brilliance — Leading by Example',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 9,
        src: '/gallery/Department_3.jpeg',
        tag: 'IMPACTFUL CONTRIBUTIONS',
        title: 'Inspiring Growth — Building a Strong Academic Legacy',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 10,
        src: '/gallery/Forum_1.jpeg',
        tag: 'STRATEGIC LEADERSHIP',
        title: 'Strength in Execution — Forum Coordination at Scale',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 11,
        src: '/gallery/Red_House.jpeg',
        tag: 'HOUSE LEADERSHIP',
        title: 'Pride in Command — Red House Captaincy',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 12,
        src: '/gallery/House_Captain2.jpeg',
        tag: 'LEADING FROM THE FRONT',
        title: 'Commanding Excellence — House Captain Leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 13,
        src: '/gallery/Insight_1.jpeg',
        tag: 'EVENT MASTERY',
        title: 'Building Impact — INSIGHT Event Leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 14,
        src: '/gallery/Insight_2.jpeg',
        tag: 'TEAM SYNERGY',
        title: 'Vision & Teamwork — Driving INSIGHT Success',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 15,
        src: '/gallery/Internship.jpeg',
        tag: 'PROFESSIONAL JOURNEY',
        title: 'Stepping into the Industry — Real-World Exposure',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 16,
        src: '/gallery/Internship_2.jpeg',
        tag: 'CAREER MILESTONES',
        title: 'From Learning to Leading — Internship Achievements',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 17,
        src: '/gallery/IMG_7664.JPG',
        tag: 'ACHIEVEMENT UNLOCKED',
        title: 'Moments of Glory — Celebrating Success',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 18,
        src: '/gallery/IMG_7678.JPG',
        tag: 'BREAKING LIMITS',
        title: 'Beyond Boundaries — Personal Evolution',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 19,
        src: '/gallery/IMG_7701.JPG',
        tag: 'LEGACY IN PROGRESS',
        title: 'Journey of Excellence — Defining My Path',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
];
// ─── CONSTANTS ─────────────────────────────────────────── 
const FEATURED_COLOR = '#ff4d5a';
const FEATURED_RGB = '255,77,90';
const MOMENTS_COLOR = '#a855f7';
const MOMENTS_RGB = '168,85,247';

// ─── CAROUSEL COMPONENT ────────────────────────────────── 
const Carousel = ({
    images,
    title,
    description,
    accentColor,
    accentRgb,
    cardHeight,
    onOpenLightbox,
}) => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);
    const trackRef = useRef(null);

    const CARD_WIDTH = typeof window !== 'undefined' && window.innerWidth < 640
        ? Math.floor(window.innerWidth * 0.82)
        : typeof window !== 'undefined' && window.innerWidth < 1024
            ? 280
            : 320;
    const CARD_GAP = 16;
    const CARD_STRIDE = CARD_WIDTH + CARD_GAP;

    // auto-scroll 
    useEffect(() => {
        if (paused) { clearInterval(timerRef.current); return; }
        timerRef.current = setInterval(() => {
            setIndex(i => (i + 1) % images.length);
        }, 4000);
        return () => clearInterval(timerRef.current);
    }, [paused, images.length]);

    const go = (newIndex) => {
        clearInterval(timerRef.current);
        setIndex((newIndex + images.length) % images.length);
        setPaused(true);
        setTimeout(() => setPaused(false), 3000);
    };

    const offsetX = index * CARD_STRIDE;

    return (
        <div className="mb-20">
            {/* heading */}
            <div className="flex flex-col items-center mb-8">
                <span
                    className="text-[11px] uppercase tracking-[4px] font-[800] mb-2"
                    style={{ color: accentColor }}
                >
                    {title}
                </span>
                <div style={{
                    width: 60, height: 3,
                    background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
                    borderRadius: 999,
                }} />
                <p className="text-[#9ca3af] text-sm mt-3 text-center">{description}</p>
            </div>

            {/* track wrapper */}
            <div
                className="relative"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
            >
                {/* prev arrow */}
                <button
                    onClick={() => go(index - 1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{
                        width: 40, height: 40,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = accentColor;
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 0 16px rgba(${accentRgb},0.5)`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                {/* next arrow */}
                <button
                    onClick={() => go(index + 1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center rounded-full transition-all duration-200"
                    style={{
                        width: 40, height: 40,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        backdropFilter: 'blur(8px)',
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = accentColor;
                        e.currentTarget.style.borderColor = accentColor;
                        e.currentTarget.style.boxShadow = `0 0 16px rgba(${accentRgb},0.5)`;
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                        e.currentTarget.style.boxShadow = 'none';
                    }}
                >
                    <ChevronRight className="w-5 h-5 text-white" />
                </button>

                {/* scrollable track */}
                <div
                    className="overflow-hidden mx-[52px]"
                    ref={trackRef}
                >
                    <motion.div
                        className="flex"
                        style={{ gap: CARD_GAP }}
                        animate={{ x: -offsetX }}
                        transition={{ type: 'spring', damping: 28, stiffness: 140 }}
                    >
                        {images.map((img, i) => {
                            const isActive = i === index;
                            const imgColor = img.color || accentColor;
                            const imgRgb = img.rgb || accentRgb;
                            return (
                                <div
                                    key={img.id}
                                    onClick={() => isActive ? onOpenLightbox(img, accentColor, accentRgb) : go(i)}
                                    className="gallery-card-item flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer"
                                    style={{
                                        width: CARD_WIDTH,
                                        height: cardHeight,
                                        border: isActive
                                            ? `1.5px solid ${accentColor}`
                                            : '1px solid rgba(255,255,255,0.08)',
                                        boxShadow: isActive
                                            ? `0 0 32px rgba(${accentRgb},0.4), 0 16px 48px rgba(0,0,0,0.6)`
                                            : '0 4px 20px rgba(0,0,0,0.4)',
                                        opacity: isActive ? 1 : 0.6,
                                        transition: 'all 0.35s ease',
                                        background: img.type === 'document' ? '#0d0d0d' : '#111',
                                    }}
                                    onMouseEnter={e => {
                                        if (!isActive) {
                                            e.currentTarget.style.opacity = '0.85';
                                            e.currentTarget.style.borderColor = `rgba(${accentRgb},0.4)`;
                                        }
                                    }}
                                    onMouseLeave={e => {
                                        if (!isActive) {
                                            e.currentTarget.style.opacity = '0.6';
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        }
                                    }}
                                >
                                    {/* active left bar */}
                                    {isActive && (
                                        <div
                                            className="absolute left-0 top-0 w-[3px] h-full z-30"
                                            style={{ background: accentColor }}
                                        />
                                    )}

                                    {/* image fills entire card */}
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className={`gallery-zoom-img w-full h-full ${img.type === 'document' ? 'gallery-doc-img' : ''}`}
                                        style={{
                                            objectFit: img.type === 'document' ? 'contain' : 'cover',
                                            objectPosition: 'center',
                                            transition: 'transform 0.4s ease',
                                            pointerEvents: 'none',
                                        }}
                                    />

                                    {/* gradient overlay */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 35%, rgba(0,0,0,0.2) 65%, transparent 100%)'
                                        }}
                                    />

                                    {/* bottom content — badge above title, no overlap ever */}
                                    <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 flex flex-col gap-[6px]">
                                        <span
                                            className="self-start text-white text-[10px] font-bold uppercase px-3 py-[5px] rounded-full tracking-wider"
                                            style={{ background: accentColor }}
                                        >
                                            {img.tag}
                                        </span>
                                        <p className="text-white text-[13px] font-bold leading-snug line-clamp-2 w-full">
                                            {img.title}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>

                {/* dot indicators */}
                <div className="flex justify-center gap-[6px] mt-6">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            className="rounded-full transition-all duration-300"
                            style={{
                                width: i === index ? 24 : 8,
                                height: 8,
                                background: i === index ? accentColor : '#374151',
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── GALLERY ───────────────────────────────────────────── 
const Gallery = () => {
    const [lightbox, setLightbox] = useState({
        open: false, src: '', title: '', tag: '', sub: '',
        color: FEATURED_COLOR, rgb: FEATURED_RGB
    });

    // Escape closes lightbox 
    useEffect(() => {
        const fn = e => { if (e.key === 'Escape') setLightbox(l => ({ ...l, open: false })); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, []);

    const openLightbox = (img, color, rgb) => {
        setLightbox({
            open: true,
            src: img.src,
            title: img.title,
            tag: img.tag,
            sub: img.sub || '',
            color,
            rgb,
        });
    };

    const lbColor = lightbox.color;
    const lbRgb = lightbox.rgb;

    return (
        <section id="gallery" className="pt-[80px] pb-[80px] relative bg-transparent">
            <style>{` 
                 #gallery img { display: block; } 
                 .gallery-card-item:hover .gallery-zoom-img { 
                     transform: scale(1.06); 
                 } 
                 .gallery-card-item:hover .gallery-doc-img { 
                     transform: scale(1) !important; 
                 } 
             `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center text-center mb-14"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="w-full flex justify-center mb-6">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] font-medium uppercase rounded-[50px] px-[22px] py-[7px] relative">
                            ● GALLERY
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="text-white font-[800] text-[clamp(28px,5.5vw,66px)] leading-tight mb-2 break-words">
                        A Glimpse Into <span className="font-light">My Journey</span>
                    </h2>
                    <div style={{
                        width: 60, height: 3,
                        background: 'linear-gradient(90deg,#ff4d5a,#ff6b6b)',
                        borderRadius: 999,
                        margin: '8px auto 20px',
                    }} />
                    <p className="text-[#888] text-[16px] italic max-w-[580px]">
                        Press features, recognition and memories
                    </p>
                </motion.div>

                {/* CAROUSEL 1 — FEATURED MOMENTS */}
                <Carousel
                    images={featuredImages}
                    title="FEATURED MOMENTS"
                    description="Student of the Year · Newsletter · Newspaper · Internship"
                    accentColor={FEATURED_COLOR}
                    accentRgb={FEATURED_RGB}
                    cardHeight={400}
                    onOpenLightbox={openLightbox}
                />

                {/* CAROUSEL 2 — MOMENTS & MEMORIES */}
                <Carousel
                    images={momentsImages}
                    title="MOMENTS & MEMORIES"
                    description="Sports · Competitions · Forum · Events"
                    accentColor={MOMENTS_COLOR}
                    accentRgb={MOMENTS_RGB}
                    cardHeight={380}
                    onOpenLightbox={openLightbox}
                />

            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightbox.open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(l => ({ ...l, open: false }))}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4"
                        style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(16px)' }}
                    >
                        {/* close */}
                        <button
                            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full text-white z-50 transition-all duration-200"
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = lbColor;
                                e.currentTarget.style.borderColor = lbColor;
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                            }}
                            onClick={() => setLightbox(l => ({ ...l, open: false }))}
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={e => e.stopPropagation()}
                            className="flex flex-col items-center max-w-full"
                        >
                            <div style={{
                                borderRadius: 16,
                                overflow: 'hidden',
                                border: `1.5px solid rgba(${lbRgb},0.4)`,
                                boxShadow: `0 0 50px rgba(${lbRgb},0.3), 0 24px 80px rgba(0,0,0,0.8)`,
                                maxWidth: '90vw',
                                maxHeight: '80vh',
                            }}>
                                <img
                                    src={lightbox.src}
                                    alt={lightbox.title}
                                    style={{
                                        display: 'block',
                                        maxWidth: '90vw',
                                        maxHeight: '80vh',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                            <div className="mt-5 text-center">
                                <span
                                    className="text-white text-[10px] font-bold tracking-[2px] uppercase rounded-full px-4 py-[6px] inline-block mb-3"
                                    style={{
                                        background: lbColor,
                                        boxShadow: `0 0 16px rgba(${lbRgb},0.5)`,
                                        border: `1px solid rgba(${lbRgb},0.4)`,
                                    }}
                                >
                                    {lightbox.tag}
                                </span>
                                <h3 className="text-white text-xl font-bold max-w-[560px]">{lightbox.title}</h3>
                                {lightbox.sub && <p className="text-gray-400 text-sm mt-1">{lightbox.sub}</p>}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default React.memo(Gallery);
