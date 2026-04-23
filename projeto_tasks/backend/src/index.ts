import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./infra/database/data-source";
import { authRoute } from "./presentation/routes/auth.route";
import { userRoute } from "./presentation/routes/user.route";
import { taskRoute } from "./presentation/routes/task.route";
import { authMiddleware } from "./presentation/middlewares/auth.middleware";
import { errorMiddleware } from "./presentation/middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ok : true})
});

app.use("/auth", authRoute);
app.use("/user", authMiddleware, userRoute);
app.use("/task", authMiddleware, taskRoute)

app.use(errorMiddleware);

AppDataSource.initialize()
.then(() => {
    app.listen(3000, () => {
        console.log("API rodando em http://localhost:3000")
    })
});