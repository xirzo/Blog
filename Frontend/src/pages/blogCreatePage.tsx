import {useState} from "react";
import HorizontalLine from "../shared/ui/horizontalLine.tsx";
import Button from "../shared/ui/button.tsx";
import {createBlog} from "../entities/api/createBlog.ts";
import {useAuth} from "../features/auth/model/useAuth.ts";

function BlogCreatePage() {
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
            await createBlog({
                name,
                description,
                markdownContent,
                authorId: authContext.user.id
            });
            setName("");
            setDescription("");
            setMarkdownContent("")
        } catch (err) {
            console.error("Failed to create blog:", err);
            setSaveError("Failed to create blog. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={"flex flex-col text-start gap-5"}>
            <h1 className={"text-4xl"}>Create Blog</h1>
            <HorizontalLine bottomMargin={2}/>

            <h2 className={"text-xl"}>Name</h2>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="border p-2"
            />

            <h2 className={"text-xl"}>Description</h2>
            <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="border p-2"
            />

            <h2 className={"text-xl"}>Content</h2>
            <textarea
                rows={10}
                value={markdownContent}
                onChange={e => setMarkdownContent(e.target.value)}
                className="border p-2"
            />

            {saveError && <p className="text-[var(--color-error)]">{saveError}</p>}

            <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save"}
            </Button>
        </div>
    );
}

export default BlogCreatePage;
