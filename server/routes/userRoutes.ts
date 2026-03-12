import * as userController from "../controllers/userController.js";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize("admin"),
  asyncHandler(userController.getUsers),
);
router.post("/", asyncHandler(userController.createUser));
router.patch("/updateUser/:id", asyncHandler(userController.updateUser));
router.delete("/deleteUser/:id", asyncHandler(userController.deleteUser));

router.get("/:user_id/tasks", asyncHandler(userController.getUserTasks));
router.get("/:user_id/projects", asyncHandler(userController.getUserProjects));

router.post("/login", asyncHandler(userController.login));
router.post("/refresh", asyncHandler(userController.refresh));

export default router;
