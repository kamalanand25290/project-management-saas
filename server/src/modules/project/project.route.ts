import { authenticate } from "../auth/auth.middleware";
import { createProjectController, getProjectsController } from "./project.controller";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, createProjectController);
router.get("/", authenticate, getProjectsController);

export default router;

