import { createContext, ReactNode, useContext, useState } from "react";

interface User {
    id: string,
    email: string,
    role: "USER" | "ADMIN",
}

interface AuthContextData {
    user: User | null,
    token: string | null,
    login: (user: User, token: string) => void,
    logout: () => void,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({children} : {children: ReactNode}) {
    const [user, setUser] = useState<User | null>(() => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        const payload = JSON.parse(atob(token.split(".")[1]));
        return { id: payload.userId, email: payload.email, role: payload.role }
    });
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token");
    });

    function login(user: User, token: string) {
        setUser(user);
        setToken(token);
        localStorage.setItem("token", token);
    }

    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
    }

    console.log("USER NO CONTEXTO:", user);

    return (
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}