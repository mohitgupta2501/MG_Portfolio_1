import { memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Building2, GraduationCap } from 'lucide-react';

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
};

const ProjectCard = memo(({ project, index, onClick }) => {
    const cardColorRgb = hexToRgb(project.color) || '255,255,255';

    // Entrance animation variants
    const variants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <motion.div
            variants={variants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="h-full"
            onClick={() => onClick(project)}
        >
            <div
                className="group relative w-full h-full min-w-0 bg-[linear-gradient(145deg,#111111,#0c0c0c)] border border-[#1a1a1a] rounded-[20px] p-[18px] max-[480px]:p-4 min-[481px]:p-[24px] flex flex-col overflow-hidden transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer"
                style={{
                    '--card-color': project.color,
                    '--cat-rgb': cardColorRgb
                }}
            >
                {/* Advanced Hover Styles & Pure CSS Interactions for Card and Button */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .group:hover {
                        transform: translateY(-8px) scale(1.015);
                        border-color: rgba(var(--cat-rgb), 0.5);
                        box-shadow: 0 28px 70px rgba(0,0,0,0.55), 0 12px 30px rgba(0,0,0,0.35), 0 0 0 1px rgba(var(--cat-rgb), 0.12), 0 0 50px rgba(var(--cat-rgb), 0.08);
                    }
                    .group:hover .accent-bar { opacity: 1; }
                    .group:hover .shimmer { transform: translateX(100%); }
                    .group:hover .role-title { color: var(--card-color); }
                    .group:hover .top-stripe { opacity: 1; }
                    .group:hover .bg-index { 
                        color: var(--card-color);
                        text-shadow: 0 0 30px rgba(var(--cat-rgb), 0.6), 0 0 60px rgba(var(--cat-rgb), 0.25);
                        transform: scale(1.08) translateY(-4px);
                        opacity: 0.15;
                    }
                    .skill-pill {
                        background-color: rgba(var(--cat-rgb), 0.10);
                        border-color: rgba(var(--cat-rgb), 0.3);
                        color: rgba(var(--cat-rgb), 0.8);
                    }
                    .skill-pill:hover { 
                        background-color: rgba(var(--cat-rgb), 0.22);
                        border-color: rgba(var(--cat-rgb), 0.7);
                        color: var(--card-color) !important; 
                        box-shadow: 0 0 8px rgba(var(--cat-rgb), 0.4);
                    }
                    .view-btn {
                        background-color: transparent;
                        border-color: rgba(var(--cat-rgb), 0.35);
                        color: var(--card-color);
                    }
                    .view-btn:hover {
                        background-color: var(--card-color);
                        border-color: var(--card-color);
                        color: white;
                        transform: translateY(-1px);
                        box-shadow: 0 8px 24px rgba(var(--cat-rgb), 0.35);
                    }
                    .view-btn:active {
                        transform: scale(0.98);
                        box-shadow: 0 4px 12px rgba(var(--cat-rgb), 0.2);
                    }
                `}} />

                {/* Top Stripe */}
                <div
                    className="top-stripe absolute top-0 left-0 right-0 h-[2px] opacity-0 transition-opacity duration-[0.35s] pointer-events-none z-10"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, var(--card-color) 30%, var(--card-color) 50%, var(--card-color) 70%, transparent 100%)`,
                        boxShadow: `0 0 10px var(--card-color)`
                    }}
                />

                {/* Number Indicator - Moved to Top Right and Glows */}
                <div className="bg-index absolute top-[16px] right-[20px] text-[rgba(255,255,255,0.03)] font-[900] text-[56px] leading-none pointer-events-none transition-all duration-[0.4s] ease-[cubic-bezier(0.4,0,0.2,1)] z-0 select-none">
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Shimmer Effect */}
                <div className="shimmer absolute inset-0 -translate-x-[100%] transition-transform duration-[0.65s] ease-out pointer-events-none z-0 overflow-hidden">
                    <div className="w-full h-full bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.025)_50%,transparent_60%)]" />
                </div>

                {/* Left Accent Bar */}
                <div
                    className="accent-bar absolute left-0 top-[15%] bottom-[15%] w-[3px] rounded-[0_3px_3px_0] opacity-20 transition-opacity duration-[0.35s] ease-out z-10"
                    style={{ background: `linear-gradient(to bottom, transparent, var(--card-color), transparent)` }}
                />

                {/* Top Badges */}
                <div className="flex flex-row justify-between items-center gap-2 pr-[80px] mb-4 relative z-10 w-full h-[28px]">
                    <div className="flex flex-wrap items-center gap-[6px]">
                        <span
                            className="inline-flex items-center px-[12px] py-[4px] rounded-[50px] text-[10px] uppercase tracking-[2.5px] font-[700] border"
                            style={{
                                backgroundColor: `${project.color}15`,
                                color: project.color,
                                border: `1px solid ${project.color}30`
                            }}
                        >
                            {project.category}
                        </span>
                    </div>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-3 relative z-10 flex flex-col gap-1 min-w-0">
                    <h3 className="role-title font-bold text-white text-[17px] max-[480px]:text-[15px] min-[481px]:text-[19px] leading-[22px] transition-colors duration-300 pr-[50px] h-[44px] break-words" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.title}
                    </h3>
                    <p className="text-[#aaaaaa] text-[13px] max-[480px]:text-[12px] truncate h-[20px] leading-[20px] min-w-0">{project.subtitle}</p>
                </div>

                {/* Company & Duration */}
                <div className="flex items-center gap-[6px] sm:gap-[8px] mt-[4px] overflow-hidden relative z-10 h-[20px]">
                    <div className="flex items-center gap-[4px] min-w-0 text-[#666666] text-[12px]">
                        {project.company.includes("St. Vincent Pallotti") ? (
                            <GraduationCap className="w-[14px] h-[14px] shrink-0 text-[#777]" />
                        ) : (
                            <Building2 className="w-[14px] h-[14px] shrink-0 text-[#777]" />
                        )}
                        <span className="company-name text-[13px] font-[500] text-[#bbb] transition-colors duration-300 truncate leading-none">{project.company}</span>
                    </div>
                    <span className="text-[#444] text-[12px] shrink-0 hidden sm:block">•</span>
                    <div className="flex items-center gap-[4px] text-[#777] shrink-0 ml-auto sm:ml-0">
                        <Calendar className="w-[12px] h-[12px] shrink-0 hidden sm:block" />
                        <span className="text-[11px] sm:text-[12px] whitespace-nowrap">{project.duration}</span>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)] my-[12px] relative z-10 opacity-40" />

                {/* Description */}
                <div className="relative z-10 mb-2 mt-1 min-h-[64px] min-w-0">
                    <p className="text-[#888888] text-[13px] max-[480px]:text-[12px] leading-[1.6] line-clamp-3 break-words" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.description}
                    </p>
                </div>

                {/* Pushed to bottom section */}
                <div className="mt-auto">
                    {/* Tech Stack Pills (Limited to 3) */}
                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[26px]">
                        {project.tech.slice(0, 3).map((skill, index) => (
                            <span
                                key={index}
                                className="skill-pill px-[10px] py-[3px] border rounded-full text-[11px] sm:text-[12px] transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                        {project.tech.length > 3 && (
                            <span className="skill-pill px-[10px] py-[3px] border rounded-full text-[11px] sm:text-[12px] transition-all duration-300 cursor-default">
                                + {project.tech.length - 3} more
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 relative z-10">
                        <button
                            className="view-btn w-full mt-auto py-[11px] px-[20px] rounded-[12px] border flex items-center justify-center gap-[8px] text-[13px] max-[480px]:text-[12px] font-[600] tracking-[0.3px] transition-all duration-[0.3s] ease-[cubic-bezier(0.4,0,0.2,1)] group/btn relative z-20"
                            onClick={(e) => { e.stopPropagation(); onClick(project); }}
                        >
                            View Details
                            <ArrowRight className="w-[14px] h-[14px] group-hover/btn:translate-x-[3px] transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
