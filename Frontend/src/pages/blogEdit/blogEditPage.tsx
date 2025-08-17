import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import type {Blog} from "../../entities/model/blog";
import {getBlog} from "../../entities/api/getBlog";
import {updateBlog} from "../../entities/api/updateBlog";
import {Guid} from "guid-typescript";
import HorizontalLine from "../../shared/ui/horizontalLine.tsx";
import Button from "../../shared/ui/button.tsx";

function BlogEditPage() {
    const {id} = useParams<{ id: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [markdownContent, setMarkdownContent] = useState("");

    useEffect(() => {
        async function fetchBlog() {
            try {
                setIsLoading(true);
                setError(null);

                if (!id) return;

                const loadedBlog = await getBlog(Guid.parse(id));
                setBlog(loadedBlog);
                setName(loadedBlog.name);
                setDescription(loadedBlog.description);
                setMarkdownContent(loadedBlog.markdownContent);
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

    const handleSave = async () => {
        if (!blog) return;
        setIsSaving(true);
        setSaveError(null);

        try {
            await updateBlog(blog.id, {
                name,
                description,
                markdownContent
            });
        } catch (err) {
            console.error("Failed to update blog details:", err);
            setSaveError("Failed to update blog. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div>Loading blog...</div>;
    }

    if (error || !blog) {
        return <div>{error || "Blog not found"}</div>;
    }

    return (
        <div className={"flex flex-col text-start gap-5"}>
            <h1 className={"text-4xl"}>Edit</h1>
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

export default BlogEditPage;
