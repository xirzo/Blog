import {useAuth} from "../features/auth/model/useAuth.ts";
import {useEffect, useState} from "react";
import type {Post} from "../entities/model/post.ts";
import {getPostsByUser} from "../entities/api/getPostsByUser.ts";
import Button from "../shared/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {deletePost} from "../entities/api/deletePost.ts";
import type {Guid} from "guid-typescript";

function ProfilePage() {
    const {user} = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [arePostsLoading, setArePostsLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchPosts() {
        try {
            setArePostsLoading(true);
            if (user === null) {
                console.error("No user");
                return;
            }
            const postsData = await getPostsByUser(user.id);
            setPosts(postsData);
        } catch (err) {
            console.log(err);
        } finally {
            setArePostsLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    async function handleDeletion(postId: Guid) {
        try {
            await deletePost(postId);
            fetchPosts();
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    }

    if (arePostsLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2 style={{fontSize: '2rem', marginBottom: 20}}>Posts</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 20}}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id.toString()} style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            textAlign: 'start'
                        }}>
                            <h1>{post.name}</h1>
                            <Button onClick={() => navigate(`/post/edit/${post.id.toString()}`)}>Edit</Button>
                            <Button onClick={() => handleDeletion(post.id)}>Delete</Button>
                        </div>
                    ))
                ) : (
                    <p>No posts</p>
                )}
                <Button onClick={() => navigate(`/post/create`)}>Create</Button>
            </div>
            {user && (
                <div style={{border: '1px solid #ccc', borderRadius: 8, padding: 20, maxWidth: 400}}>
                    <div>
                        <h2>{user.name}</h2>
                        <p style={{color: 'var(--color-secondary-text)'}}>{user.email}</p>
                        <p style={{color: 'var(--color-secondary-text)'}}>ID: {user.id.toString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
