import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", {name: name, email: email, password: password});
            if (response.status === 201) navigate("/login");
        } catch (error: any) {
            setError(error.response?.data?.message);
        }
    }

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={(n) => {setName(n.target.value)}} placeholder="name"></input>
                <input value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email"></input>
                <input value={password} onChange={(p) => {setPassword(p.target.value)}} placeholder="password" type="password"></input>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}