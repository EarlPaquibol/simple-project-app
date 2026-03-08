import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as taskController from "../controllers/taskController.js";

const router = Router();

router.get("/", asyncHandler(taskController.getTasks));
router.post("/", asyncHandler(taskController.createTask));
router.patch("/edit/:id", asyncHandler(taskController.updateTask));
router.delete("/delete/:id", asyncHandler(taskController.deleteTask));

router.get("/:task_id/users", asyncHandler(taskController.getTaskUsers));

export default router;
