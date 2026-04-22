import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user";
import { Task } from "../../domain/entities/task";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: "app.db",
    synchronize: true,
    logging: false,
    entities: [User, Task]
})