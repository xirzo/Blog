export interface IMiniatureProps {
    name: string    
    description: string
}

function Miniature({ name, description }: IMiniatureProps) {
    return (
        <div className="post-mini">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default Miniature;
