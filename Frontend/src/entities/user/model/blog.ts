import type { Guid } from "guid-typescript";
import type { User } from "./user";
import type { Post } from "./post";

export type Blog = {
    id: Guid;
    name: string;
    description: string;
    created: Date;
    authorId: Guid;
    author?: User;
    posts?: Post[];
}

