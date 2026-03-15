import React from 'react';
import { motion } from 'framer-motion';
import { Download, Send } from 'lucide-react';
import mohitImage from '@/assets/images/Mohit.jpg';

const About = React.memo(function About() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const leftColumnVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    const rightColumnVariants = {
        hidden: { opacity: 0, x: 40 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="about" className="pt-[80px] pb-[80px] relative overflow-hidden bg-transparent">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ef4444]/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ef4444]/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    className="flex flex-col items-center justify-center text-center mb-10"
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center justify-center mb-6">
                        <span className="bg-[rgba(255,77,90,0.1)] border border-[rgba(255,77,90,0.3)] text-[#ff4d5a] tracking-[4px] text-[11px] font-medium uppercase rounded-[50px] px-[22px] py-[7px] relative">
                            ● ABOUT ME
                            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[2px] bg-[#ff4d5a] rounded-[2px]" />
                        </span>
                    </div>
                    <h2 className="text-[#ffffff] font-[800] text-[clamp(42px,5.5vw,66px)] leading-tight mb-4 font-display">
                        About Me
                    </h2>
                    <p className="max-w-[580px] text-[#888888] text-[16px] italic">
                        Turning ideas into intelligent systems and problems into powerful digital solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[48px] items-center">

                    {/* Left Column: Photo Area */}
                    <motion.div
                        variants={leftColumnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative flex flex-col items-center order-1 lg:order-1"
                    >
                        {/* Decorative Pattern Background */}
                        <div className="absolute -z-10 w-full h-full max-w-[400px] max-h-[500px] opacity-[0.03]"
                            style={{ backgroundImage: 'radial-gradient(#ef4444 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        {/* Photo Wrapper */}
                        <div className="relative group inline-flex flex-col">
                            <div className="relative z-10 w-full max-w-[420px]">
                                <div className="w-full max-h-[480px] overflow-hidden border-2 border-[#ef4444]/30 shadow-[0_0_60px_rgba(239,68,68,0.15)] transition-shadow duration-500 group-hover:shadow-[0_0_80px_rgba(239,68,68,0.25)] bg-[#0a0a0a] rounded-[12px]">
                                    <img
                                        src={mohitImage}
                                        alt="Mohit Gupta"
                                        className="w-full max-h-[480px] object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = mohitImage;
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mt-8 w-full">
                            <a
                                href="/CV/Mohit_Gupta_CV.pdf"
                                download="Mohit_Gupta_CV.pdf"
                                className="px-6 py-2.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-[14px] font-medium transition-colors duration-300 shadow-lg shadow-[var(--accent)]/20 inline-flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download CV
                            </a>
                            <a
                                href="#contact"
                                className="px-6 py-2.5 bg-transparent border border-[#ef4444] text-[#ef4444] rounded-full font-bold hover:bg-[#ef4444] hover:text-white hover:-translate-y-1 transition-all duration-300 active:scale-95"
                            >
                                Let's Connect
                            </a>
                        </motion.div>

                    </motion.div>

                    {/* Right Column: Content Area */}
                    <motion.div
                        variants={rightColumnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="flex flex-col items-start text-left order-2 lg:order-2"
                    >
                        <motion.div variants={containerVariants} className="flex flex-col items-start w-full">
                            <motion.p variants={itemVariants} className="max-w-[580px] text-[#9ca3af] text-base md:text-lg leading-[1.8] mb-4">
                                Crafting Intelligence, <span className="text-white">Building </span>
                                <span className="text-[#ef4444]">Impact.</span>
                            </motion.p>

                            {/* Paragraph */}
                            <motion.div variants={itemVariants} className="group mb-4">
                                <p className="text-[#9ca3af] text-base md:text-lg leading-[1.8] max-w-xl group-hover:text-[#e2e8f0] transition-colors duration-300">
                                    Data Science & AI Engineering student with a 9.6/10 CGPA, passionate about
                                    transforming complex problems into intelligent, real-world solutions. From
                                    AI-driven healthcare research to building an AutoML platform at Hitachi India —
                                    I build things that matter.
                                </p>
                                <p className="text-[#9ca3af] text-base md:text-lg leading-[1.8] max-w-xl group-hover:text-[#e2e8f0] transition-colors duration-300 mt-[14px]">
                                    Founder & CEO of Eagle Wears, four-time Gold Medalist in Shot Put & Discus
                                    Throw, and Nagpur University state-level representative — I bring the same
                                    discipline and competitive spirit from athletics into engineering.
                                </p>
                            </motion.div>

                            {/* Animated Quote */}
                            <motion.div
                                variants={itemVariants}
                                className="mb-8 pl-5 pr-4 py-3 border-l-[3px] border-[#ef4444] bg-[#ef4444]/5 rounded-r-lg italic text-[#9ca3af] text-[15px] leading-relaxed"
                            >
                                "The best way to predict the future is to build it."
                            </motion.div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
});

export default About;
