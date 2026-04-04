import type {Guid} from "guid-typescript";
import type {User} from "./user.ts";

export type Post = {
    postId: Guid;
    name: string;
    description: string;
    markdownContent: string;
    created: Date;
    authorId: Guid;
    author?: User;
}