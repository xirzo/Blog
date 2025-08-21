import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import type {Post} from "../entities/model/post.ts";
import {getPost} from "../entities/api/getPost.ts";
import {Guid} from "guid-typescript";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import FormattedDate from "../shared/ui/formattedDate.tsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";

function PostPage() {
    const {id} = useParams<{ id: string }>();
    const [post, setPost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPost() {
            try {
                setIsLoading(true);

                if (!id) {
                    return;
                }

                setPost(await getPost(Guid.parse(id)));
            } catch (err) {
                console.error("Failed to fetch posts details:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            fetchPost();
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading post...</div>;
    }

    if (error || !post) {
        return <div>{error || "Post not found"}</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start'}}>
            <Link to="/"> ← Back to all posts</Link>

            <h1 style={{
                fontWeight: 300,
                fontSize: '3vw',
                marginBottom: 16,
                color: 'var(--color-primary-text)'
            }}>{post.name}</h1>

            <p style={{fontWeight: 300, marginBottom: 8, color: 'var(--color-secondary-text)'}}>{post.description}</p>

            <p style={{fontWeight: 300, marginBottom: 8, color: 'var(--color-secondary-text)'}}>
                <FormattedDate date={post.created}/>
                {post.author && <span> by {post.author.name}</span>}
            </p>

            <HorizontalLine/>

            <article style={{color: 'var(--color-primary-text)'}}>
                <Markdown remarkPlugins={[remarkGfm]}>
                    {post.markdownContent}
                </Markdown>
            </article>
        </div>
    );
}

export default PostPage;
