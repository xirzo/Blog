import { api } from "../../../shared/api/axios";
import type { Blog } from "../model/blog";

export async function getAllBlogs() {
    const response = await api.get<Blog[]>("/blog/");
    return response.data;
}
