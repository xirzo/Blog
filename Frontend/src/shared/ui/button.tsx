import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({children, ...props}: ButtonProps) => {
    return (
        <button
            {...props}
            className="
                px-5
                py-2.5
                rounded-full
                text-sm
                font-medium
                bg-[var(--color-secondary)]
                text-[var(--color-accent)]
                transition-colors
                duration-150
                hover:bg-[var(--color-primary-hover)]
                hover:text-[var(--color-secondary)]
                active:bg-[var(--color-secondary)]
                active:text-[var(--color-primary-hover)]
            "
        >
            {children}
        </button>
    );
};

export default Button;
