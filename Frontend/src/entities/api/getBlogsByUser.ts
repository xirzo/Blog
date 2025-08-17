import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";
import type {Blog} from "../model/blog.ts";

export async function getBlogsByUser(userGuid: Guid) {
    const response = await api.get<Blog[]>(`/blogs?userId=${userGuid}`);
    return response.data;
}
