import pool from "../db.js";
import * as userController from "../controllers/userController.js";
import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(userController.getUsers));
router.post("/", asyncHandler(userController.createUser));
router.patch("/updateUser/:id", asyncHandler(userController.updateUser));
router.delete("/deleteUser/:id", asyncHandler(userController.deleteUser));

export default router;
