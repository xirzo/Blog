import {useEffect, useState} from "react";
import BlogMiniature from "../../components/blogMiniature/blogMiniature.tsx";
import {getAllBlogs} from "../../entities/api/getAllBlogs";
import type {Blog} from "../../entities/model/blog";

function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const maxWordsInDescription = 50;

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setIsLoading(true);
                const blogsData = await getAllBlogs();
                setBlogs(blogsData);
            } catch (err) {
                console.error("Failed to fetch blogs:", err);
                setError("Failed to load blogs. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    if (isLoading) {
        return <div>Loading blogs...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className={"flex flex-col gap-5"}>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <BlogMiniature
                        key={blog.id.toString()}
                        blodId={blog.id.toString()}
                        name={blog.name}
                        description={blog.description}
                        date={blog.created}
                        linkTo={`/blog/${blog.id}`}
                        maxWordsInDescription={maxWordsInDescription}
                    />
                ))
            ) : (
                <p>No blogs</p>
            )}
        </div>
    );
}

export default BlogsPage;
