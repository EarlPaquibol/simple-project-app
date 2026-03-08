import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as userProjectsController from "../controllers/userProjectsController.js";

const router = Router();

router.post(
  "/:user_id/:project_id",
  asyncHandler(userProjectsController.assignProject),
);
router.delete(
  "/:user_id/:project_id",
  asyncHandler(userProjectsController.removeProject),
);

export default router;
