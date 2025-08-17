import type {Post} from "../model/post.ts";
import {api} from "../../shared/api/axios.ts";

export async function createPost(postDto: Partial<Post>) {
    const response = await api.post<Post>(`/posts`, postDto);
    return response.data;
}