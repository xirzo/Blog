import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";

export async function deleteBlog(blogGuid: Guid) {
    const response = await api.delete(`/blogs/${blogGuid}`);
    return response.data;
}
