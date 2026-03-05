import { cn } from "@/utils/helpers";
import * as Icons from 'lucide-react';
import React from 'react';

// Map network names to specific brand colors for the hover state
const brandHoverStyles = {
    Linkedin: "hover:bg-[#0077b5] hover:border-[#0077b5]",
    Github: "hover:bg-[#ffffff] hover:text-[#000000] hover:border-[#ffffff]",
    Twitter: "hover:bg-[#1da1f2] hover:border-[#1da1f2]",
    // Instagram uses a custom gradient via arbitrary value
    Instagram: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent",
};

const SocialIcon = React.memo(function SocialIcon({ network, url, className }) {
    const Icon = Icons[network] || Icons.Circle;
    const hoverStyle = brandHoverStyles[network] || "hover:bg-[var(--accent)] hover:border-[var(--accent)]";

    return (
        <a
            href={url}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${network}`}
            className={cn(
                "w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-[1.15]",
                "bg-[#0f0f0f] text-white border border-[#1e1e1e]",
                hoverStyle,
                className
            )}
        >
            <Icon className="w-[18px] h-[18px]" />
        </a>
    );
});

export default SocialIcon;
