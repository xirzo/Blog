import type { Guid } from "guid-typescript";
import { api } from "../../../shared/api/axios";
import type { Blog } from "../model/blog";

export async function getBlog(blogGuid: Guid) {
    const response = await api.get<Blog>(`/blog/${blogGuid}`);
    return response.data;
}
