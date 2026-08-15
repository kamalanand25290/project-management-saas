import { validate } from "../../middleware/validate";
import { createProjectSchema } from "../../validation/project.validation";
import { authenticate } from "../auth/auth.middleware";
import { createProjectController, getProjectByIdController, getProjectsController } from "./project.controller";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, validate(createProjectSchema), createProjectController);
router.get("/", authenticate, getProjectsController);
router.get("/:projectId", authenticate, getProjectByIdController);

export default router;

