import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import type {Blog} from "../../entities/user/model/blog";
import {getBlog} from "../../entities/user/api/getBlog";
import {Guid} from "guid-typescript";

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

                console.log(1)
                setBlog(await getBlog(Guid.parse(id)));
                console.log(2)
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
        <div>
            <Link to="/blog"> ← Back to all blogs</Link>

            <h1>{blog.name}</h1>

            <p>
                Created on {new Date(blog.created).toLocaleDateString()}
                {blog.author && <span> by {blog.author.name}</span>}
            </p>

            <div>
                <p>{blog.description}</p>
            </div>

            <h2>Posts</h2>

            <div>
                {blog.posts && blog.posts.length > 0 ? (
                    blog.posts.map(post => (
                        <div key={post.id.toString()}>
                            <h3>{post.name}</h3>
                            <p>{post.description.substring(0, 150)}...</p>
                            <span>
                                {new Date(post.created).toLocaleDateString()}
                            </span>
                        </div>
                    ))
                ) : (
                    <p>This blog has no posts yet.</p>
                )}
            </div>
        </div>
    );
}

export default BlogPage;
