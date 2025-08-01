import { api } from "../../../shared/api/axios";

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function register(payload: RegisterPayload) {
  const res = await api.post("/register", payload);
  return res.data;
}
