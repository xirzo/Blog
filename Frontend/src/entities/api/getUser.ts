import type {Guid} from "guid-typescript";
import {api} from "../../shared/api/axios.ts";
import type {User} from "../model/user.ts";

export async function getUser(userGuid: Guid) {
    const response = await api.get<User>(`/user/${userGuid}`);
    return response.data;
}
