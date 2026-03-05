import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { personalInfo } from '@/data/personalInfo';
import { ChevronDown, Linkedin, Github, Twitter, Instagram } from 'lucide-react';
import { useTypewriter } from '@/hooks/useTypewriter';

const StatItem = ({ end, suffix, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (inView) {
            const controls = animate(0, end, {
                duration: 2,
                ease: "easeOut",
                onUpdate(value) {
                    setCount(Math.floor(value));
                }
            });
            return controls.stop;
        }
    }, [inView, end]);

    return (
        <div className="flex-1 text-center px-6 max-sm:px-4">
            <div
                ref={ref}
                className="text-[var(--accent)] font-bold text-[clamp(24px,3.5vw,36px)] leading-none"
            >
                {count}{suffix}
            </div>
            <div className="text-[#666] text-[10px] uppercase tracking-[2px] mt-1 font-medium">
                {label}
            </div>
        </div>
    );
};

const SocialIconItem = ({ Icon, url, brandClass }) => {
    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={`w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full flex items-center justify-center bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.1)] backdrop-blur-[10px] text-white transition-all duration-300 ease-in-out ${brandClass}`}
        >
            <Icon className="w-[18px] h-[18px] sm:w-[19px] sm:h-[19px] transition-colors duration-300" />
        </a>
    );
};

const Home = React.memo(function Home() {
    const roles = useMemo(() => ["Data Scientist", "AI Engineer", "ML Engineer", "Deep Learning Expert"], []);
    const typedText = useTypewriter(roles, 80, 40, 2000);

    // Intersection Observer for Scroll Indicator
    const [isScrolled, setIsScrolled] = useState(false);
    const topZoneRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsScrolled(!entry.isIntersecting);
        }, { threshold: 0 });

        if (topZoneRef.current) {
            observer.observe(topZoneRef.current);
        }
        return () => observer.disconnect();
    }, []);

    const socialLinks = useMemo(() => ({
        LinkedIn: { url: personalInfo.socials.find(s => s.name === "LinkedIn")?.url || "#", Icon: Linkedin, brandClass: "hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-[1.15]" },
        GitHub: { url: personalInfo.socials.find(s => s.name === "GitHub")?.url || "#", Icon: Github, brandClass: "hover:bg-white hover:text-black hover:border-white hover:scale-[1.15]" },
        Twitter: { url: personalInfo.socials.find(s => s.name === "Twitter")?.url || "#", Icon: Twitter, brandClass: "hover:bg-[#1da1f2] hover:border-[#1da1f2] hover:scale-[1.15]" },
        Instagram: { url: personalInfo.socials.find(s => s.name === "Instagram")?.url || "#", Icon: Instagram, brandClass: "hover:bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#bc1888)] hover:border-transparent hover:scale-[1.15]" }
    }), []);

    return (
        <section
            id="home"
            className="relative min-h-[100vh] overflow-hidden flex flex-col items-center justify-center text-center px-5 py-20"
            style={{ contain: 'layout style' }}
        >
            {/* Top 100px zone for IntersectionObserver */}
            <div ref={topZoneRef} className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-50" />

            {/* FULL VIEWPORT BACKGROUND IMAGE */}
            <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&fm=webp&q=85"
                alt="Professional Tech Workspace"
                className="absolute inset-0 w-full h-full object-cover object-center z-0 filter brightness-[0.35] saturate-[0.8] max-sm:brightness-[0.28]"
                loading="eager"
                width="1400"
                height="933"
                style={{ willChange: "auto" }}
            />

            {/* OVERLAYS */}
            {/* Layer 1: Left-heavy gradient */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(110deg, rgba(8,8,8,0.98) 0%, rgba(8,8,8,0.85) 35%, rgba(8,8,8,0.5) 65%, rgba(8,8,8,0.2) 100%)" }}
            />
            {/* Layer 2: Bottom fade */}
            <div
                className="absolute bottom-0 left-0 right-0 h-[180px] z-[2] pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, transparent 100%)" }}
            />
            {/* Layer 3: Top fade */}
            <div
                className="absolute top-0 left-0 right-0 h-[120px] z-[2] pointer-events-none"
                style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.6) 0%, transparent 100%)" }}
            />

            {/* CSS ONLY BACKGROUND ENHANCEMENTS (Orbs & Scanline) */}
            <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
                {/* Orb 1: Top Right */}
                <div
                    className="absolute top-[-5%] right-[-10%] w-[400px] h-[400px] rounded-full animate-[orb1_18s_ease-in-out_infinite] will-change-transform"
                    style={{ background: "radial-gradient(circle, rgba(255,77,90,0.07), transparent 65%)" }}
                />
                {/* Orb 2: Bottom Left */}
                <div
                    className="absolute bottom-[-5%] left-[-10%] w-[300px] h-[300px] rounded-full animate-[orb2_22s_ease-in-out_infinite_reverse] will-change-transform"
                    style={{ background: "radial-gradient(circle, rgba(99,102,241,0.05), transparent 65%)" }}
                />
                {/* Subtle Scanline */}
                <div
                    className="absolute left-0 right-0 h-[1px] animate-[scanline_10s_linear_infinite] will-change-transform"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,77,90,0.04), transparent)" }}
                />
            </div>

            {/* MAIN CONTENT BLOCK */}
            <div className="relative z-10 w-full max-w-[760px] mx-auto flex flex-col items-center justify-center min-h-[100vh]">

                {/* 1. TOP BADGE */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="hidden sm:inline-flex items-center justify-center bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] rounded-full px-[18px] py-[6px] transition-colors duration-300 hover:bg-[rgba(255,77,90,0.2)]"
                >
                    <span className="text-[#ff7070] text-[12px] font-medium tracking-[2px] uppercase">
                        ✦ Data Scientist & AI Engineer
                    </span>
                </motion.div>

                {/* 2. NAME */}
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
                    className="text-white font-[800] text-[clamp(30px,8vw,44px)] sm:text-[clamp(36px,5.5vw,64px)] leading-[1.1] tracking-[-1px] max-sm:tracking-[-0.5px] drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)] mt-5 z-10"
                >
                    Hi, I'm Mohit Gupta
                </motion.h1>

                {/* 3. TYPEWRITER LINE */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="mt-3 flex items-baseline justify-center text-[clamp(18px,2.5vw,24px)]"
                >
                    <span className="text-[#aaaaaa] font-[300]">I'm a&nbsp;</span>
                    <span className="text-[var(--accent)] font-[600] border-b-[2px] border-[var(--accent)] pb-[2px] leading-none inline-block">
                        {typedText}
                    </span>
                    <span className="text-[var(--accent)] font-[300] ml-[2px] animate-[blink_1s_step-end_infinite] inline-block -translate-y-[2px]">|</span>
                </motion.div>

                {/* 4. QUOTE BLOCK */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                    className="relative max-w-full sm:max-w-[480px] w-full mx-auto mt-7 flex flex-col items-center"
                >
                    {/* Decorative open-quote */}
                    <span className="absolute top-[-10px] left-[-15px] sm:left-[-20px] text-[60px] sm:text-[72px] leading-[0.8] text-[rgba(255,77,90,0.18)] font-serif pointer-events-none select-none">
                        "
                    </span>

                    {/* Top Accent Line */}
                    <div className="w-[50px] h-[1px] bg-[linear-gradient(90deg,transparent,#ff4d5a,transparent)] mb-[14px]" />

                    {/* Quote Text */}
                    <p className="text-[clamp(17px,2vw,21px)] italic font-[300] tracking-[0.3px] leading-[1.6] text-transparent bg-clip-text z-10 px-2" style={{ backgroundImage: "linear-gradient(135deg, #ffffff 30%, #cccccc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Just believe in yourself.
                    </p>

                    {/* Attribution Line */}
                    <div className="flex items-center justify-center gap-[10px] mt-[12px] w-full">
                        <div className="w-[24px] h-[1px] bg-[var(--accent)] shrink-0" />
                        <span className="text-[var(--accent)] text-[11px] font-[600] tracking-[3px] uppercase">
                            MOHIT GUPTA
                        </span>
                        <div className="w-[24px] h-[1px] bg-[var(--accent)] shrink-0" />
                    </div>

                    {/* Bottom Accent Line */}
                    <div className="w-[50px] h-[1px] bg-[linear-gradient(90deg,transparent,#ff4d5a,transparent)] mt-[14px]" />
                </motion.div>

                {/* 5. SOCIAL ICONS */}
                <motion.div
                    className="flex justify-center gap-3 sm:gap-4 mt-[36px]"
                >
                    {Object.entries(socialLinks).map(([name, { url, Icon, brandClass }], idx) => (
                        <motion.div
                            key={name}
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.7 + (idx * 0.1), ease: "easeOut" }}
                        >
                            <SocialIconItem Icon={Icon} url={url} brandClass={brandClass} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* 6. STATS ROW */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                    className="flex items-center justify-center w-full max-w-[440px] mx-auto mt-[52px] px-5 py-4 sm:px-10 sm:py-6 bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] border border-[rgba(255,255,255,0.07)] rounded-[16px]"
                >
                    <StatItem end={10} suffix="+" label="PROJECTS" />
                    <div className="w-[1px] h-[40px] bg-[rgba(255,255,255,0.1)] self-center" />
                    <StatItem end={2} suffix="+" label="YEARS" />
                    <div className="w-[1px] h-[40px] bg-[rgba(255,255,255,0.1)] self-center" />
                    <StatItem end={3} suffix="" label="PAPERS" />
                </motion.div>

            </div>

            {/* SCROLL INDICATOR */}
            <div
                className={`absolute bottom-[32px] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center transition-opacity duration-500 pointer-events-none ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
            >
                <span className="text-[#555] text-[9px] uppercase tracking-[3px] font-medium mb-2">
                    SCROLL DOWN
                </span>
                <ChevronDown className="w-[18px] h-[18px] text-[#555] animate-[bounce-down_1.5s_ease-in-out_infinite]" />
            </div>

        </section>
    );
});

export default Home;
