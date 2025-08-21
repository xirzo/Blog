import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({children, ...props}: ButtonProps) => {
    return (
        <button
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
