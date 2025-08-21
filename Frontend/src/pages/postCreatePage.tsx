import {useState} from "react";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import Button from "../shared/ui/button.tsx";
import {createPost} from "../entities/api/createPost.ts";
import {useAuth} from "../features/auth/model/useAuth.ts";

function PostCreatePage() {
    const [name, setName] = useState("");
    const authContext = useAuth();
    const [description, setDescription] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const handleSave = async () => {
        setIsSaving(true);
        setSaveError(null);

        try {
            if (authContext.user === null) {
                console.error("AuthContext user is null");
                return;
            }

            await createPost({
                name,
                description,
                markdownContent,
                authorId: authContext.user.id
            });
            setName("");
            setDescription("");
            setMarkdownContent("")
        } catch (err) {
            console.error("Failed to create post:", err);
            setSaveError("Failed to create post. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', textAlign: 'start', gap: 20}}>
            <h1 style={{fontSize: '2.25rem'}}>Create Post</h1>
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

export default PostCreatePage;
