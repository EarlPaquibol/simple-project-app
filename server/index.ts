import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
app.use(express.json());

// app.use(
//   cors({
//     origin: "http://localhost:3001",
//     methods: ["GET", "PATCH", "DELETE", "PUT", "POST"],
//   }),
// );

app.use(cors());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
