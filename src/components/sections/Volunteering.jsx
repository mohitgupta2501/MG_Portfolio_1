import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Building2, MapPin, ArrowRight, Linkedin } from 'lucide-react';
import { volunteeringData } from '@/data/volunteering';
import VolunteeringModal from '@/components/ui/VolunteeringModal';

const VIOLET = '#a78bfa';
const VIOLET_RGB = '167, 139, 250';

const VolCard = React.memo(({ item, index, onClick, className = '' }) => {
    const shouldReduceMotion = useReducedMotion();
    const MAX_CHIPS = 3;
    const chips = item.focusAreas || [];
    const shownChips = chips.slice(0, MAX_CHIPS);
    const extraChips = chips.length - shownChips.length;

    return (
        <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
            className={`h-full min-w-0 ${className}`}
        >
            <div
                className="vol-card group"
                onClick={() => onClick(item)}
                style={{ '--cat-color': item.color, '--cat-rgb': item.rgb }}
            >
                <div className="vol-top" />

                {/* Role/date pills + title */}
                <div className="relative z-10 min-w-0">
                    <div className="flex flex-wrap items-center gap-[6px]">
                        <span className="vol-role-pill">{item.rolePill}</span>

                        <div
                            className="inline-flex items-center gap-[6px] rounded-[50px] px-[10px] py-[3px]"
                            style={{
                                backgroundColor: item.duration.includes("Present") ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                                border: item.duration.includes("Present") ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(255,255,255,0.1)',
                                color: item.duration.includes("Present") ? '#22c55e' : '#666'
                            }}
                        >
                            {item.duration.includes("Present") ? (
                                <div className="w-[6px] h-[6px] rounded-full bg-[#22c55e] animate-pulse shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                            ) : null}
                            <span className="text-[11px] whitespace-nowrap">{item.duration}</span>
                        </div>
                    </div>

                    <h3 className="vol-title text-white font-[700] text-[17px] max-[480px]:text-[16px] leading-[22px] transition-colors duration-300 mt-[8px] break-words">
                        {item.title}
                    </h3>
                </div>

                {/* Organisation + location */}
                <div className="relative z-10 mt-[12px] flex flex-col gap-[4px] min-w-0">
                    <div className="flex items-center gap-[6px] min-w-0">
                        <Building2 className="w-[14px] h-[14px] shrink-0 text-[#777]" />
                        <span className="vol-company text-[13px] font-[500] text-[#bbb] transition-colors duration-300 truncate">{item.company}</span>
                    </div>
                    <div className="flex items-center gap-[4px] text-[#777] min-w-0">
                        <MapPin className="w-[12px] h-[12px] shrink-0" />
                        <span className="text-[12px] truncate">{item.location}</span>
                    </div>
                </div>

                {/* Description (clamped to 2 lines) */}
                <p className="relative z-10 text-[#888888] text-[13px] max-[480px]:text-[12px] leading-[1.55] mt-[12px]" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    wordBreak: 'break-word'
                }}>
                    {item.description}
                </p>

                {/* Focus-area chips (max 3 + "+N") */}
                {chips.length > 0 && (
                    <div className="relative z-10 flex flex-wrap gap-[6px] mt-[12px]">
                        {shownChips.map((chip, idx) => (
                            <span key={idx} className="vol-chip">{chip}</span>
                        ))}
                        {extraChips > 0 && (
                            <span className="vol-chip">+{extraChips} more</span>
                        )}
                    </div>
                )}

                {/* Action buttons */}
                <div className="vol-actions">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClick(item); }}
                        className="vol-btn"
                        aria-label={`View details for ${item.title} at ${item.company}`}
                    >
                        <span>View Details</span>
                        <ArrowRight className="w-[14px] h-[14px]" />
                    </button>

                    {item.linkedinUrl && (
                        <a
                            href={item.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="vol-btn vol-li-btn"
                            aria-label={`LinkedIn page for ${item.company}`}
                        >
                            <Linkedin className="w-[14px] h-[14px]" />
                            <span>LinkedIn</span>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
});
VolCard.displayName = 'VolCard';

const Volunteering = React.memo(function Volunteering() {
    const sectionRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const shouldReduceMotion = useReducedMotion();

    return (
        <section
            ref={sectionRef}
            id="volunteering"
            className="relative pt-[72px] pb-[80px] bg-[#080808] overflow-hidden"
            style={{ contain: 'layout style' }}
        >
            {/* BACKGROUND ENHANCEMENTS: glows tinted violet + dot grid */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes vol-float-1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-30px,20px) scale(1.08)} 66%{transform:translate(15px,-20px) scale(0.95)} }
                    @keyframes vol-float-2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(20px,-30px) scale(0.9)} 66%{transform:translate(-20px,15px) scale(1.05)} }
                `}} />
                <div
                    className="absolute top-[5%] right-[-10%] w-[400px] h-[400px] rounded-full animate-[vol-float-1_20s_ease-in-out_infinite] will-change-transform"
                    style={{ background: `radial-gradient(ellipse, rgba(${VIOLET_RGB},0.06), transparent 65%)` }}
                />
                <div
                    className="absolute bottom-[-5%] left-[-10%] w-[320px] h-[320px] rounded-full animate-[vol-float-2_25s_ease-in-out_infinite] will-change-transform"
                    style={{ background: `radial-gradient(ellipse, rgba(${VIOLET_RGB},0.05), transparent 65%)` }}
                />
                {/* Dot Grid Layer */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "32px 32px"
                    }}
                />
            </div>

            {/* SECTION HEADER BACKGROUND TEXT (ghost watermark) */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center pointer-events-none select-none z-0 w-full overflow-hidden flex justify-center">
                <span
                    className="font-[900] text-[rgba(255,255,255,0.015)] tracking-[10px] whitespace-nowrap"
                    style={{ fontSize: 'clamp(80px, 12vw, 140px)', animation: 'vol-header-scale 8s ease infinite' }}
                >
                    SERVICE
                </span>
            </div>

            {/* Shared styles for this section — declared once, not per instance */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes vol-header-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.03); }
                }

                /* Card */
                .vol-card {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(145deg, #111111, #0c0c0c);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    border-radius: 20px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                }

                .vol-card .vol-top {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 2px;
                    background: linear-gradient(90deg, transparent, ${VIOLET} 50%, transparent);
                    opacity: 0.5;
                    transition: opacity 0.35s;
                    border-radius: 20px 20px 0 0;
                    z-index: 1;
                }

                .vol-card .vol-role-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 3px 10px;
                    border-radius: 50px;
                    font-size: 9.5px;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    color: ${VIOLET};
                    background-color: rgba(${VIOLET_RGB}, 0.12);
                    border: 1px solid rgba(${VIOLET_RGB}, 0.3);
                }

                .vol-card .vol-chip {
                    display: inline-flex;
                    align-items: center;
                    padding: 3px 10px;
                    border-radius: 50px;
                    font-size: 11px;
                    background-color: rgba(${VIOLET_RGB}, 0.10);
                    border: 1px solid rgba(${VIOLET_RGB}, 0.3);
                    color: rgba(${VIOLET_RGB}, 0.85);
                    transition: all 300ms ease;
                }

                /* Action buttons row */
                .vol-card .vol-actions {
                    display: flex;
                    gap: 10px;
                    margin-top: 16px;
                    position: relative;
                    z-index: 2;
                }

                .vol-card .vol-btn {
                    flex: 1 1 0;
                    min-width: 0;
                    min-height: 44px;
                    padding: 10px 18px;
                    background: transparent;
                    border: 1px solid rgba(${VIOLET_RGB}, 0.3);
                    color: ${VIOLET};
                    font-size: 13px;
                    font-weight: 600;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 2;
                }

                .vol-card .vol-li-btn {
                    flex: 0 0 auto;
                    text-decoration: none;
                }

                .vol-card .vol-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, ${VIOLET}, rgba(${VIOLET_RGB}, 0.8));
                    opacity: 0;
                    transition: opacity 0.35s ease;
                    border-radius: 11px;
                    z-index: 0;
                }

                .vol-card .vol-btn span,
                .vol-card .vol-btn svg {
                    position: relative;
                    z-index: 1;
                    transition: color 0.35s, transform 0.35s;
                }

                .vol-card .vol-btn:focus-visible {
                    outline: none;
                    box-shadow: 0 0 0 2px #080808, 0 0 0 4px rgba(${VIOLET_RGB}, 0.7);
                }
                .vol-card .vol-btn:active {
                    transform: translateY(0) scale(0.97);
                    box-shadow: 0 4px 14px rgba(${VIOLET_RGB}, 0.3);
                }

                /* Desktop / tablet-landscape card padding */
                @media (min-width: 768px) {
                    .vol-card { padding: 20px; }
                }

                /* Hover behaviour — desktop (pointer) devices only */
                @media (hover: hover) and (pointer: fine) {
                    .vol-card:hover {
                        transform: translateY(-8px) scale(1.008);
                        border-color: rgba(${VIOLET_RGB}, 0.55);
                        box-shadow:
                            0 28px 70px rgba(0,0,0,0.55),
                            0 12px 30px rgba(0,0,0,0.35),
                            0 0 0 1px rgba(${VIOLET_RGB}, 0.15),
                            0 0 50px rgba(${VIOLET_RGB}, 0.1);
                    }
                    .vol-card:hover .vol-top { opacity: 1; }
                    .vol-card:hover .vol-title { color: ${VIOLET}; }
                    .vol-card:hover .vol-company { color: #ddd; }
                    .vol-card:hover .vol-chip {
                        background-color: rgba(${VIOLET_RGB}, 0.22);
                        border-color: rgba(${VIOLET_RGB}, 0.7);
                        color: ${VIOLET};
                        box-shadow: 0 0 8px rgba(${VIOLET_RGB}, 0.4);
                    }
                    .vol-card .vol-btn:hover {
                        border-color: ${VIOLET};
                        transform: translateY(-2px);
                        box-shadow: 0 10px 28px rgba(${VIOLET_RGB}, 0.45), 0 4px 12px rgba(${VIOLET_RGB}, 0.25);
                    }
                    .vol-card .vol-btn:hover::before { opacity: 1; }
                    .vol-card .vol-btn:hover span { color: #fff; }
                    .vol-card .vol-btn:hover svg { color: #fff; transform: translateX(5px); }
                    .vol-card .vol-li-btn:hover svg { transform: none; }
                }

                /* Mobile: stack the two action buttons, each full width */
                @media (max-width: 480px) {
                    .vol-card .vol-actions { flex-direction: column; }
                    .vol-card .vol-actions .vol-btn { flex: 1 1 auto; width: 100%; }
                }

                @media (prefers-reduced-motion: reduce) {
                    .vol-card,
                    .vol-card .vol-chip,
                    .vol-card .vol-btn,
                    .vol-card .vol-top {
                        transition: none;
                    }
                }
            `}} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 w-full min-w-0">

                {/* SECTION HEADER */}
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-8 w-full min-w-0"
                    initial={shouldReduceMotion ? { opacity: 0 } : { y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
                >
                    <div className="w-full flex justify-center mb-5 min-w-0">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] max-[480px]:text-[10px] font-medium uppercase rounded-[50px] px-[22px] max-[480px]:px-4 py-[7px] relative max-w-full truncate">
                            ● VOLUNTEERING
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="section-heading text-[#ffffff] font-[800] text-[clamp(28px,5.5vw,66px)] max-[480px]:text-[clamp(24px,5vw,32px)] leading-tight mb-2 font-display break-words">
                        Volunteering &amp; Social Service
                    </h2>
                    <div style={{
                        width: '60px',
                        height: '3px',
                        background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)',
                        borderRadius: '999px',
                        margin: '8px auto 24px auto'
                    }} />
                    <p className="max-w-[580px] w-full text-[#888888] text-[16px] max-[480px]:text-[14px] italic min-w-0 break-words px-2">
                        Giving back through education, women&rsquo;s empowerment, and community service.
                    </p>
                </motion.div>

                {/* CARDS GRID — 1 col mobile; 2-col (4-track) grid at >= 768px.
                    Cards span 2 tracks each, so an odd last card is centred between
                    the two columns (grid-column: 2 / span 2) instead of left-aligned. */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-[14px] md:gap-[20px] items-stretch w-full min-w-0">
                    {volunteeringData.map((item, idx) => {
                        const isLastOdd = volunteeringData.length % 2 === 1 && idx === volunteeringData.length - 1;
                        return (
                            <VolCard
                                key={item.id}
                                item={item}
                                index={idx}
                                onClick={setSelectedItem}
                                className={`md:col-span-2${isLastOdd ? ' md:col-start-2' : ''}`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* VOLUNTEERING MODAL PORTAL */}
            <VolunteeringModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />
        </section>
    );
});

export default Volunteering;
