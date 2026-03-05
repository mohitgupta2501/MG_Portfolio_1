export const navLinks = [
    { name: 'Home', href: '#home', active: true },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    {
        name: 'Portfolio',
        href: '#portfolio',
        dropdown: [
            { name: 'Projects', href: '#projects' },
            { name: 'Research', href: '#research' },
            { name: 'Publications', href: '#publications' },
        ]
    },
    {
        name: 'Skills',
        href: '#skills',
        dropdown: [
            { name: 'Technical Skills', href: '#technical-skills' },
            { name: 'Certifications', href: '#certifications' },
        ]
    },
    {
        name: 'Achievements',
        href: '#achievements',
        dropdown: [
            { name: 'Awards', href: '#awards' },
            { name: 'Leadership', href: '#leadership' },
            { name: 'Sports', href: '#sports' },
        ]
    },
    { name: 'Contact', href: '#contact' }
];
