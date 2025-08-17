import type {Post} from "../model/post.ts";
import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";

export async function updatePost(postGuid: Guid, updatedPost: Partial<Post>) {
    const response = await api.put<Post>(`/posts/${postGuid}`, updatedPost);
    return response.data;
}