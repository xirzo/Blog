import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";
import type {Post} from "../model/post.ts";

export async function getPost(postGuid: Guid) {
    const response = await api.get<Post>(`/posts/${postGuid}`);
    return response.data;
}
