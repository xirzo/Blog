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
                bg-[#1a1a1a]
                dark:bg-[#1a1a1a]
                text-white
                dark:text-white
                /* Light mode overrides */
                bg-[#f7f8ff]
                border border-[#e4e7fa]
                dark:border-none
            "
        >
            <h2 className="text-xl font-semibold text-[#213547] dark:text-white">{name}</h2>
            <p className="text-base text-[#444b5a] dark:text-white">{description}</p>
        </div>
    )
}

export default Miniature;
