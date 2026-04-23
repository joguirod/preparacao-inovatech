import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", {email: email, password: password});
            const token = response.data.token;
            const user = JSON.parse(atob(token.split(".")[1]));
            login({ id: user.userId, email: user.email, role: user.role }, token)
            navigate("/tasks");
        } catch (error: any) {
            setError(error.response?.data?.message);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"></input>
                <input value={password} onChange={(p) => {setPassword(p.target.value)}} placeholder="Senha" type="password"></input>
                <button type="submit">Acessar</button>
            </form>
        </div>
    )
}