export interface IMiniatureProps {
    name: string
    description: string
    maxWordsInDescription?: number
}

function trimWords(str: string, maxWords: number): string {

    const words = str.split(' ');

    if (words.length <= maxWords) {
        return str;
    }

    return words.slice(0, maxWords).join(' ');
}

function Miniature({name, description, maxWordsInDescription}: IMiniatureProps) {
    if (maxWordsInDescription !== undefined) {
        description = trimWords(description, maxWordsInDescription);
    }

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
                text-[var(--color-primary-text)]
              "
            >
                {name}
            </h2>
            <p
                className="
                    text-base
                    text-[var(--color-primary-text)]
                "
            >
                {description}
            </p>
        </div>
    );
}

export default Miniature;
