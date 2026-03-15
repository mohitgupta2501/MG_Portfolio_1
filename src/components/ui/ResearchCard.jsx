import React from 'react';
import { GraduationCap, Calendar, ArrowRight, BookOpen, Clock, Building2 } from 'lucide-react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
};

const ResearchCard = ({ research, index, onClick }) => {
    const {
        title, subtitle, institution, duration, published, category, color, type,
        desc, metricLeft, metricRight, isFormula, modelsUsed
    } = research;

    const colorRgb = hexToRgb(color);

    return (
        <div
            className={`group relative w-full h-full bg-[linear-gradient(145deg,#111111,#0c0c0c)] border border-[#1a1a1a] rounded-[20px] p-[18px] sm:p-[24px] flex flex-col overflow-hidden transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer`}
            style={{
                '--card-color': color,
                '--cat-rgb': colorRgb
            }}
            onClick={() => onClick(research)}
        >
            <style dangerouslySetInnerHTML={{
                __html: `
                .group:hover {
                    transform: translateY(-8px) scale(1.015);
                    border-color: rgba(var(--cat-rgb), 0.4);
                    box-shadow: 0 20px 60px rgba(var(--cat-rgb), 0.18);
                }
                .group:hover .accent-bar { background-color: rgba(var(--cat-rgb), 1); }
                .group:hover .shimmer { transform: translateX(100%); }
                .group:hover .role-title { color: var(--card-color); }
                .group:hover .top-stripe { opacity: 1; }
                .group:hover .glow-blob { opacity: 1; }
                .group:hover .bg-index { 
                    color: rgba(var(--cat-rgb), 0.5);
                    text-shadow: 0 0 10px rgba(var(--cat-rgb), 0.3);
                }
                .research-pill {
                    background-color: rgba(var(--cat-rgb), 0.07);
                    border-color: rgba(var(--cat-rgb), 0.18);
                    color: rgba(255, 255, 255, 0.82);
                }
                .research-pill:hover {
                    background-color: rgba(var(--cat-rgb), 0.22);
                    border-color: rgba(var(--cat-rgb), 0.7);
                    color: var(--card-color) !important; 
                    box-shadow: 0 0 8px rgba(var(--cat-rgb), 0.4);
                    transform: translateY(-2px);
                }
                .research-type-pill {
                    background-color: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                    color: #888;
                }
                .view-btn {
                    background-color: transparent;
                    border-color: rgba(var(--cat-rgb), 0.3);
                    color: var(--card-color);
                }
                .view-btn:hover {
                    background-color: var(--card-color);
                    border-color: var(--card-color);
                    color: white;
                    box-shadow: 0 8px 20px rgba(var(--cat-rgb), 0.35);
                }
                `
            }} />

            {/* Top Stripe */}
            <div
                className="top-stripe absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-300 z-10 pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, var(--card-color), transparent)`
                }}
            />

            {/* Glow Blob */}
            <div
                className="glow-blob absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                    background: `radial-gradient(circle at 50% 0%, rgba(var(--cat-rgb), 0.06) 0%, transparent 60%)`
                }}
            />

            {/* Shimmer Effect */}
            <div className="shimmer absolute inset-0 -translate-x-[100%] transition-transform duration-[0.65s] ease-out pointer-events-none z-0 overflow-hidden">
                <div className="w-full h-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.025)_50%,transparent_60%)]" />
            </div>

            {/* Left Accent Bar */}
            <div
                className="accent-bar absolute left-0 top-0 bottom-0 w-[3px] transition-colors duration-300 z-10 pointer-events-none"
                style={{ backgroundColor: `rgba(${colorRgb}, 0.35)` }}
            />

            {/* Number Indicator - Matching Project section */}
            <div className="bg-index absolute top-[16px] right-[20px] text-[rgba(255,255,255,0.03)] font-[900] text-[56px] leading-none pointer-events-none transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] z-0 select-none">
                {String(index + 1).padStart(2, '0')}
            </div>

            {/* ROW 1: Badges */}
            <div className="flex flex-wrap items-center gap-[8px] mb-[10px] relative z-10 w-full">
                <span
                    className="px-[10px] py-[3px] rounded-[50px] text-[10px] font-[700] tracking-[2.5px] uppercase border"
                    style={{
                        backgroundColor: `rgba(${colorRgb}, 0.12)`,
                        borderColor: `rgba(${colorRgb}, 0.3)`,
                        color: color
                    }}
                >
                    {category}
                </span>
                {/* Published and Type badges moved to popup only */}
            </div>

            {/* ROW 3: Title */}
            <h3 className="role-title font-[700] text-white text-[19px] leading-[1.3] mb-[6px] transition-colors duration-300 relative z-10 line-clamp-2 h-[50px] overflow-hidden">
                {title}
            </h3>

            {/* ROW 4: Subtitle */}
            <p className="text-[#888] text-[12px] italic mb-[12px] relative z-10 truncate h-[18px] leading-none">
                {subtitle}
            </p>

            {/* ROW 5: Meta */}
            <div className="flex items-center gap-[12px] mb-[14px] relative z-10 w-full h-[18px]">
                <div className="flex items-center gap-[4px] text-[#666] text-[11px] truncate">
                    {institution.includes("St. Vincent Pallotti") ? (
                        <GraduationCap className="w-3 h-3 shrink-0" />
                    ) : (
                        <Building2 className="w-3 h-3 shrink-0" />
                    )}
                    <span className="truncate">{institution}</span>
                </div>
                <div className="flex items-center gap-[4px] text-[#666] text-[11px] shrink-0">
                    <Clock className="w-3 h-3 shrink-0" />
                    <span>{duration}</span>
                </div>
            </div>

            {/* DIVIDER */}
            <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] mb-[16px] relative z-10 flex-shrink-0 opacity-40" />

            {/* ROW 6: Key Metric */}
            <div className="flex items-center gap-[12px] mb-[16px] relative z-10 w-full h-[40px]">
                <div className="flex-shrink-0">
                    {isFormula ? (
                        <div
                            className="border rounded-[8px] px-[10px] py-[6px] font-mono text-[10px]"
                            style={{
                                backgroundColor: `rgba(${colorRgb}, 0.08)`,
                                borderColor: `rgba(${colorRgb}, 0.2)`,
                                color: color
                            }}
                        >
                            {metricLeft}
                        </div>
                    ) : (
                        <div
                            className="text-[26px] font-[900] leading-none"
                            style={{
                                color: color,
                                textShadow: `0 0 20px rgba(${colorRgb}, 0.4)`
                            }}
                        >
                            {metricLeft}
                        </div>
                    )}
                </div>
                <div className="text-[10px] text-[#555] leading-[1.4] line-clamp-2 overflow-hidden">
                    {metricRight}
                </div>
            </div>

            {/* ROW 7: Description */}
            <div className="mb-[18px] relative z-10 w-full h-[60px] overflow-hidden">
                <p className="text-[#777] text-[13px] leading-[1.5] line-clamp-3">
                    {desc}
                </p>
            </div>

            {/* ROW 8: Models list */}
            <div className="relative z-10 w-full mb-[24px]">
                <div className="text-[#555] text-[9px] uppercase tracking-[2px] mb-[10px] font-[600]">
                    MODELS USED
                </div>
                <div className="flex flex-wrap gap-[6px] min-h-[50px]">
                    {modelsUsed.slice(0, 4).map((model, i) => (
                        <span
                            key={i}
                            className="research-pill px-[10px] py-[3px] border rounded-[6px] text-[11px] transition-all duration-300 cursor-default"
                        >
                            {model}
                        </span>
                    ))}
                    {modelsUsed.length > 4 && (
                        <span className="research-pill px-[10px] py-[3px] border rounded-[6px] text-[11px] transition-all duration-300 cursor-default">
                            +{modelsUsed.length - 4}
                        </span>
                    )}
                </div>
            </div>

            {/* ROW 8: Buttons */}
            <div className="flex items-center gap-[10px] mt-auto relative z-10 w-full">
                <button
                    className="view-btn w-full py-[11px] px-[20px] rounded-[12px] border flex items-center justify-center gap-[8px] text-[13px] font-[600] transition-all duration-300 group/btn"
                    onClick={(e) => { e.stopPropagation(); onClick(research); }}
                >
                    View Details
                    <ArrowRight className="w-[14px] h-[14px] group-hover/btn:translate-x-[3px] transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default React.memo(ResearchCard);
