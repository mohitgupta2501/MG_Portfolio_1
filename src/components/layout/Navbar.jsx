import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, FolderOpen, FlaskConical, GraduationCap, Code2, Award, Trophy, Medal, Users, Images } from 'lucide-react';
import { navLinks } from '@/data/navLinks';
import { useActiveSection } from '@/hooks/useActiveSection';
import { personalInfo } from '@/data/personalInfo';

const iconMap = {
    FolderOpen: FolderOpen,
    FlaskConical: FlaskConical,
    GraduationCap: GraduationCap,
    Code2: Code2,
    Award: Award,
    Trophy: Trophy,
    Medal: Medal,
    Users: Users,
    Images: Images
};

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

    // Track all possible section IDs
    const activeSectionId = useActiveSection([
        'home', 'about', 'experience', 'portfolio', 'projects', 'research', 'education',
        'skills', 'certifications', 'achievements', 'awards', 'leadership', 'gallery', 'contact'
    ]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileDropdown = (name) => {
        setOpenMobileDropdown(openMobileDropdown === name ? null : name);
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#1e1e1e]/90 backdrop-blur-md shadow-lg shadow-black/50 py-4'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

                {/* Logo */}
                <a href="#home" className="text-[22px] font-bold font-sans text-white tracking-wide">
                    <span style={{ color: '#ef4444' }}>&lt;/&gt;</span>
                    {' '}
                    {personalInfo.name}
                </a>

                {/* Desktop Nav + Right CTA (Right aligned) */}
                <div className="hidden lg:flex items-center gap-8 ml-auto">
                    <nav className="flex items-center gap-8">
                        {navLinks.map((item) => {
                            const isDropdownActive = item.dropdown && item.dropdown.some(dropItem => activeSectionId === dropItem.href.slice(1));
                            const isActive = activeSectionId === item.name.toLowerCase() || (activeSectionId === '' && item.href === '#home') || isDropdownActive;

                            return (
                                <div key={item.name} className="relative group">
                                    <a
                                        href={item.dropdown ? undefined : item.href}
                                        className={`flex items-center gap-1.5 text-[14px] font-medium transition-colors py-2 relative overflow-hidden group/link ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer'}`}
                                    >
                                        {item.name}
                                        {item.dropdown && (
                                            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isDropdownActive ? "rotate-180" : "group-hover:rotate-180"}`} />
                                        )}
                                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                                    </a>

                                    {/* Desktop Dropdown Menu */}
                                    {item.dropdown && (
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                            <motion.div
                                                initial={{ opacity: 0, y: -8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="min-w-[220px] rounded-[16px] p-2 overflow-hidden"
                                                style={{
                                                    background: 'linear-gradient(145deg, #111111, #0d0d0d)',
                                                    border: '1px solid rgba(255,77,90,0.15)',
                                                    boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
                                                    backdropFilter: 'blur(12px)'
                                                }}
                                            >
                                                <ul className="flex flex-col gap-1">
                                                    {item.dropdown.map((dropItem, idx) => {
                                                        const IconComponent = iconMap[dropItem.icon];
                                                        const isChildActive = activeSectionId === dropItem.href.slice(1);

                                                        // Insert divider for Achievements (example logic: before Gallery)
                                                        const showDivider = item.name === 'Achievements' && dropItem.name === 'Gallery';

                                                        return (
                                                            <li key={dropItem.name} className="w-full flex-col flex">
                                                                {showDivider && <div className="h-[1px] bg-white/5 mx-2 my-1" />}
                                                                <a
                                                                    href={dropItem.href}
                                                                    className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] text-[14px] transition-all duration-200 group/dropitem ${isChildActive
                                                                        ? 'text-[var(--accent)] bg-[rgba(255,77,90,0.06)]'
                                                                        : 'text-[#888] hover:text-white hover:bg-[rgba(255,77,90,0.08)] hover:translate-x-1'
                                                                        }`}
                                                                >
                                                                    {IconComponent && (
                                                                        <IconComponent className={`w-4 h-4 transition-colors ${isChildActive ? 'text-[var(--accent)]' : 'group-hover/dropitem:text-[var(--accent)]'}`} />
                                                                    )}
                                                                    {dropItem.name}
                                                                </a>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </motion.div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </nav>

                    <a
                        href="/CV/Mohit_Gupta_CV.pdf"
                        download="Mohit_Gupta_CV.pdf"
                        className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-300 shadow-lg shadow-[var(--accent)]/20"
                    >
                        Download CV
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors z-[60]"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X className="w-6 h-6 relative z-[60]" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 lg:hidden bg-[#111111]/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen w-full overflow-y-auto pt-20 pb-10"
                    >
                        <nav className="flex flex-col gap-2 items-center w-full px-6 max-w-md">
                            {navLinks.map((item, idx) => {
                                const hasDropdown = !!item.dropdown;
                                const isOpen = openMobileDropdown === item.name;

                                return (
                                    <div key={item.name} className="w-full flex flex-col items-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05, duration: 0.3 }}
                                            className="w-full"
                                        >
                                            {hasDropdown ? (
                                                <button
                                                    onClick={() => toggleMobileDropdown(item.name)}
                                                    className="w-full flex items-center justify-center gap-2 py-4 text-[22px] font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                                                >
                                                    {item.name}
                                                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                                </button>
                                            ) : (
                                                <a
                                                    href={item.href}
                                                    className="block w-full text-center py-4 text-[22px] font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {item.name}
                                                </a>
                                            )}
                                        </motion.div>

                                        {/* Mobile Accordion Content */}
                                        <AnimatePresence>
                                            {hasDropdown && isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="w-full overflow-hidden flex flex-col items-center bg-white/5 rounded-2xl"
                                                >
                                                    {item.dropdown.map((dropItem) => {
                                                        const IconComponent = iconMap[dropItem.icon];
                                                        return (
                                                            <a
                                                                key={dropItem.name}
                                                                href={dropItem.href}
                                                                className="flex items-center justify-center gap-3 w-full py-3 text-[16px] text-[#aaa] hover:text-[var(--accent)] transition-colors"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {IconComponent && <IconComponent className="w-4 h-4" />}
                                                                {dropItem.name}
                                                            </a>
                                                        );
                                                    })}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                            <motion.a
                                href="/CV/Mohit_Gupta_CV.pdf"
                        download="Mohit_Gupta_CV.pdf"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.05 + 0.1, duration: 0.3 }}
                                className="mt-8 px-8 py-3.5 text-center rounded-full bg-[var(--accent)] text-white text-[16px] font-medium w-full max-w-[200px]"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Download CV
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
