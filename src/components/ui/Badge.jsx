import { cn } from "@/utils/helpers";

export default function Badge({ children, className }) {
    return (
        <div className={cn("w-full flex flex-col items-center min-w-0 max-w-full", className)}>
            <span className="px-4 py-1.5 rounded-full bg-[var(--accent-dark)] text-[var(--accent)] text-[12px] font-semibold tracking-widest uppercase mb-1 border border-[var(--accent)]/10 max-w-full truncate text-center">
                {children}
            </span>
            <div className="w-8 h-[2px] bg-[var(--accent)] mt-1 shrink-0" />
        </div>
    );
}
