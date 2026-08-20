import { Router } from "express";
import { createTaskController, getTasksController } from "./task.controller";
import { authenticate } from "../auth/auth.middleware";
import { validate } from "../../middleware/validate";
import { createTaskSchema } from "../../validation/task.validation";

const router = Router();

router.post("/", authenticate, validate(createTaskSchema), createTaskController);
router.get("/", authenticate, getTasksController);

export default router;