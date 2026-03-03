import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import pool from "./db.js";

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

app.get("/api/v1/projects", async (req, res) => {
  try {
    const projects = await pool.query("SELECT * FROM projects");
    if (!projects) {
      throw new Error("Shit is broken");
    }
    return res
      .status(200)
      .json({ message: "Good call", result: projects.rows });
  } catch (err) {
    return res.status(400).json({ message: "Sumthin went wrong" });
  }
});

app.post("/api/v1/projects/create", async (req, res) => {
  try {
    const { project } = req.body;
    if (!project) {
      throw new Error("Project title is required!");
    }

    const result = await pool.query(
      "INSERT INTO projects (project) VALUES ($1) RETURNING *",
      [project],
    );

    if (result.rows.length == 0) {
      throw new Error("Something went wrong with SQL");
    }

    return res
      .status(201)
      .json({ message: "Sucessfully created!", res: result.rows[0] });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

app.patch("/api/v1/projects/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { project } = req.body;

    if (!id || !project) {
      throw new Error("Incomplete stuff");
    }

    const result = await pool.query(
      "UPDATE projects SET project = $1 WHERE id = $2 RETURNING *",
      [project, id],
    );

    if (result.rows.length == 0)
      throw new Error("Something went wrong with SQL");

    return res
      .status(200)
      .json({ message: "Project edited", res: result.rows[0] });
  } catch (err) {}
});

app.delete("/api/v1/projects/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) throw new Error("Missing ID");

    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id],
    );

    if (result.rows.length == 0) throw new Error("PROJECT NOT FOUND");

    return res
      .status(200)
      .json({ message: "Succesfully deleted", res: result.rows[0] });
  } catch (err) {}
});

// app.get("/tasks", async (req, res) => {
//   try {
//     const tasks = await pool.query("SELECT * FROM tasks");
//     if (!tasks) {
//       throw new Error("Shit is broken");
//     }
//     return res.status(200).json({ message: "Good call", result: tasks.rows });
//   } catch (err) {}
// });

app.use(errorHandler);
app.listen(3000, () => {
  console.log("Listening on port 3000");
});
