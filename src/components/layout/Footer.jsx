// import React from 'react';
// import { motion } from 'framer-motion';
// import { personalInfo } from '@/data/personalInfo';
// import { ChevronRight, MapPin, Mail, Phone, GraduationCap, ChevronUp, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

// const skills = [
//     "Python", "PyTorch", "TensorFlow", "React.js", "Django",
//     "Flask", "XGBoost", "LightGBM", "CatBoost", "Scikit-learn",
//     "Deep Learning", "Machine Learning", "AutoML", "EEG Analysis",
//     "Computer Vision", "SQL", "MongoDB", "AWS", "Docker", "Git",
//     "REST APIs", "JWT Auth", "RBAC", "Angular", "Power BI",
//     "HuggingFace", "Transformers", "CNN", "LSTM", "GNN"
// ];

// export default function Footer() {
//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };

//     const scrollToContact = (e) => {
//         e.preventDefault();
//         const contactSection = document.getElementById('contact');
//         if (contactSection) {
//             contactSection.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     return (
//         <footer className="w-full bg-[#060606] relative overflow-hidden font-sans border-t-0 mt-20">
//             {/* INLINE CSS FOR UNIQUE ANIMATIONS */}
//             <style>{`
//                 @keyframes marquee-scroll {
//                     0% { transform: translateX(0) }
//                     100% { transform: translateX(-50%) }
//                 }
//                 .animate-marquee-scroll {
//                     animation: marquee-scroll 35s linear infinite;
//                 }
//                 .group:hover .animate-marquee-scroll {
//                     animation-play-state: paused;
//                 }
                
//                 @keyframes status-pulse {
//                     0%, 100% { opacity: 1; transform: scale(1) }
//                     50% { opacity: 0.5; transform: scale(1.4) }
//                 }
//                 .animate-status-pulse {
//                     animation: status-pulse 2s ease-in-out infinite;
//                 }
                
//                 @keyframes heartbeat {
//                     0%, 100% { transform: scale(1) }
//                     50% { transform: scale(1.3) }
//                 }
//                 .animate-heartbeat {
//                     animation: heartbeat 1.5s ease-in-out infinite;
//                 }
                
//                 @keyframes pulse-ring {
//                     0% { box-shadow: 0 0 0 0 rgba(255, 77, 90, 0.4); }
//                     70% { box-shadow: 0 0 0 10px rgba(255, 77, 90, 0); }
//                     100% { box-shadow: 0 0 0 0 rgba(255, 77, 90, 0); }
//                 }
//                 .animate-pulse-ring {
//                     animation: pulse-ring 2s infinite;
//                 }

//                 @keyframes breathe {
//                     0%, 100% { transform: scale(1); opacity: 0.5; }
//                     50% { transform: scale(1.1); opacity: 0.8; }
//                 }
//                 .animate-breathe {
//                     animation: breathe 20s infinite;
//                 }
//                 .animate-breathe-reverse {
//                     animation: breathe 25s infinite reverse;
//                 }
//             `}</style>

//             {/* BACKGROUND SYSTEM */}
//             <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.03)_0%,transparent_70%)] animate-breathe pointer-events-none z-0"></div>
//             <div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.025)_0%,transparent_70%)] animate-breathe-reverse pointer-events-none z-0"></div>
//             <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }}></div>

//             <div className="relative z-10">
//                 {/* ROW 1: TOP DIVIDER */}
//                 <div className="w-full h-px bg-[linear-gradient(to_right,transparent,rgba(255,77,90,0.5),transparent)]" />


//                 {/* ROW 2: MAIN CONTENT */}
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[40px]">
//                     <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 md:gap-4">

//                         {/* LEFT: Brand Block */}
//                         <motion.div
//                             initial={{ x: -40, opacity: 0 }}
//                             whileInView={{ x: 0, opacity: 1 }}
//                             viewport={{ once: true, amount: 0.1 }}
//                             transition={{ duration: 0.8 }}
//                             className="flex flex-col items-center md:items-start text-center md:text-left"
//                         >
//                             <h2 className="text-[22px] font-[800] text-white tracking-tight">
//                                 <span className="text-[#ff4d5a]">M</span>ohit Gupta
//                             </h2>
//                             <p className="text-[#666] text-[13px] mt-[4px]">
//                                 Data Scientist & AI Engineer
//                             </p>
//                         </motion.div>

//                         {/* CENTER: Nav Links */}
//                         <motion.div
//                             initial={{ y: 30, opacity: 0 }}
//                             whileInView={{ y: 0, opacity: 1 }}
//                             viewport={{ once: true, amount: 0.1 }}
//                             transition={{ duration: 0.7, delay: 0.1 }}
//                             className="flex items-center justify-center gap-[24px]"
//                         >
//                             {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item, i) => (
//                                 <a key={i} href={`#${item.toLowerCase()}`} className="text-[#666] text-[13px] transition-colors duration-200 hover:text-[#ff4d5a]">
//                                     {item}
//                                 </a>
//                             ))}
//                         </motion.div>

//                         {/* RIGHT: Social Icons */}
//                         <motion.div
//                             initial={{ x: 40, opacity: 0 }}
//                             whileInView={{ x: 0, opacity: 1 }}
//                             viewport={{ once: true, amount: 0.1 }}
//                             transition={{ duration: 0.8, delay: 0.1 }}
//                             className="flex items-center justify-center md:justify-end gap-[8px]"
//                         >
//                             {[
//                                 { icon: Linkedin, link: personalInfo.socialLinks?.linkedin || "https://linkedin.com/in/mohit-gupta-25-" },
//                                 { icon: Github, link: personalInfo.socialLinks?.github || "https://github.com/mohitgupta2501" },
//                                 { icon: Twitter, link: personalInfo.socialLinks?.twitter || "https://twitter.com/" },
//                                 { icon: Instagram, link: "https://instagram.com/" }
//                             ].map((social, i) => (
//                                 <a key={i} href={social.link} target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] rounded-[8px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#666] transition-all duration-300 hover:bg-[rgba(255,77,90,0.1)] hover:border-[rgba(255,77,90,0.3)] hover:text-[#ff4d5a] hover:-translate-y-[2px]">
//                                     <social.icon size={16} />
//                                 </a>
//                             ))}
//                         </motion.div>

//                     </div>
//                 </div>      {/* ROW 3: MAP + AVAILABILITY STRIP */}
//                 <div className="flex flex-col lg:flex-row gap-5 pb-10 mt-12">
//                     {/* MAP: 60% */}
//                     <motion.div
//                         initial={{ y: 40, opacity: 0 }}
//                         whileInView={{ y: 0, opacity: 1 }}
//                         viewport={{ once: true, amount: 0.1 }}
//                         transition={{ duration: 0.8, delay: 0.2 }}
//                         className="w-full lg:w-[60%] flex flex-col"
//                     >
//                         <div className="flex items-center gap-1.5 text-[#888] text-[13px] mb-2 px-1">
//                             <MapPin size={14} className="text-[#ff4d5a]" />
//                             <span>Nagpur, Maharashtra, India</span>
//                         </div>
//                         <div className="relative w-full h-[160px] lg:h-[200px] rounded-2xl overflow-hidden border border-[#1e1e1e] group/map">
//                             <iframe
//                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d119066.41264368943!2d78.96288339121855!3d21.161085901262967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0a5a31faf13%3A0x19b37d06d0bb3e2b!2sNagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v!5m2!1sen!2sin"
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 0, filter: 'grayscale(100%) invert(90%) contrast(0.8)' }}
//                                 allowFullScreen=""
//                                 loading="lazy"
//                                 referrerPolicy="no-referrer-when-downgrade"
//                                 className="transition-all duration-500 group-hover/map:brightness-110"
//                             ></iframe>
//                             {/* Bottom Fade Gradient */}
//                             <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-gradient-to-t from-[#080808] to-transparent pointer-events-none"></div>
//                             {/* Center Pin Overlay */}
//                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
//                                 <div className="w-3 h-3 bg-[#ff4d5a] rounded-full shadow-[0_0_0_4px_rgba(255,77,90,0.3)] animate-pulse-ring"></div>
//                             </div>
//                         </div>
//                     </motion.div>

//                     {/* AVAILABILITY CARD: 40% */}
//                     <motion.div
//                         initial={{ x: 40, opacity: 0 }}
//                         whileInView={{ x: 0, opacity: 1 }}
//                         viewport={{ once: true, amount: 0.1 }}
//                         transition={{ duration: 0.8, delay: 0.3 }}
//                         className="w-full lg:w-[40%] rounded-2xl border border-[#1e1e1e] p-6 flex flex-col justify-between"
//                         style={{ background: 'linear-gradient(145deg, #111, #0c0c0c)' }}
//                     >
//                         {/* Top */}
//                         <div>
//                             <div className="text-[#ff4d5a] text-[10px] uppercase font-bold tracking-[2px] mb-2">Open to Opportunities</div>
//                             <div className="flex items-center gap-2">
//                                 <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-status-pulse"></span>
//                                 <span className="text-white font-bold text-[18px]">Available Now</span>
//                             </div>
//                         </div>

//                         {/* Middle */}
//                         <div className="flex flex-col gap-2 my-4">
//                             {[
//                                 "Full-time AI/ML Roles",
//                                 "Research Collaborations",
//                                 "Freelance Projects",
//                                 "Open Source Contributions"
//                             ].map((role, i) => (
//                                 <div key={i} className="flex items-center gap-2">
//                                     <span className="text-[#22c55e] font-bold text-[14px]">✓</span>
//                                     <span className="text-[#aaa] text-[13px]">{role}</span>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Bottom */}
//                         <button
//                             onClick={scrollToContact}
//                             className="w-full py-2.5 px-5 rounded-[10px] text-white font-bold text-[13px] bg-gradient-to-br from-[#ff4d5a] to-[#ff7043] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,77,90,0.4)]"
//                         >
//                             Let's Connect &rarr;
//                         </button>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* ROW 3: SKILLS MARQUEE TICKER */}
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ once: true, amount: 0.1 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//                 className="w-full relative overflow-hidden flex bg-[rgba(255,255,255,0.02)] border-t border-b border-[rgba(255,255,255,0.04)] py-[10px] group"
//             >
//                 {/* Fade edges */}
//                 <div className="absolute left-0 top-0 bottom-0 w-[80px] bg-gradient-to-r from-[#060606] to-transparent z-[2] pointer-events-none"></div>
//                 <div className="absolute right-0 top-0 bottom-0 w-[80px] bg-gradient-to-l from-[#060606] to-transparent z-[2] pointer-events-none"></div>

//                 <div className="flex animate-marquee-scroll whitespace-nowrap min-w-max">
//                     {[...skills, ...skills, ...skills].map((skill, index) => {
//                         const isHighlight = (index % 5 === 4);
//                         return (
//                             <div key={index} className="inline-flex items-center gap-[6px] px-[20px]">
//                                 <span className={`text-[13px] ${isHighlight ? 'text-[#ff4d5a]/70 font-medium' : 'text-[#444]'}`}>
//                                     {skill}
//                                 </span>
//                                 <span className="text-[#ff4d5a]/[0.3] text-[8px] ml-[14px]">◆</span>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </motion.div>

//             {/* ROW 4: BOTTOM BAR */}
//             <div className="bg-[#080808] w-full">
//                 <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     whileInView={{ y: 0, opacity: 1 }}
//                     viewport={{ once: true, amount: 0.1 }}
//                     transition={{ duration: 0.6, delay: 0.5 }}
//                     className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[16px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0"
//                 >
//                     {/* LEFT */}
//                     <div className="text-[#444] text-[12px]">
//                         &copy; 2026 Mohit Gupta. All rights reserved.
//                     </div>

//                     {/* CENTER */}
//                     <div className="text-[#444] text-[12px] flex items-center gap-1">
//                         · Designed & Built with <span className="text-[#ff4d5a] inline-block hover:animate-heartbeat px-0.5">❤️</span> by Mohit Gupta ·
//                     </div>

//                     <div className="text-[#444] text-[12px]">
//                         Last updated: March 2026
//                     </div>
//                 </motion.div>
//             </div>
//         </footer>
//     );
// }
