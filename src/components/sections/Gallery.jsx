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
        tag: 'STUDENT OF THE YEAR',
        title: 'Prestigious Student of the Year Award Batch (2022–2026)',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 2,
        src: '/gallery/Combine_SOTY.jpeg',
        tag: 'STUDENT OF THE YEAR',
        title: 'Prestigious Student of the Year Award Batch (2022–2026)',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 3,
        src: '/gallery/Newsletter_Rank.jpg',
        tag: 'NEWSLETTER',
        title: 'Secured Overall First Rank in Department',
        orientation: 'landscape',
        type: 'document',
    },
    {
        id: 4,
        src: '/gallery/Newsletter_Rank1.jpg',
        tag: 'NEWSLETTER',
        title: 'Secured Overall First Rank in Department',
        orientation: 'landscape',
        type: 'document',
    },
    {
        id: 5,
        src: '/gallery/Newsletter_Rank2.jpg',
        tag: 'PRESS COVERAGE',
        title: 'Secured Overall First Rank in Department',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 6,
        src: '/gallery/Newsletter_Achievements.jpg',
        tag: 'NEWSLETTER',
        title: 'Academic & Extracurricular Achievements',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 7,
        src: '/gallery/Newsletter_Achievements1.jpg',
        tag: 'NEWSLETTER',
        title: 'Academic & Extracurricular Achievements',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 8,
        src: '/gallery/Newsletter_Achievements2.jpg',
        tag: 'NEWSLETTER',
        title: 'Academic & Extracurricular Achievements',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 9,
        src: '/gallery/Newsletter_Forum.jpg',
        tag: 'NEWSLETTER',
        title: 'Mentor & Vice President – NEXUS DS Forum',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 10,
        src: '/gallery/Newsletter_Forum1.jpg',
        tag: 'NEWSLETTER',
        title: 'Mentor & Vice President – NEXUS DS Forum',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 11,
        src: '/gallery/Newsletter_Forum2.jpg',
        tag: 'NEWSLETTER',
        title: 'Mentor & Vice President – NEXUS DS Forum',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 12,
        src: '/gallery/Newsletter_Internship.jpg',
        tag: 'NEWSLETTER',
        title: 'Internship at Hitachi India Pvt. Ltd.',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 13,
        src: '/gallery/Newsletter_Internship1.jpg',
        tag: 'NEWSLETTER',
        title: 'Internship at Hitachi India Pvt. Ltd.',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 14,
        src: '/gallery/Newsletter_Sports.jpg',
        tag: 'NEWSLETTER',
        title: 'Sports Champion & Team Leader',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 15,
        src: '/gallery/Newsletter_Sports1.jpg',
        tag: 'NEWSLETTER',
        title: 'Sports Champion & Team Leader',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 16,
        src: '/gallery/Newsletter_Teaching.jpg',
        tag: 'NEWSLETTER',
        title: 'Leading Knowledge Sharing Sessions',
        orientation: 'portrait',
        type: 'document',
    },
    {
        id: 17,
        src: '/gallery/Newsletter_Writing.jpg',
        tag: 'NEWSLETTER',
        title: 'My Insights & Reflections',
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
        tag: 'ATHLETICS',
        title: 'Shot Put & Discus Throw',
        sub: 'State-level competition',
        color: '#f59e0b',
        rgb: '245,158,11',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 2,
        src: '/gallery/Sports_3.jpeg',
        tag: 'ABACUS',
        title: 'National Abacus Championship',
        sub: 'Champion of Champions',
        color: '#ff4d5a',
        rgb: '255,77,90',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 3,
        src: '/gallery/Sports_4.jpeg',
        tag: 'SPORTS · INSIGHT',
        title: 'INSIGHT Cricket Tournament',
        sub: 'Annual college event',
        color: '#22c55e',
        rgb: '34,197,94',
        orientation: 'landscape',
        type: 'photo',
    },
    {
        id: 4,
        src: '/gallery/Abacus_1.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 5,
        src: '/gallery/Abacus_2.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 6,
        src: '/gallery/Abacus_3.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 7,
        src: '/gallery/Department_1.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 8,
        src: '/gallery/Department_2.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 9,
        src: '/gallery/Department_3.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 10,
        src: '/gallery/Forum_1.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 11,
        src: '/gallery/Red_House.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 12,
        src: '/gallery/House_Captain2.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 13,
        src: '/gallery/Insight_1.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 14,
        src: '/gallery/Insight_2.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 15,
        src: '/gallery/Internship.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 16,
        src: '/gallery/Internship_2.jpeg',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 17,
        src: '/gallery/IMG_7664.JPG',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 18,
        src: '/gallery/IMG_7678.JPG',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
    {
        id: 19,
        src: '/gallery/IMG_7701.JPG',
        tag: 'NEXUS-DS FORUM',
        title: 'Vice President — Forum Badge',
        sub: 'CSE Data Science leadership',
        color: '#3b82f6',
        rgb: '59,130,246',
        orientation: 'portrait',
        type: 'photo',
    },
];

const Gallery = () => {
    const [featuredIndex, setFeaturedIndex] = useState(0);
    const [momentsIndex, setMomentsIndex] = useState(0);
    const [isFeaturedAutoPlaying, setIsFeaturedAutoPlaying] = useState(true);
    const [isMomentsAutoPlaying, setIsMomentsAutoPlaying] = useState(true);
    const [lightbox, setLightbox] = useState({
        open: false, src: '', title: '', tag: '', sub: '', orientation: 'portrait', type: 'photo'
    });

    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    const featuredTimerRef = useRef(null);
    const momentsTimerRef = useRef(null);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setIsMobile(w < 640);
            setIsTablet(w >= 640 && w < 1024);
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    // Auto-play logic
    const startFeaturedTimer = () => {
        clearInterval(featuredTimerRef.current);
        featuredTimerRef.current = setInterval(() => {
            setFeaturedIndex(i => i === featuredImages.length - 1 ? 0 : i + 1);
        }, 4500);
    };

    const startMomentsTimer = () => {
        clearInterval(momentsTimerRef.current);
        momentsTimerRef.current = setInterval(() => {
            setMomentsIndex(i => i === momentsImages.length - 1 ? 0 : i + 1);
        }, 4500);
    };

    useEffect(() => {
        if (isFeaturedAutoPlaying) startFeaturedTimer();
        else clearInterval(featuredTimerRef.current);
        return () => clearInterval(featuredTimerRef.current);
    }, [isFeaturedAutoPlaying]);

    useEffect(() => {
        if (isMomentsAutoPlaying) startMomentsTimer();
        else clearInterval(momentsTimerRef.current);
        return () => clearInterval(momentsTimerRef.current);
    }, [isMomentsAutoPlaying]);

    // Manual interaction handlers
    const handleFeaturedManual = (newIndex) => {
        setFeaturedIndex(newIndex);
        setIsFeaturedAutoPlaying(false);
        setTimeout(() => setIsFeaturedAutoPlaying(true), 3000);
    };

    const handleMomentsManual = (newIndex) => {
        setMomentsIndex(newIndex);
        setIsMomentsAutoPlaying(false);
        setTimeout(() => setIsMomentsAutoPlaying(true), 3000);
    };

    // Escape key closes lightbox
    useEffect(() => {
        const fn = e => {
            if (e.key === 'Escape') {
                setLightbox(l => ({ ...l, open: false }));
            }
        };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, []);

    const getCardMetrics = (img) => {
        const { orientation, type } = img;
        if (type === 'document') {
            return {
                width: isMobile ? '85vw' : isTablet ? 240 : 300,
                height: isMobile ? 'auto' : isTablet ? 340 : 420,
                aspectRatio: '3/4',
                objectFit: 'contain'
            };
        }
        if (orientation === 'portrait') {
            return {
                width: isMobile ? '85vw' : isTablet ? 220 : 280,
                height: isMobile ? 'calc(70vw * 1.4)' : isTablet ? 340 : 420,
                aspectRatio: '3/4',
                objectFit: 'cover'
            };
        }
        // Landscape
        return {
            width: isMobile ? '85vw' : isTablet ? 380 : 520,
            height: isMobile ? 'calc(85vw * 0.6)' : isTablet ? 240 : 320,
            aspectRatio: '16/9',
            objectFit: 'cover'
        };
    };

    const getMomentsMetrics = (img) => {
        const { orientation, type } = img;
        if (isMobile) {
            return {
                width: '85vw',
                aspectRatio: orientation === 'landscape' ? '16/9' : '3/4',
                objectFit: type === 'document' ? 'contain' : 'cover'
            };
        }
        if (isTablet) {
            if (type === 'document') return { width: 240, aspectRatio: '3/4', objectFit: 'contain' };
            if (orientation === 'portrait') return { width: 220, aspectRatio: '3/4', objectFit: 'cover' };
            return { width: 360, aspectRatio: '16/9', objectFit: 'cover' };
        }
        // Desktop
        if (type === 'document') return { width: 300, aspectRatio: '3/4', objectFit: 'contain' };
        if (orientation === 'portrait') return { width: 280, aspectRatio: '3/4', objectFit: 'cover' };
        return { width: 480, aspectRatio: '16/9', objectFit: 'cover' };
    };

    const getOffset = (index, images, gap, metricsFn = getCardMetrics) => {
        let offset = 0;
        for (let i = 0; i < index; i++) {
            const metrics = metricsFn(images[i]);
            let w;
            if (typeof metrics.width === 'string' && metrics.width.includes('vw')) {
                w = window.innerWidth * (parseFloat(metrics.width) / 100);
            } else {
                w = metrics.width;
            }
            offset += w + gap;
        }
        return offset;
    };

    const arrowSize = isMobile ? 36 : isTablet ? 40 : 44;
    const featuredGap = isMobile ? 14 : 20;
    const momentsGap = isMobile ? 14 : isTablet ? 16 : 20;

    return (
        <section id="gallery" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden">
            <style>{`
                .gallery-card:hover .gallery-img { transform: scale(1.07); }
                .gallery-card-document:hover .gallery-img { transform: scale(1); }
                
                .gallery-card:hover { 
                    transform: translateY(-6px) scale(1.02);
                    border-color: var(--accent-color) !important;
                    box-shadow: 0 12px 40px rgba(var(--accent-rgb), 0.3);
                }
                .gallery-card-document:hover {
                    transform: translateY(-4px) scale(1.01);
                }
                
                .gallery-section * { scrollbar-width: none; }
                .gallery-section *::-webkit-scrollbar { display: none; }
                
                .glass-nav {
                    background: rgba(255, 255, 255, 0.08);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(8px);
                    transition: all 0.2s ease;
                }

                .card-overlay {
                    background: linear-gradient(
                        to top,
                        rgba(0,0,0,0.85) 0%,
                        rgba(0,0,0,0.4) 50%,
                        transparent 100%
                    );
                }

                .tint-overlay {
                    background: rgba(var(--accent-rgb), 0.12);
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                .gallery-card:hover .tint-overlay {
                    opacity: 1;
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 relative z-10 w-full min-w-0">

                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-10 w-full min-w-0"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="w-full flex justify-center mb-6 min-w-0">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] max-[480px]:text-[10px] font-medium uppercase rounded-[50px] px-[22px] max-[480px]:px-4 py-[7px] relative max-w-full truncate">
                            ● GALLERY
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-2 font-display break-words">
                        A Glimpse Into <span className="font-light">My Journey</span>
                    </h2>
                    <div style={{ 
                        width: '60px', 
                        height: '3px', 
                        background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)', 
                        borderRadius: '999px', 
                        margin: '8px auto 24px auto' 
                    }} />
                    <p className="max-w-[580px] w-full text-[#888888] text-[16px] max-[480px]:text-[14px] italic min-w-0 break-words px-2">
                        Press features, recognition and memories
                    </p>
                </motion.div>

                {/* CAROUSEL 1 — FEATURED */}
                <div className="mb-16 relative">
                    <div className="flex flex-col items-center mb-8">
                        <span className="text-[11px] uppercase tracking-[4px] font-[800] text-[#ff4d5a] mb-2">
                            FEATURED MOMENTS
                        </span>
                        <div style={{ 
                            width: '60px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)', 
                            borderRadius: '999px',
                            margin: '6px auto 0 auto'
                        }} />
                    </div>

                    <div 
                        className="relative"
                        onMouseEnter={() => setIsFeaturedAutoPlaying(false)}
                        onMouseLeave={() => setIsFeaturedAutoPlaying(true)}
                    >
                        <button
                            onClick={() => handleFeaturedManual(featuredIndex === 0 ? featuredImages.length - 1 : featuredIndex - 1)}
                            className="absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-20 glass-nav rounded-full flex items-center justify-center hover:bg-[#ff4d5a] hover:border-[#ff4d5a]"
                            style={{ width: arrowSize, height: arrowSize }}
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <button
                            onClick={() => handleFeaturedManual(featuredIndex === featuredImages.length - 1 ? 0 : featuredIndex + 1)}
                            className="absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-20 glass-nav rounded-full flex items-center justify-center hover:bg-[#ff4d5a] hover:border-[#ff4d5a]"
                            style={{ width: arrowSize, height: arrowSize }}
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>

                        <div className="overflow-hidden w-full">
                            <motion.div
                                className="flex items-stretch"
                                style={{ gap: `${featuredGap}px` }}
                                animate={{ x: -getOffset(featuredIndex, featuredImages, featuredGap) }}
                                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            >
                                {featuredImages.map((img, i) => {
                                    const metrics = getCardMetrics(img);
                                    const isActive = i === featuredIndex;
                                    return (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            onClick={() => setLightbox({
                                                open: true, src: img.src,
                                                title: img.title, tag: img.tag, sub: '',
                                                orientation: img.orientation, type: img.type
                                            })}
                                            className={`gallery-card ${img.type === 'document' ? 'gallery-card-document' : ''} rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-[0.35s] border shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative`}
                                            style={{
                                                '--accent-color': '#ff4d5a',
                                                '--accent-rgb': '255,77,90',
                                                width: metrics.width,
                                                height: metrics.height,
                                                background: img.type === 'document' ? '#0d0d0d' : '#111111',
                                                borderColor: isActive ? '#ff4d5a' : 'rgba(255,255,255,0.08)',
                                            }}
                                        >
                                            <div className="tint-overlay absolute inset-0 z-10" />
                                            <img
                                                src={img.src}
                                                alt={img.title}
                                                className="gallery-img w-full h-full transition-transform duration-400"
                                                style={{ objectFit: metrics.objectFit, objectPosition: 'center' }}
                                            />
                                            
                                            <div className="absolute inset-x-0 bottom-0 h-[40%] card-overlay z-20" />
                                            
                                            <div className="absolute bottom-3 left-3 z-30">
                                                <span className="bg-[#ff4d5a] text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-full mb-2 inline-block">
                                                    {img.tag}
                                                </span>
                                                <p className="text-white text-sm font-bold leading-tight">
                                                    {img.title}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-[6px] mt-8">
                        {featuredImages.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => handleFeaturedManual(i)}
                                className={`h-[8px] rounded-full transition-all duration-300 ${i === featuredIndex ? 'w-[24px] bg-[#ff4d5a]' : 'w-[8px] bg-gray-600'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* CAROUSEL 2 — MOMENTS */}
                <div className="relative">
                    <div className="flex flex-col items-center mb-8">
                        <span className="text-[11px] uppercase tracking-[4px] font-[800] text-[#a855f7] mb-2">
                            MOMENTS & MEMORIES
                        </span>
                        <div style={{ 
                            width: '60px', 
                            height: '3px', 
                            background: 'linear-gradient(90deg, #a855f7, #c084fc)', 
                            borderRadius: '999px',
                            margin: '6px auto 0 auto'
                        }} />
                    </div>

                    <div 
                        className="relative"
                        onMouseEnter={() => setIsMomentsAutoPlaying(false)}
                        onMouseLeave={() => setIsMomentsAutoPlaying(true)}
                    >
                        <button
                            onClick={() => handleMomentsManual(momentsIndex === 0 ? momentsImages.length - 1 : momentsIndex - 1)}
                            className="absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 z-20 glass-nav rounded-full flex items-center justify-center transition-colors duration-200"
                            style={{ 
                                width: arrowSize, 
                                height: arrowSize,
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = momentsImages[momentsIndex].color}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        >
                            <ChevronLeft className="w-5 h-5 text-white" />
                        </button>

                        <button
                            onClick={() => handleMomentsManual(momentsIndex === momentsImages.length - 1 ? 0 : momentsIndex + 1)}
                            className="absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 z-20 glass-nav rounded-full flex items-center justify-center transition-colors duration-200"
                            style={{ 
                                width: arrowSize, 
                                height: arrowSize,
                                backgroundColor: 'rgba(255,255,255,0.08)',
                                border: '1px solid rgba(255,255,255,0.15)'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = momentsImages[momentsIndex].color}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'}
                        >
                            <ChevronRight className="w-5 h-5 text-white" />
                        </button>

                        <div className="overflow-hidden w-full">
                            <motion.div
                                className="flex items-stretch"
                                style={{ gap: `${momentsGap}px` }}
                                animate={{ x: -getOffset(momentsIndex, momentsImages, momentsGap, getMomentsMetrics) }}
                                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            >
                                {momentsImages.map((img, i) => {
                                    const metrics = getMomentsMetrics(img);
                                    const isActive = i === momentsIndex;
                                    return (
                                        <motion.div
                                            key={img.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08 }}
                                            onClick={() => setLightbox({
                                                open: true, src: img.src,
                                                title: img.title, tag: img.tag, sub: img.sub,
                                                orientation: img.orientation, type: img.type
                                            })}
                                            className={`gallery-card ${img.type === 'document' ? 'gallery-card-document' : ''} rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 transition-all duration-[0.35s] border relative ${isActive ? 'opacity-100' : 'opacity-75 hover:opacity-100'}`}
                                            style={{
                                                '--accent-color': img.color,
                                                '--accent-rgb': img.rgb,
                                                width: metrics.width,
                                                aspectRatio: metrics.aspectRatio,
                                                background: img.type === 'document' ? '#0d0d0d' : '#111111',
                                                borderColor: isActive ? img.color : 'rgba(255,255,255,0.08)',
                                                boxShadow: isActive ? `0 0 20px rgba(${img.rgb}, 0.4)` : '0 4px 24px rgba(0,0,0,0.4)',
                                            }}
                                        >
                                            {/* LEFT ACCENT BAR */}
                                            {isActive && (
                                                <div 
                                                    className="absolute left-0 top-0 w-[3px] h-full z-30"
                                                    style={{ background: img.color }}
                                                />
                                            )}

                                            <div className="tint-overlay absolute inset-0 z-10" />
                                            <img
                                                src={img.src}
                                                alt={img.title}
                                                className="gallery-img w-full h-full transition-transform duration-400"
                                                style={{ 
                                                    objectFit: metrics.objectFit, 
                                                    objectPosition: img.orientation === 'portrait' ? 'center top' : 'center' 
                                                }}
                                            />
                                            
                                            <div className="absolute inset-x-0 bottom-0 h-[60%] card-overlay z-20" />
                                            
                                            <div className="absolute bottom-3 left-3 z-30">
                                                <span
                                                    className="text-white text-[10px] font-semibold uppercase px-3 py-1 rounded-full mb-2 inline-block"
                                                    style={{ background: '#a855f7' }}
                                                >
                                                    {img.tag}
                                                </span>
                                                <p className="text-white text-sm font-bold leading-tight">
                                                    {img.title}
                                                </p>
                                                {img.sub && (
                                                    <p className="text-gray-300 text-xs leading-tight mt-0.5">
                                                        {img.sub}
                                                    </p>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-[6px] mt-8">
                        {momentsImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => handleMomentsManual(i)}
                                className="h-[8px] rounded-full transition-all duration-300"
                                style={{ 
                                    width: i === momentsIndex ? '24px' : '8px',
                                    background: i === momentsIndex ? img.color : '#374151'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* LIGHTBOX */}
            <AnimatePresence>
                {lightbox.open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setLightbox(l => ({ ...l, open: false }))}
                        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 bg-black/95 backdrop-blur-[16px]"
                    >
                        <button
                            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#ff4d5a] transition-all z-50"
                            onClick={() => setLightbox(l => ({ ...l, open: false }))}
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.85, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-full flex flex-col items-center"
                        >
                            <img
                                src={lightbox.src}
                                alt={lightbox.title}
                                className="rounded-xl shadow-2xl border border-white/10"
                                style={{
                                    maxWidth: isMobile ? '95vw' : '90vw',
                                    maxHeight: isMobile ? '80vh' : '85vh',
                                    objectFit: 'contain',
                                }}
                            />
                            <div className="mt-6 text-center">
                                <span 
                                    className="text-white text-[10px] font-bold tracking-[2px] uppercase rounded-full px-4 py-1.5 inline-block mb-3"
                                    style={{ background: lightbox.type === 'photo' ? '#ff4d5a' : '#333' }}
                                >
                                    {lightbox.tag}
                                </span>
                                <h3 className="text-white text-xl font-bold">{lightbox.title}</h3>
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
