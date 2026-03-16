export const navLinks = [
    { name: 'Home', href: '#home', active: true },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    {
        name: 'Profile',
        href: '#profile',
        dropdown: [
            { name: 'Projects', href: '#projects', icon: 'FolderOpen' },
            { name: 'Research & Publications', href: '#research', icon: 'FlaskConical' },
            { name: 'Education', href: '#education', icon: 'GraduationCap' },
        ]
    },
    {
        name: 'Skills',
        href: '#skills',
        dropdown: [
            { name: 'Technical Skills', href: '#skills', icon: 'Code2' },
            { name: 'Certifications', href: '#certifications', icon: 'Award' },
        ]
    },
    {
        name: 'Achievements',
        href: '#achievements',
        dropdown: [
            { name: 'Awards & Honors', href: '#awards', icon: 'Trophy' },
            { name: 'Leadership & Activities', href: '#leadership', icon: 'Users' },
            { name: 'Gallery', href: '#gallery', icon: 'Images' },
        ]
    },
    { name: 'Contact', href: '#contact' }
];
