import {useEffect, useState} from "react";
import PostMiniature from "../components/postMiniature.tsx";
import {getAllPosts} from "../entities/api/getAllPosts.ts";
import type {Post} from "../entities/model/post.ts";

function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const maxWordsInDescription = 50;

    useEffect(() => {
        async function fetchPosts() {
            try {
                setIsLoading(true);
                const postsData = await getAllPosts();
                setPosts(postsData);
            } catch (err) {
                console.error("Failed to fetch posts:", err);
                setError("Failed to load posts. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div>Loading posts...</div>;
    }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostMiniature
                        key={post.id.toString()}
                        blodId={post.id.toString()}
                        name={post.name}
                        description={post.description}
                        date={post.created}
                        linkTo={`/post/${post.id}`}
                        maxWordsInDescription={maxWordsInDescription}
                    />
                ))
            ) : (
                <p>No posts</p>
            )}
        </div>
    );
}

export default PostsPage;
