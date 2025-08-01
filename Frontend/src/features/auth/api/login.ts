import { api } from "../../../shared/api/axios";

export async function login({ email, password }: { email: string, password: string }) {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
}
