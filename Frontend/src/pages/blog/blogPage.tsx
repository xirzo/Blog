import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import type {Blog} from "../../entities/model/blog";
import {getBlog} from "../../entities/api/getBlog";
import {Guid} from "guid-typescript";
import HorizontalLine from "../../shared/ui/horizontalLine.tsx";
import FormattedDate from "../../shared/ui/formattedDate.tsx";
import Markdown from 'https://esm.sh/react-markdown@10'

function BlogPage() {
    const {id} = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBlog() {
            try {
                setIsLoading(true);

                if (!id) {
                    return;
                }

                setBlog(await getBlog(Guid.parse(id)));
            } catch (err) {
                console.error("Failed to fetch blogs details:", err);
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            fetchBlog();
        }
    }, [id]);

    if (isLoading) {
        return <div>Loading blog...</div>;
    }

    if (error || !blog) {
        return <div>{error || "Blog not found"}</div>;
    }

    return (
        <div className={"flex flex-col text-start"}>
            <Link to="/"> Back to all blogs ←</Link>

            <h1 className="font-light text-[10vw] md:text-[3vw] mb-4 text-[var(--color-primary-text)]">{blog.name}</h1>

            <p className={"font-light mb-2 text-[var(--color-secondary-text)] mb-8"}>{blog.description}</p>

            <p className={"font-light mb-2 text-[var(--color-secondary-text)]"}>
                <FormattedDate date={blog.created}/>
                {blog.author && <span> by {blog.author.name}</span>}
            </p>

            <HorizontalLine/>

            <article className="prose-xl">
                <Markdown>
                    {blog.markdownContent}
                </Markdown>
            </article>
        </div>
    );
}

export default BlogPage;
