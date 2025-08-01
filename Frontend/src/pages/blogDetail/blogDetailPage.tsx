import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../shared/api/axios";
import type { Blog } from "../../entities/user/model/blog";
import './blogDetailPage.scss';

function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlog() {
      try {
        setIsLoading(true);
        const response = await api.get<Blog>(`/blog/${id}`);
        setBlog(response.data);
      } catch (err) {
        console.error("Failed to fetch blog details:", err);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchBlog();
    }
  }, [id]);

  if (isLoading) {
    return <div className="loading">Loading blog...</div>;
  }

  if (error || !blog) {
    return <div className="error">{error || "Blog not found"}</div>;
  }

  return (
    <div className="blog-detail">
      <Link to="/blog" className="back-link">← Back to all blogs</Link>
      <h1>{blog.name}</h1>
      <p className="blog-meta">
        Created on {new Date(blog.created).toLocaleDateString()}
        {blog.author && <span> by {blog.author.name}</span>}
      </p>
      <div className="blog-content">
        <p>{blog.description}</p>
      </div>
      
      <h2>Posts</h2>
      <div className="posts-container">
        {blog.posts && blog.posts.length > 0 ? (
          blog.posts.map(post => (
            <div key={post.id.toString()} className="post-card">
              <h3>{post.name}</h3>
              <p>{post.description.substring(0, 150)}...</p>
              <span className="post-date">
                {new Date(post.created).toLocaleDateString()}
              </span>
            </div>
          ))
        ) : (
          <p className="no-posts">This blog has no posts yet.</p>
        )}
      </div>
    </div>
  );
}

export default BlogDetailPage;
