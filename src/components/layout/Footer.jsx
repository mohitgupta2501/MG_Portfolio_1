import { personalInfo } from '@/data/personalInfo';

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-[var(--border)] py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{personalInfo.name}</h2>
                <p className="text-[var(--text-secondary)] text-center max-w-md mb-8">
                    {personalInfo.shortDesc}
                </p>
                <p className="text-[#666666] text-sm">
                    &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
