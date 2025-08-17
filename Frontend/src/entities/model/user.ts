import type { Guid } from "guid-typescript";

export type User =  {
    id: Guid;
    email: string;
    name: string;
}
