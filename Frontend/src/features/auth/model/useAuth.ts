import { useState } from "react";
import { login as loginApi } from "../api/login";
import { register as registerApi } from "../api/register";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email: string, password: string) => {
    const { token, user } = await loginApi({ email, password });
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const register = async (name: string, email: string, password: string) => {
    const { token, user } = await registerApi({ name, email, password });
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return { user, token, login, register, logout };
}
