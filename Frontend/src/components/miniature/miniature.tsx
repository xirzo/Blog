export interface IMiniatureProps {
    name: string
    description: string
}

function Miniature({name, description}: IMiniatureProps) {
    return (
        <div
            className="
                p-4
                rounded-[15px]
                bg-[var(--color-secondary)]
                border
                border-[var(--color-primary)]
                transition-colors
                duration-200
            "
        >
            <h2
                className="
                text-xl
                font-semibold
                text-[var(--color-accent)]
              "
            >
                {name}
            </h2>
            <p
                className="
                    text-base
                    text-[var(--color-accent)]
                "
            >
                {description}
            </p>
        </div>
    );
}

export default Miniature;
