import { Router } from "express";
import { createTaskController, getTaskByIdController, getTasksController } from "./task.controller";
import { authenticate } from "../auth/auth.middleware";
import { validate } from "../../middleware/validate";
import { createTaskSchema } from "../../validation/task.validation";

const router = Router();

router.post("/", authenticate, validate(createTaskSchema), createTaskController);
router.get("/", authenticate, getTasksController);
router.get("/:taskId", authenticate, getTaskByIdController);

export default router;