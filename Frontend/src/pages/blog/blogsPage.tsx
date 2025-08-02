import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostMini from "../../components/blogMini/postMini";
import { getAllBlogs } from "../../entities/user/api/getAllBlogs";
import type { Blog } from "../../entities/user/model/blog";

function BlogsPage() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        return <div className="loading">Loading blogs...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="grid">
            <h1>All Blogs</h1>
            <div className="blog-post-holder">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link 
                            key={blog.id.toString()} 
                            to={`/blog/${blog.id}`} 
                            className="blog-link"
                        >
                            <PostMini 
                                name={blog.name}
                                description={blog.description}
                            />
                        </Link>
                    ))
                ) : (
                    <div className="no-blogs">No blogs found</div>
                )}
            </div>
        </div>
    );
}

export default BlogsPage;
