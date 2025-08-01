import type { Guid } from "guid-typescript";
import type { Blog } from "./blog";

export type Post = {
    id: Guid;
    name: string;
    description: string;
    created: Date;
    blogId: Guid;
    blog?: Blog;
}
