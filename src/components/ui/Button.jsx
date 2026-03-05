import { cn } from "@/utils/helpers";

export default function Button({ children, variant = "primary", className, icon: Icon, ...props }) {
    const baseStyles = "w-full flex items-center justify-center gap-2 py-[14px] rounded-[12px] font-semibold transition-all duration-300 text-[15px] hover:scale-[1.03]";

    const variants = {
        primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
        outline: "border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10"
    };

    return (
        <button className={cn(baseStyles, variants[variant], className)} {...props}>
            {Icon && <Icon className="w-4 h-4" />}
            {children}
        </button>
    );
}
