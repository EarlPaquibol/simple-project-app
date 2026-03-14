import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import userTasksRoutes from "./routes/userTasksRoutes.js";
import userProjectsRoutes from "./routes/userProjectsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import { connectRedis } from "./redis.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

await connectRedis();
// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     methods: ["GET", "PATCH", "DELETE", "PUT", "POST"],
//   }),
// );

app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/user-tasks", userTasksRoutes);
app.use("/api/v1/user-projects", userProjectsRoutes);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
