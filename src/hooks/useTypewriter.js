import { useState, useEffect, useRef } from 'react';

export function useTypewriter(words, typeSpeed = 80, deleteSpeed = 40, delaySpeed = 2000) {
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);

    // Use ref to track the timer to clean up exactly and avoid zombie intervals
    const timerRef = useRef(null);

    useEffect(() => {
        const currentWord = words[wordIndex];

        const timer = setTimeout(() => {
            if (isDeleting) {
                if (text.length > 0) {
                    setText(currentWord.substring(0, text.length - 1));
                } else {
                    setIsDeleting(false);
                    setWordIndex((prev) => (prev + 1) % words.length);
                }
            } else {
                if (text.length < currentWord.length) {
                    setText(currentWord.substring(0, text.length + 1));
                } else {
                    timerRef.current = setTimeout(() => setIsDeleting(true), delaySpeed);
                    return;
                }
            }
        }, isDeleting ? deleteSpeed : typeSpeed);

        timerRef.current = timer;

        return () => clearTimeout(timerRef.current);
    }, [text, isDeleting, wordIndex, words, typeSpeed, deleteSpeed, delaySpeed]);

    return text;
}
