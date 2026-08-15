import { z } from "zod";

export const createProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Project name is required")
        .max(100, "Project name must be 100 characters or less"),
    description: z
        .string()
        .trim()
        .min(1, "Project description is required")
        .max(1000, "Project description must be 1000 characters or less"),
    workspaceId: z.
        string().
        trim().
        min(1, "Workspace ID is required"),
})