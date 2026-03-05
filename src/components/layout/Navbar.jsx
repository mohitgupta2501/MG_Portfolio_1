import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { navLinks } from '@/data/navLinks';
import { useActiveSection } from '@/hooks/useActiveSection';
import { personalInfo } from '@/data/personalInfo';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const activeSectionId = useActiveSection(['home', 'about', 'experience', 'portfolio', 'skills', 'achievements', 'contact']);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-[#1e1e1e]/90 backdrop-blur-md shadow-lg shadow-black/50 py-4' // Solid dark on scroll
                : 'bg-transparent py-6' // Transparent over hero
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                {/* Logo */}
                <a href="#home" className="text-[22px] font-bold font-sans text-[var(--text-primary)]">
                    {personalInfo.name}
                </a>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((item) => {
                        const isActive = activeSectionId === item.name.toLowerCase() || (activeSectionId === '' && item.href === '#home');

                        return (
                            <div key={item.name} className="relative group">
                                <a
                                    href={item.href}
                                    className={`flex items-center gap-1 text-[14px] font-medium transition-colors py-2 relative overflow-hidden group/link ${isActive ? 'text-[var(--accent)]' : 'text-[var(--text-primary)] hover:text-[var(--accent)]'}`}
                                >
                                    {item.name}
                                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                                    {/* Underline slide-in animation on hover */}
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--accent)] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/link:scale-x-100" />
                                </a>

                                {/* Dropdown Menu */}
                                {item.dropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-[var(--bg-nav-dropdown)] rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border border-[var(--border)] overflow-hidden">
                                        <ul className="py-2">
                                            {item.dropdown.map((dropItem, idx) => (
                                                <li key={dropItem.name}>
                                                    <a
                                                        href={dropItem.href}
                                                        className={`block px-4 py-2 text-[14px] transition-colors ${idx === 0 ? 'text-[var(--accent)]' : 'text-[#ffffff] hover:text-[var(--accent)]'}`}
                                                    >
                                                        {dropItem.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Right CTA */}
                <div className="hidden lg:block ml-4">
                    <a
                        href="#contact"
                        className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-300"
                    >
                        Get Started
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
                        className="fixed inset-0 z-50 lg:hidden bg-[#111111]/95 backdrop-blur-xl flex flex-col justify-center items-center h-screen w-full"
                    >
                        <nav className="flex flex-col gap-6 items-center w-full px-6">
                            {navLinks.map((item, idx) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                                    className="text-[24px] font-medium text-[var(--text-primary)] hover:text-[var(--accent)]"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <motion.a
                                href="#contact"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: navLinks.length * 0.1, duration: 0.4 }}
                                className="mt-6 px-8 py-4 text-center rounded-full bg-[var(--accent)] text-white text-[16px] font-medium"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Get Started
                            </motion.a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
