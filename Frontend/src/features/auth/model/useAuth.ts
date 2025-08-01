import { useAuthContext } from "./authContext";

export function useAuth() {
    return useAuthContext();
}
