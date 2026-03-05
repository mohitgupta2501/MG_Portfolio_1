import { useState, useMemo, memo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Building2, GraduationCap, Layers } from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ui/ProjectCard';
import ProjectModal from '@/components/ui/ProjectModal';

// Filter Categories
const FILTERS = [
    'All',
    'Industrial AI',
    'Healthcare AI',
    'Full-Stack',
    'Machine Learning',
    'Generative AI',
    'IoT'
];

// Stats Data
const stats = [
    { label: 'Total Projects', value: 9, icon: FolderGit2, color: '#ff4d5a' },
    { label: 'Industry Projects', value: 4, icon: Building2, color: '#f59e0b' },
    { label: 'Research Papers', value: 3, icon: GraduationCap, color: '#ec4899' },
    { label: 'Tech Domains', value: 5, icon: Layers, color: '#3b82f6', suffix: '+' }
];

// Stat Counter Hook (simple version)
function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasStarted) {
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
            // easeOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(ease * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                setCount(end);
            }
        };
        window.requestAnimationFrame(step);
    }, [hasStarted, end, duration]);

    return { count, ref };
}

// Stat Card Component
const StatCard = memo(({ stat }) => {
    const { count, ref } = useCountUp(stat.value);

    return (
        <div
            ref={ref}
            className="flex flex-col items-center justify-center p-5 sm:p-6 bg-[#111111] border border-[#1a1a1a] rounded-2xl transition-transform duration-300 hover:-translate-y-1.5 hover:border-[var(--hover-color)]"
            style={{ '--hover-color': stat.color }}
        >
            <stat.icon className="w-6 h-6 mb-3" style={{ color: stat.color }} />
            <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: stat.color }}>
                {count}{stat.suffix}
            </div>
            <div className="text-gray-400 text-xs sm:text-sm uppercase tracking-wider font-medium text-center">
                {stat.label}
            </div>
        </div>
    );
});

StatCard.displayName = 'StatCard';

const Projects = memo(() => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    // Filter projects
    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All') return projects;
        return projects.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    // Separate Hero and Standard projects logically based on exact required IDs for top 2 (RAS and Unified Gateway)
    // Usually, we can just take the first 2 of the filtered list, but design requests RAS and Unified Gateway
    // are top 2. So we can say: first 2 of 'All' are hero, rest are standard. If filtered, just grid them all or keep logic if they are top.
    // We'll treat the first 2 of the filtered list as Hero if we are in 'All' view to maintain layout,
    // or apply Hero styling to top 2 regardless of filter.
    const isAllView = activeFilter === 'All';
    const heroProjects = isAllView ? filteredProjects.slice(0, 2) : [];
    const standardProjects = isAllView ? filteredProjects.slice(2) : filteredProjects;

    return (
        <section id="portfolio" className="relative py-24 sm:py-32 bg-[#080808] overflow-hidden min-h-screen">

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

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">

                {/* Section Header */}
                <div className="flex flex-col items-center justify-center mb-16 relative">
                    {/* Background Text */}
                    <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[80px] sm:text-[120px] md:text-[160px] font-black text-white/[0.015] pointer-events-none select-none uppercase tracking-widest whitespace-nowrap">
                        Projects
                    </h2>

                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col items-center"
                    >
                        {/* Pill Badge */}
                        <div className="px-[22px] py-[7px] rounded-full border mb-6 inline-flex"
                            style={{
                                background: 'linear-gradient(135deg, #1e0a0d, #2a1215)',
                                borderColor: 'rgba(255,77,90,0.3)',
                                color: '#ff4d5a',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                fontSize: '12px',
                                fontWeight: 600
                            }}>
                            Projects
                        </div>

                        <h2 className="text-white text-center font-extralight mb-6" style={{ fontSize: 'clamp(36px, 5.5vw, 66px)', letterSpacing: '-0.02em' }}>
                            Featured Projects
                        </h2>

                        {/* Animated Underline */}
                        <motion.div
                            className="h-[2px] bg-[#ff4d5a] mb-8"
                            initial={{ width: 0 }}
                            whileInView={{ width: '40px' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        />

                        <p className="text-[#888888] text-[15px] sm:text-[16px] italic text-center max-w-2xl font-light">
                            "Real-world systems, research publications, and AI solutions — built with passion and precision"
                        </p>
                    </motion.div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-[800px] mx-auto mb-20">
                    {stats.map((stat, i) => (
                        <StatCard key={i} stat={stat} />
                    ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 overflow-x-auto pb-4 scrollbar-hide w-full max-w-5xl mx-auto">
                    {FILTERS.map(filter => {
                        const isActive = activeFilter === filter;
                        const count = filter === 'All' ? projects.length : projects.filter(p => p.category === filter).length;

                        return (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`
                        relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 shrink-0
                        ${isActive
                                        ? 'text-white shadow-[0_0_20px_rgba(255,77,90,0.3)] bg-gradient-to-r from-[#ff4d5a] to-[#d93846]'
                                        : 'text-gray-400 bg-[#111111] hover:bg-[#1a1a1a] hover:text-gray-200 border border-white/5 hover:border-white/10'
                                    }
                     `}
                            >
                                {filter}
                                <span className={`
                        px-2 py-0.5 rounded-full text-[11px] font-bold
                        ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'}
                     `}>
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Projects Grid Container */}
                <div className="w-full flex flex-col gap-6 sm:gap-8">
                    <AnimatePresence mode="popLayout">
                        {/* Hero Row (only show in 'All' view to match exact design requirements) */}
                        {heroProjects.length > 0 && (
                            <motion.div
                                key="hero-grid"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 min-h-[420px]"
                            >
                                {heroProjects.map((project, idx) => (
                                    <ProjectCard
                                        key={project.title}
                                        project={project}
                                        index={idx}
                                        isHero={true}
                                        onClick={setSelectedProject}
                                    />
                                ))}
                            </motion.div>
                        )}

                        {/* Standard Grid */}
                        {standardProjects.length > 0 && (
                            <motion.div
                                key={`std-grid-${activeFilter}`}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.4 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 lg:mt-0"
                            >
                                {standardProjects.map((project, idx) => (
                                    <ProjectCard
                                        key={project.title}
                                        project={project}
                                        // Offset the index for Animation delays
                                        index={heroProjects.length + idx}
                                        isHero={false}
                                        onClick={setSelectedProject}
                                    />
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>

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
