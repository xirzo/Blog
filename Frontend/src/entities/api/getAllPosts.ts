import {api} from "../../shared/api/axios.ts";
import type {Post} from "../model/post.ts";

export async function getAllPosts() {
    const response = await api.get<Post[]>("/posts/");
    return response.data;
}
