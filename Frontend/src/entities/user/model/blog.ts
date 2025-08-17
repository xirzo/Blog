import type {Guid} from "guid-typescript";
import type {User} from "./user";

export type Blog = {
    id: Guid;
    name: string;
    description: string;
    htmlContent: string;
    created: Date;
    authorId: Guid;
    author?: User;
}