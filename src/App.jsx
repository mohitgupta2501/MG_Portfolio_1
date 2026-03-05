import React, { useEffect, Suspense } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BackToTop from '@/components/layout/BackToTop';

// Lazy loaded route blocks for massive performance gains. Home is statically loaded.
import Home from '@/components/sections/Home';
const About = React.lazy(() => import('@/components/sections/About'));
const Experience = React.lazy(() => import('@/components/sections/Experience'));
const Projects = React.lazy(() => import('@/components/sections/Projects'));
const Contact = React.lazy(() => import('@/components/sections/Contact'));

function App() {
  useEffect(() => {
    // We remove the Lenis smooth scroll entirely per the "Remove any scroll event listeners" logic
    // and instead use html { scroll-behavior: smooth } to handle it natively avoiding RAF loops.
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
          <Suspense fallback={<div className="h-screen w-full" />}>
            <About />
            <Experience />
            <Projects />
            <Contact />
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}

export default App;
