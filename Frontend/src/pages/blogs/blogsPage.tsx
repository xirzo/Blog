import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Miniature from "../../components/miniature/miniature.tsx";
import {getAllBlogs} from "../../entities/user/api/getAllBlogs";
import type {Blog} from "../../entities/user/model/blog";

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
        <>
            <div className={"grid grid-cols-3 gap-5"}>

                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <Link
                            key={blog.id.toString()}
                            to={`/blog/${blog.id}`}
                        >
                            <Miniature
                                name={blog.name}
                                description={blog.description}
                                maxWordsInDescription={maxWordsInDescription}
                            />
                        </Link>
                    ))
                ) : (
                    <p>No blogs found</p>
                )}
            </div>
        </>
    );
}

export default BlogsPage;
