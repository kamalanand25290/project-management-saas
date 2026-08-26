import { Router } from "express";
import { createTaskController, deleteTaskController, getTaskByIdController, getTasksController, updateTaskController } from "./task.controller";
import { authenticate } from "../auth/auth.middleware";
import { validate } from "../../middleware/validate";
import { createTaskSchema, updateTaskSchema } from "../../validation/task.validation";

const router = Router();

router.post("/", authenticate, validate(createTaskSchema), createTaskController);
router.get("/", authenticate, getTasksController);
router.get("/:taskId", authenticate, getTaskByIdController);
router.patch("/:taskId", authenticate, validate(updateTaskSchema), updateTaskController);
router.delete("/:taskId", authenticate, deleteTaskController);

export default router;