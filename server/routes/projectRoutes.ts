import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as projectController from "../controllers/projectController.js";

const router = Router();

router.get("/", asyncHandler(projectController.getProjects));
router.post("/", asyncHandler(projectController.createProject));
router.patch("/:id", asyncHandler(projectController.editProject));
router.delete("/:id", asyncHandler(projectController.deleteProject));

router.get(
  "/:project_id/users",
  asyncHandler(projectController.getProjectUsers),
);

export default router;
