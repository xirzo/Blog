import "./postMini.scss";

export interface IPostMiniProps {
    name: string    
    description: string
}

function PostMini({ name, description }: IPostMiniProps) {
    return (
        <div className="post-mini">
            <h2>{name}</h2>
            <p>{description}</p>
        </div>
    )
}

export default PostMini;
