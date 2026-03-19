import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ShowMoreButton = ({ isExpanded, onClick, color }) => {
    return (
        <div className="flex justify-center mt-8 md:hidden">
            <button
                onClick={onClick}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-bold transition-all duration-300 shadow-lg"
                style={{
                    backgroundColor: `${color}15`,
                    color: color,
                    border: `1px solid ${color}30`,
                }}
            >
                {isExpanded ? 'Show Less' : 'Show More'}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </button>
        </div>
    );
};

export default ShowMoreButton;
