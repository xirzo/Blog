import type { Guid } from "guid-typescript";
import { api } from "../../../shared/api/axios";

export async function getUser(userGuid: Guid) {
    const response = await api.get(`/user/${userGuid}`);
    return response.data;
}
