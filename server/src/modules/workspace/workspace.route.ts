import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";
import { createWorkspaceController, deleteWorkspaceController, getUserWorkspacesController, getWorkspaceByIdController, updateWorkspaceController } from "./workspace.controller";
import { validate } from "../../middleware/validate";
import { createWorkspaceSchema, updateWorkspaceSchema } from "../../validation/workspace.validation";

const router = Router();

router.post("/", authenticate, validate(createWorkspaceSchema), createWorkspaceController);
router.get("/", authenticate, getUserWorkspacesController);
router.get("/:workspaceId", authenticate, getWorkspaceByIdController);
router.patch("/:workspaceId", authenticate, validate(updateWorkspaceSchema), updateWorkspaceController);
router.delete("/:workspaceId", authenticate, deleteWorkspaceController);

export default router;