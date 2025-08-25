import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import type {Post} from "../entities/model/post.ts";
import {getPost} from "../entities/api/getPost.ts";
import {Guid} from "guid-typescript";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import FormattedDate from "../shared/ui/formattedDate.tsx";
import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
        <div className={"flex flex-col text-start"}>
            <Link to="/"> ← Back to all posts</Link>

            <h1 className="font-light text-[3rem] mb-4 text-[var(--color-primary-text)]">{post.name}</h1>

            <p className={"font-light text-[var(--color-secondary-text)] mb-8"}>{post.description}</p>

            <p className={"font-light mb-2 text-[var(--color-secondary-text)]"}>
                <FormattedDate date={post.created}/>
                {post.author && <span> by {post.author.name}</span>}
            </p>

            <HorizontalLine/>

            <article className="
                prose
                prose-xl
                prose-li:text-[var(--color-primary-text)]
                prose-ul:text-[var(--color-primary-text)]
                prose-ol:text-[var(--color-primary-text)]
                prose-tr:text-[var(--color-primary-text)]
                prose-th:text-[var(--color-primary-text)]
                prose-td:text-[var(--color-primary-text)]
                prose-hr:text-[var(--color-primary-text)]
                prose-code:text-[var(--color-secondary-text)]
                prose-strong:text-[var(--color-secondary-text)]
                prose-pre:bg-[var(--color-secondary)]
                prose-headings:text-[var(--color-primary-text)]
                prose-p:text-[var(--color-primary-text)]
            ">
                <Markdown remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw]}
                >
                    {post.markdownContent}
                </Markdown>
            </article>
        </div>
    );
}

export default PostPage;
