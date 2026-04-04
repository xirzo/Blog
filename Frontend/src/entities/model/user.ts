import type { Guid } from "guid-typescript";

export type User =  {
    userId: Guid;
    email: string;
    name: string;
}
