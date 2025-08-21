import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Post} from "../entities/model/post.ts";
import {getPost} from "../entities/api/getPost.ts";
import {updatePost} from "../entities/api/updatePost.ts";
import {Guid} from "guid-typescript";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import Button from "../shared/ui/button.tsx";

function PostEditPage() {
    const {id} = useParams<{ id: string }>();
    const [post, setpost] = useState<Post | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        async function fetchPost() {
            try {
                setIsLoading(true);
                setError(null);

                if (!id) return;

                const loadedPost = await getPost(Guid.parse(id));
                setpost(loadedPost);
                setName(loadedPost.name);
                setDescription(loadedPost.description);
                setMarkdownContent(loadedPost.markdownContent);
            } catch (err) {
                console.error("Failed to fetch post details:", err);
                setError("Failed to load post. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            fetchPost();
        }
    }, [id]);

    const handleSave = async () => {
        if (!post) return;
        setIsSaving(true);
        setSaveError(null);

        try {
            await updatePost(post.id, {
                name,
                description,
                markdownContent
            });
        } catch (err) {
            console.error("Failed to update post details:", err);
            setSaveError("Failed to update post. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div>Loading post...</div>;
    }

    if (error || !post) {
        return <div>{error || "Post not found"}</div>;
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start', gap: 20}}>
            <h1 style={{fontSize: '2.25rem'}}>Edit</h1>
            <HorizontalLine bottomMargin={2}/>

            <h2 style={{fontSize: '1.25rem'}}>Name</h2>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                style={{border: '1px solid #ccc', padding: '8px'}}
            />

            <h2 style={{fontSize: '1.25rem'}}>Description</h2>
            <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                style={{border: '1px solid #ccc', padding: '8px'}}
            />

            <h2 style={{fontSize: '1.25rem'}}>Content</h2>
            <textarea
                rows={10}
                value={markdownContent}
                onChange={e => setMarkdownContent(e.target.value)}
                style={{border: '1px solid #ccc', padding: '8px'}}
            />

            {saveError && <p style={{color: 'var(--color-error)'}}>{saveError}</p>}

            <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
            </Button>
        </div>
    );
}

export default PostEditPage;
