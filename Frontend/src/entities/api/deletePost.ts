import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";

export async function deletePost(postGuid: Guid) {
    const response = await api.delete(`/posts/${postGuid}`);
    return response.data;
}
