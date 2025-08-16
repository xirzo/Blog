import {Navigate} from "react-router-dom";
import {useAuth} from "../../features/auth/model/useAuth";
import type {ReactNode} from "react";

interface IPublicOnlyRouteProps {
    children: ReactNode;
}

export function PublicOnlyRoute({children}: IPublicOnlyRouteProps) {
    const {isAuthenticated} = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/"/>;
    }

    return <>{children}</>;
}
