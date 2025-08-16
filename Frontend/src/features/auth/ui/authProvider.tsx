import {useEffect, useState, type ReactNode} from "react";
import {AuthContext} from "../model/authContext";
import {login as loginApi} from "../api/login";
import {register as registerApi} from "../api/register";
import type {User} from "../../../entities/user/model/user";

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                setUser(null);
                localStorage.removeItem("user");
                console.error("Failed to parse stored user:", e);
            }
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await loginApi({email, password});
            setToken(response.token);
            setUser(response.user);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            return response;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const response = await registerApi({name, email, password});
            setToken(response.token);
            setUser(response.user);
            localStorage.setItem("token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));
            return response;
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated: !!user && !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
