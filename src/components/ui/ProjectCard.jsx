import { memo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';

const ProjectCard = memo(({ project, index, isHero, onClick }) => {
    // Common styles
    const cardClasses = `
    group relative flex flex-col h-full bg-gradient-to-br from-[#111111] to-[#0c0c0c]
    border border-[#1a1a1a] transition-all duration-300
    hover:-translate-y-1.5 cursor-pointer
    ${isHero ? 'rounded-[24px] p-6 sm:p-8' : 'rounded-[20px] p-5 sm:p-6'}
  `;

    // Entrance animation variants
    const variants = isHero
        ? {
            hidden: { x: index % 2 === 0 ? -60 : 60, opacity: 0 },
            visible: {
                x: 0,
                opacity: 1,
                transition: { duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }
            }
        }
        : {
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
            style={{
                '--hover-color': project.color,
                '--hover-shadow': `${project.color}15`,
            }}
            onClick={() => onClick(project)}
        >
            <div
                className={cardClasses}
                style={{
                    boxShadow: 'var(--hover-shadow-full, none)'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = project.color + '66'; // 40%
                    e.currentTarget.style.boxShadow = `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${project.color}15`;
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#1a1a1a';
                    e.currentTarget.style.boxShadow = 'none';
                }}
            >
                {/* Top Gradient Stripe */}
                <div
                    className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
                />

                {/* Decorative Number */}
                <div className="absolute top-4 sm:top-5 right-5 sm:right-6 text-[40px] sm:text-[52px] font-black leading-none pointer-events-none transition-colors duration-500 text-white/[0.03] group-hover:text-[var(--hover-color)] group-hover:opacity-15">
                    {(index + 1).toString().padStart(2, '0')}
                </div>

                {/* Top Badges */}
                <div className="flex flex-wrap gap-2 mb-4 relative z-10 pr-16 max-w-full">
                    <span
                        className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide uppercase"
                        style={{
                            backgroundColor: `${project.color}15`,
                            color: project.color,
                            border: `1px solid ${project.color}30`
                        }}
                    >
                        {project.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium tracking-wide border border-white/10 bg-white/5 text-gray-300">
                        {project.status}
                    </span>
                </div>

                {/* Title & Subtitle */}
                <div className="mb-3">
                    <h3
                        className={`font-bold text-white transition-colors duration-300 group-hover:text-[var(--hover-color)] ${isHero ? 'text-xl sm:text-2xl mb-1.5' : 'text-lg sm:text-lg mb-1'}`}
                    >
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{project.subtitle}</p>
                </div>

                {/* Duration */}
                <div className="flex items-center gap-1.5 text-gray-500 text-[12px] mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.duration}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />

                {/* Key Features (Hero Only) */}
                {isHero && project.keyFeatures && (
                    <div className="mb-4">
                        <h4 className="text-[10px] uppercase tracking-[0.1em] text-gray-500 mb-2 font-semibold">Key Features</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {project.keyFeatures.slice(0, 4).map((feature, i) => (
                                <span
                                    key={i}
                                    className="px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-medium transition-transform group-hover/btn:scale-105"
                                    style={{
                                        backgroundColor: `${project.color}12`,
                                        color: project.color,
                                        border: `1px solid ${project.color}33`,
                                    }}
                                >
                                    {feature}
                                </span>
                            ))}
                            {project.keyFeatures.length > 4 && (
                                <span className="px-2 py-1 rounded-md text-[11px] sm:text-[12px] font-medium text-gray-400 bg-white/5 border border-white/10">
                                    +{project.keyFeatures.length - 4}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Description */}
                <p className={`text-[#888888] text-[13px] sm:text-[14px] leading-[1.6] line-clamp-2 ${isHero ? 'mb-5' : 'mb-4'}`}>
                    {project.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-col gap-2 mb-6 flex-grow">
                    {project.keyHighlights.slice(0, isHero ? 3 : 2).map((highlight, idx) => {
                        const words = highlight.split(' ');
                        const lead = words[0] + ' ';
                        const rest = words.slice(1).join(' ');

                        return (
                            <div key={idx} className="flex items-start gap-2 text-gray-400 text-[12px] sm:text-[13px]">
                                <div
                                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                                    style={{
                                        backgroundColor: project.color,
                                        boxShadow: `0 0 6px ${project.color}80`
                                    }}
                                />
                                <span className="line-clamp-2">
                                    <strong className="text-gray-200 font-medium">{lead}</strong>
                                    {rest}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Pushed to bottom section */}
                <div className="mt-auto">
                    {/* Tech Stack Pills (Standard only views top 4-5) */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tech.slice(0, isHero ? 6 : 4).map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-[#ffffff05] border border-[#ffffff10] text-[#aaaaaa] rounded-md text-[11px] sm:text-[12px] transition-colors"
                                style={{
                                    '--hover-border': project.color + '80',
                                    '--hover-text': project.color,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.borderColor = project.color + '80';
                                    e.currentTarget.style.color = project.color;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.borderColor = '#ffffff10';
                                    e.currentTarget.style.color = '#aaaaaa';
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                        {project.tech.length > (isHero ? 6 : 4) && (
                            <span className="px-2 py-1 bg-[#ffffff05] border border-[#ffffff10] text-[#777] rounded-md text-[11px] sm:text-[12px]">
                                + {project.tech.length - (isHero ? 6 : 4)} more
                            </span>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            className="flex-1 py-2 sm:py-2.5 rounded-xl border flex items-center justify-center gap-2 text-[13px] font-medium transition-all group/btn hover:text-white"
                            style={{
                                borderColor: `${project.color}50`,
                                color: project.color,
                                '--btn-hover-bg': project.color,
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = project.color;
                                e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = project.color;
                            }}
                        >
                            View Details
                            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

            </div>
        </motion.div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
