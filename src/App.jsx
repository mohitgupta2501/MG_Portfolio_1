import React, { useEffect, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from '@/components/layout/Navbar';
// import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';

// Lazy loaded route blocks for massive performance gains. Home is statically loaded.
import Home from '@/components/sections/Home';
const About = React.lazy(() => import('@/components/sections/About'));
const Experience = React.lazy(() => import('@/components/sections/Experience'));
const Projects = React.lazy(() => import('@/components/sections/Projects'));
const Research = React.lazy(() => import('@/components/sections/Research'));
const Education = React.lazy(() => import('@/components/sections/Education'));
const Skills = React.lazy(() => import('@/components/sections/Skills'));
const Certifications = React.lazy(() => import('@/components/sections/Certifications'));
const Awards = React.lazy(() => import('@/components/sections/Awards'));
const Leadership = React.lazy(() => import('@/components/sections/Leadership'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));

const SectionDivider = () => (
  <div className="w-full h-[1px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)]" />
);

function App() {
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    });

    const sectionTitles = {
      home: 'Mohit',
      about: 'About | Mohit',
      experience: 'Experience | Mohit',
      projects: 'Projects | Mohit',
      research: 'Research & Publications | Mohit',
      education: 'Education | Mohit',
      skills: 'Technical Skills | Mohit',
      certifications: 'Certifications | Mohit',
      awards: 'Awards & Honors | Mohit',
      leadership: 'Leadership & Activities | Mohit',
      gallery: 'Gallery | Mohit',
      contact: 'Contact | Mohit',
    };

    document.title = 'Mohit';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.title = sectionTitles[entry.target.id] || 'Mohit';
          }
        });
      },
      { threshold: 0.15, rootMargin: '-10% 0px -10% 0px' }
    );

    const observedIds = new Set();
    let retryTimerId;

    const observeSections = () => {
      let allFound = true;

      Object.keys(sectionTitles).forEach((id) => {
        if (observedIds.has(id)) return;

        const el = document.getElementById(id);
        if (el) {
          observer.observe(el);
          observedIds.add(id);
        } else {
          allFound = false;
        }
      });

      if (!allFound) {
        retryTimerId = window.setTimeout(observeSections, 300);
      }
    };

    observeSections();

    return () => {
      if (retryTimerId) window.clearTimeout(retryTimerId);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen relative font-sans selection:bg-[var(--accent)]/30 bg-[#080808]">
      {/* Global Background System */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.06)_0%,transparent_70%)] animate-[orb-drift-1_20s_ease-in-out_infinite] will-change-transform" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)] animate-[orb-drift-2_25s_ease-in-out_infinite] will-change-transform" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,77,90,0.03)_0%,transparent_70%)] animate-[orb-drift-1_30s_ease-in-out_infinite_reverse] will-change-transform" />
      </div>

      {/* Static Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[1] bg-grid-pattern" />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[2] global-bg-noise" />

      {/* Main UI */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Home />
          <SectionDivider />
          <Suspense fallback={<div className="h-screen w-full" />}>
            <About />
            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Research />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Certifications />
            <SectionDivider />
            <Awards />
            <SectionDivider />
            <Leadership />
            <SectionDivider />
            <Contact />
          </Suspense>
        </main>
        {/* <Footer /> */}
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
