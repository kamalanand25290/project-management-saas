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

    workspaceId: z
        .string()
        .min(1, "Workspace ID is required"),
});

export const updateProjectSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Project name cannot be empty")
        .max(100, "Project name must be 100 characters or less")
        .optional(),

    description: z
        .string()
        .trim()
        .min(1, "Project description cannot be empty")
        .max(1000, "Project description must be 1000 characters or less")
        .optional(),
}).refine(
    (data) => data.name !== undefined || data.description !== undefined,
    {
        message: "At least one field is required to update the project",
    }
);