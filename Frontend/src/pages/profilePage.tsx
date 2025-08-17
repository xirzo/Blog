import {useAuth} from "../features/auth/model/useAuth.ts";
import {useEffect, useState} from "react";
import type {Post} from "../entities/model/post.ts";
import {getPostsByUser} from "../entities/api/getPostsByUser.ts";
import Button from "../shared/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {deletePost} from "../entities/api/deletePost.ts";

function ProfilePage() {
    const {user} = useAuth();
    const [posts, setPosts] = useState<Post[]>([]);
    const [arePostsLoading, setArePostsLoading] = useState(false);
    const navigate = useNavigate();

    async function fetchPosts() {
        try {
            setArePostsLoading(true);
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

    async function handleDeletion(postId: string) {
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
        <div className="profile-page">
            <h2 className={"text-2xl mb-5"}>Posts</h2>
            <div className={"gap-5 flex flex-col mb-5"}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id.toString()}
                             className={"flex flex-row text-start items-center gap-4"}>
                            <h1>{post.name}</h1>
                            <Button onClick={() => navigate(`/post/edit/${post.id.toString()}`)}>Edit</Button>
                            <Button onClick={() => handleDeletion(post.id.toString())}>Delete</Button>
                        </div>
                    ))
                ) : (
                    <p>No posts</p>
                )}
                <Button onClick={() => navigate(`/post/create`)}>Create</Button>
            </div>
            {user && (
                <div className="profile-card">
                    <div className="profile-info">
                        <h2>{user.name}</h2>
                        <p className="email">{user.email}</p>
                        <p className="user-id">ID: {user.id.toString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;
