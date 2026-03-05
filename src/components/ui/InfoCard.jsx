import * as Icons from 'lucide-react';
import React from 'react';

const InfoCard = React.memo(function InfoCard({ label, value, iconName }) {
    const Icon = Icons[iconName] || Icons.Circle;

    return (
        <div className="relative overflow-hidden bg-[linear-gradient(145deg,#111,#0d0d0d)] border border-[#1a1a1a] p-[18px_20px] rounded-[16px] grid grid-cols-[40px_1fr] gap-3 items-center transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-[rgba(255,77,90,0.4)] hover:-translate-y-[4px] hover:scale-[1.01] hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] group">

            {/* Light sweep/shimmer on hover */}
            <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.03)_50%,transparent_60%)] -translate-x-full transition-transform duration-[600ms] ease-out group-hover:translate-x-full pointer-events-none" />

            <div className="w-[40px] h-[40px] flex items-center justify-center shrink-0 bg-[rgba(255,77,90,0.07)] rounded-[10px] transition-all duration-[350ms] group-hover:bg-[rgba(255,77,90,0.15)] group-hover:scale-[1.1] group-hover:rotate-[8deg]">
                <Icon className="w-[18px] h-[18px] text-[var(--accent)]" />
            </div>

            <div className="relative z-10 flex flex-col justify-center">
                <p className="text-[#555] text-[10px] uppercase font-semibold tracking-[2px] mb-0.5">
                    {label}
                </p>
                <p className="text-white text-[14px] font-[600] leading-[1.2] break-all sm:break-normal">
                    {value}
                </p>
            </div>

        </div>
    );
});

export default InfoCard;
