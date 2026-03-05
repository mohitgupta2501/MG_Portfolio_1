import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) return;

        let startTimestamp = null;
        let animationFrameId;

        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeProgress * end));

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            }
        };

        animationFrameId = requestAnimationFrame(step);

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [end, duration, isInView]);

    return { count, ref };
}

export default function StatCard({ label, value, hasPlus, variant = "card" }) {
    const numericValue = parseInt((value || '0').toString().replace(/\D/g, ''), 10);
    const { count, ref } = useCountUp(numericValue, 2000);

    if (variant === "transparent") {
        return (
            <div ref={ref} className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <p className="text-[clamp(32px,4vw,48px)] font-bold text-[var(--accent)] leading-none mb-1">
                    {count}{hasPlus && "+"}
                </p>
                <p className="text-[#aaaaaa] text-[10px] sm:text-xs uppercase tracking-wider font-medium">
                    {label}
                </p>
            </div>
        );
    }

    return (
        <div ref={ref} className="bg-[#0f0f0f] border border-[#1e1e1e] rounded-[12px] p-3 text-center transition-all duration-300 ease-out hover:border-[rgba(255,77,90,0.5)] hover:-translate-y-[3px] hover:scale-[1.02] hover:shadow-[0_8px_24px_rgba(255,77,90,0.1)]">
            <p className="text-[clamp(22px,3vw,28px)] font-bold text-[var(--accent)] leading-none mb-1">
                {count}{hasPlus && "+"}
            </p>
            <p className="text-[#555555] text-[9px] uppercase tracking-[1.5px] font-semibold">
                {label}
            </p>
        </div>
    );
}
