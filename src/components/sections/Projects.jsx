import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Factory, FlaskConical, AppWindow } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';
import ShowMoreButton from '@/components/ui/ShowMoreButton';
import StatCard from '@/components/ui/StatCard';
import { useIsMobile } from '@/hooks/useIsMobile';

// Filter Categories
const FILTERS = [
    'All',
    'Industrial',
    'Machine Learning',
    'Healthcare',
    'Generative AI'
];

// Stats Data
const stats = [
    { label: 'Total Projects', value: 8, icon: FolderGit2, color: '#ff4d5a' },
    { label: 'Industry Projects', value: 5, icon: Factory, color: '#3b82f6' },
    { label: 'Research Projects', value: 3, icon: FlaskConical, color: '#ec4899' },
    { label: 'Tech Domains', value: 4, icon: AppWindow, color: '#a855f7' }
];

const Projects = memo(() => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const isMobile = useIsMobile();

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    const displayProjects = useMemo(() => {
        if (isMobile && !isExpanded) {
            return filteredProjects.slice(0, 1);
        }
        return filteredProjects;
    }, [filteredProjects, isMobile, isExpanded]);

    // No distinction between Hero and Standard required; all cards same size and layout
    const isAllView = activeFilter === 'All';

    return (
        <section id="projects" className="relative pt-[80px] pb-[80px] bg-[#080808] overflow-hidden min-h-screen">

            <div id="portfolio" />

            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                {/* Top Right Coral */}
                <div
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full animate-[breathe_18s_ease-in-out_infinite]"
                    style={{ background: 'radial-gradient(circle, rgba(255,77,90,0.04) 0%, transparent 70%)' }}
                />
                {/* Bottom Left Purple */}
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full animate-[breathe_22s_ease-in-out_infinite_reverse]"
                    style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)' }}
                />
                {/* Center Blue */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-[breathe_28s_ease-in-out_infinite]"
                    style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.02) 0%, transparent 70%)' }}
                />
                {/* Dot grid */}
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="max-w-7xl mx-auto px-4 max-[480px]:px-3 min-[481px]:px-6 min-[1025px]:px-8 relative z-10 w-full min-w-0">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center mb-10 relative w-full min-w-0">
                    {/* Background Text */}
                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] max-[480px]:text-[60px] min-[481px]:text-[120px] min-[1025px]:text-[160px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-widest whitespace-nowrap overflow-hidden max-w-full" aria-hidden>
                        Projects
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
                                ● PROJECTS
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                            </span>
                        </div>

                        <h2 className="section-heading text-[#ffffff] text-center font-[800] break-words text-[clamp(24px,5.5vw,66px)] max-[480px]:text-[clamp(22px,5vw,30px)] mb-2" style={{ letterSpacing: '-0.02em' }}>
                            Featured Projects
                        </h2>
                        <div style={{
                            width: '60px',
                            height: '3px',
                            background: 'linear-gradient(90deg, #ff4d5a, #ff6b6b)',
                            borderRadius: '999px',
                            margin: '8px auto 24px auto'
                        }} />

                        <p className="text-[#888888] text-[15px] min-[481px]:text-[16px] max-[480px]:text-[14px] italic text-center max-w-2xl w-full font-light mt-3 min-w-0 break-words px-2">
                            A collection of solutions where creativity meets code and innovation becomes reality.
                        </p>
                    </motion.div>
                </div>

                {/* Stats Row — 4 cards: 2x2 tablet/mobile, single row desktop */}
                <div className="w-full">
                    <div className="grid grid-cols-2 min-[1025px]:grid-cols-4 gap-[16px] max-w-[680px] mx-auto mb-7 items-stretch">
                        {stats.map((stat, i) => (
                            <div key={i} className="h-full">
                                <StatCard icon={stat.icon} num={stat.value.toString() + (stat.suffix || '')} label={stat.label} color={stat.color} />
                            </div>
                        ))}
                    </div>

                    {/* Filter Tabs */}
                    <div className="w-full flex flex-wrap justify-center gap-[10px] mb-5 px-4 min-w-0 max-[480px]:px-2">
                        {FILTERS.map(filter => {
                            const isActive = activeFilter === filter;
                            const count = filter === 'All' ? projects.length : projects.filter(p => p.category === filter).length;

                            return (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`group relative flex items-center px-[18px] py-[8px] rounded-[50px] text-[13px] transition-all ease-in-out duration-300 ${isActive
                                        ? 'bg-[#ff4d5a] text-white font-[700] shadow-[0_8px_24px_rgba(255,77,90,0.45),0_4px_12px_rgba(255,77,90,0.3)] border border-transparent'
                                        : 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#666] font-[500] hover:bg-[rgba(255,77,90,0.07)] hover:border-[rgba(255,77,90,0.3)] hover:text-[#ff4d5a] hover:shadow-[0_4px_16px_rgba(255,77,90,0.1)]'
                                        }`}
                                >
                                    {filter}
                                    <span className={`inline-flex items-center justify-center rounded-[50px] px-[7px] py-[1px] ml-[6px] text-[10px] transition-colors duration-300 ${isActive ? 'bg-[rgba(255,255,255,0.25)] text-white font-[700]' : 'bg-[rgba(255,255,255,0.07)] text-[#555] group-hover:bg-[rgba(255,77,90,0.15)] group-hover:text-[#ff9090]'
                                        }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* HORIZONTAL DIVIDER - NEW */}
                    <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,77,90,0.4),transparent)] mb-7" />
                </div>

                {/* Projects Grid Container */}
                <div className="w-full flex flex-col gap-6 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length > 0 && (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4 }}
                                className={`grid gap-6 sm:gap-8 items-stretch w-full ${filteredProjects.length === 1
                                        ? 'grid-cols-1 max-w-[400px] mx-auto'
                                        : filteredProjects.length === 2
                                            ? 'grid-cols-1 min-[481px]:grid-cols-2 max-w-[860px] mx-auto'
                                            : 'grid-cols-1 min-[481px]:grid-cols-2 min-[1025px]:grid-cols-3'
                                    }`}
                            >
                                <ProjectCard
                                    key={filteredProjects[0].title}
                                    project={filteredProjects[0]}
                                    index={0}
                                    onClick={setSelectedProject}
                                />
                                {isMobile ? (
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 16 }}
                                                className="flex flex-col gap-6 sm:gap-8"
                                            >
                                                {filteredProjects.slice(1).map((project, idx) => (
                                                    <ProjectCard
                                                        key={project.title}
                                                        project={project}
                                                        index={idx + 1}
                                                        onClick={setSelectedProject}
                                                    />
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                ) : (
                                    filteredProjects.slice(1).map((project, idx) => (
                                        <ProjectCard
                                            key={project.title}
                                            project={project}
                                            index={idx + 1}
                                            onClick={setSelectedProject}
                                        />
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isMobile && filteredProjects.length > 1 && (
                        <ShowMoreButton
                            isExpanded={isExpanded}
                            onClick={() => setIsExpanded(!isExpanded)}
                            color="#ff4d5a"
                        />
                    )}

                    {filteredProjects.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-20 text-center text-gray-500 w-full"
                        >
                            No projects found in this category.
                        </motion.div>
                    )}
                </div>

            </div>

            {/* Project Detail Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />

        </section>
    );
});

Projects.displayName = 'Projects';

export default Projects;
