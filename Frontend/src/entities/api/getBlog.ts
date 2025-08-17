import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";
import type {Blog} from "../model/blog.ts";

export async function getBlog(blogGuid: Guid) {
    const response = await api.get<Blog>(`/blogs/${blogGuid}`);
    return response.data;
}
