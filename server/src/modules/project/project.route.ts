import { validate } from "../../middleware/validate";
import { createProjectSchema, updateProjectSchema } from "../../validation/project.validation";
import { authenticate } from "../auth/auth.middleware";
import { createProjectController, getProjectByIdController, getProjectsController, updateProjectController } from "./project.controller";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, validate(createProjectSchema), createProjectController);
router.get("/", authenticate, getProjectsController);
router.get("/:projectId", authenticate, getProjectByIdController);
router.patch("/:projectId", authenticate, validate(updateProjectSchema), updateProjectController);

export default router;

