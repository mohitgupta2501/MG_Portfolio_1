import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the current viewport is mobile (<= 768px).
 * @returns {boolean} True if the viewport width is 768px or less.
 */
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Initial check
        checkMobile();
        
        // Listen for resize events
        window.addEventListener('resize', checkMobile);
        
        // Cleanup event listener on unmount
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};
