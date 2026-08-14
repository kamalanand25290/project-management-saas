import { authenticate } from "../auth/auth.middleware";
import { createProjectController } from "./project.controller";
import { Router } from "express";

const router = Router();

router.post("/", authenticate, createProjectController);

export default router;

