export function Text({ children, className, ...props }) {
    return (
        <span
            {...props}
            className={`w-full bg-lime-900 text-lime-50 px-4 py-2 rounded-md ${className}`}
        >
            {children}
        </span>
    );
}
