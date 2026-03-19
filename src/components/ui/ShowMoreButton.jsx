import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ShowMoreButton = ({ isExpanded, onClick, color }) => {
    return (
        <div className="flex justify-center mt-8 md:hidden">
            <button
                onClick={onClick}
                className="flex items-center justify-center gap-[6px] px-6 py-2.5 rounded-full text-[12px] font-[700] uppercase tracking-[2px] transition-all duration-300 shadow-lg"
                style={{
                    backgroundColor: `${color}14`,
                    color: color,
                    border: `1px solid ${color}`,
                }}
            >
                {isExpanded ? 'Show Less' : 'Show More'}
                <ChevronDown 
                    className={`w-[14px] h-[14px] transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                />
            </button>
        </div>
    );
};

export default ShowMoreButton;
