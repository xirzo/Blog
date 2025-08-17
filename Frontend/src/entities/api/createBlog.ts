import type {Blog} from "../model/blog";
import {api} from "../../shared/api/axios.ts";

export async function createBlog(blogDto: Partial<Blog>) {
    const response = await api.post<Blog>(`/blogs`, blogDto);
    return response.data;
}