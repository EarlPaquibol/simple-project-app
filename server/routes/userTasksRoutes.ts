import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as userTasksController from "../controllers/userTasksController.js";

const router = Router();

router.post("/", asyncHandler(userTasksController.assignTask));
router.delete(
  "/:user_id/:task_id",
  asyncHandler(userTasksController.removeTask),
);

export default router;
