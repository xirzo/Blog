import type {Blog} from "../model/blog";
import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";

export async function updateBlog(blogGuid: Guid, updatedBlog: Partial<Blog>) {
    const response = await api.put<Blog>(`/blogs/${blogGuid}`, updatedBlog);
    return response.data;
}