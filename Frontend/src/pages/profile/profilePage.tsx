import {useAuth} from "../../features/auth/model/useAuth";
import {useEffect, useState} from "react";
import type {Blog} from "../../entities/model/blog.ts";
import {getBlogsByUser} from "../../entities/api/getBlogsByUser.ts";
import {deleteBlog} from "../../entities/api/deleteBlog.ts";
import Button from "../../shared/ui/button.tsx";

function ProfilePage() {
    const {user} = useAuth();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [areBlogsLoading, setAreBlogsLoading] = useState(false);

    useEffect(() => {
        async function fetchBlogs() {
            try {
                setAreBlogsLoading(true);
                const blogsData = await getBlogsByUser(user.id)
                setBlogs(blogsData);
            } catch (err) {
                console.log(err);
            } finally {
                setAreBlogsLoading(false);
            }
        }

        fetchBlogs();
    }, []);

    if (areBlogsLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile-page">
            <h2 className={"text-2xl text-start mb-5"}>Blogs</h2>

            <div className={"gap-5 flex flex-col"}>
                {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <div key={blog.id.toString()}
                                 className={"flex flex-row text-start items-center gap-4"}>

                                <h1>{blog.name}</h1>

                                <Button>Edit</Button>
                                <Button onClick={() => deleteBlog(blog.id)}>Delete</Button>
                            </div>
                        ))
                    )
                    : (
                        <p>No blogs</p>
                    )}
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
