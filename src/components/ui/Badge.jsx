import { cn } from "@/utils/helpers";

export default function Badge({ children, className }) {
    return (
        <div className={cn("inline-flex flex-col items-center", className)}>
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent-dark)] text-[var(--accent)] text-[12px] font-semibold tracking-widest uppercase mb-1 border border-[var(--accent)]/10">
                {children}
            </span>
            <div className="w-8 h-[2px] bg-[var(--accent)] mt-1" />
        </div>
    );
}
