import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

interface Task {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
}

export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");
    const user = useAuth().user;

    
    async function getUserTasks() {
        try {
            const response = (await api.get(`/task/${user?.id}`));
            setTasks(response.data)
        } catch (error: any) {
            setError(error.response?.data?.message);
        }
    }

    useEffect(() => {
        getUserTasks();
    }, []);

    return (
        <div>
            <h1>Lista de tarefas</h1>
            {error && <p>{error}</p>}
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                </tr>
                </thead>
                <tbody>
                    {tasks?.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </div>
    );

}