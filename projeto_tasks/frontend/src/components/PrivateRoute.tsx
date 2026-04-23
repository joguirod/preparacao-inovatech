import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
    requiredRole?: string;
}

export function PrivateRoute({ children, requiredRole }: Props) {
    const { user, logout } = useAuth();

    if (!user) {
        return <Navigate to="/login"/>
    }

    if (requiredRole && user.role !== requiredRole) {
        logout();
        return <Navigate to="/login"/>
    }

    return <>{children}</>
}