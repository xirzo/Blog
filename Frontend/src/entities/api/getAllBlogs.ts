import {api} from "../../shared/api/axios.ts";
import type {Blog} from "../model/blog.ts";

export async function getAllBlogs() {
    const response = await api.get<Blog[]>("/blog/");
    return response.data;
}
