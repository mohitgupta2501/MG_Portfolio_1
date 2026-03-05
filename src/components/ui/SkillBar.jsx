import { useRef, useEffect, useState } from 'react';
import React from 'react';

const SkillBar = React.memo(function SkillBar({ name, value }) {
    const [inView, setInView] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        // Pure DOM IntersectionObserver instead of a continuous framer-motion useInView
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (barRef.current) observer.observe(barRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={barRef} className="mb-2 w-full group">
            <div className="flex justify-between items-center mb-[8px] transition-colors duration-300">
                <span className="text-white text-[14px] font-[700] tracking-wide group-hover:text-[var(--accent)] transition-colors duration-300">{name}</span>
                <span className="text-[var(--accent)] text-[13px] font-[700]">{value}%</span>
            </div>
            <div className="w-full h-[7px] bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-[#ff4d5a] to-[#ff7043] rounded-full shadow-[0_0_12px_rgba(255,77,90,0.4)] transition-all duration-[1400ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:shadow-[0_0_16px_rgba(255,77,90,0.6)]"
                    style={{ width: inView ? `${value}%` : '0%' }}
                />
            </div>
        </div>
    );
});

export default SkillBar;
