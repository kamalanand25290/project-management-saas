import { z } from "zod";

export const createTaskSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Task title must be 100 characters or less"),

    description: z
    .string()
    .trim()
    .min(1, "Task description is required")
    .max(1000, "Task description must be 1000 characters or less")
    .optional(),

    projectId: z.string().trim().min(1, "Project ID is required"),

    status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"])
    .optional(),

    priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
})


export const updateTaskSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(100, "Task title must be 100 characters or less")
    .optional(),

    description: z
    .string()
    .trim()
    .min(1, "Task description is required")
    .max(1000, "Task description must be 1000 characters or less")
    .optional(),

    status: z
    .enum(["TODO", "IN_PROGRESS", "DONE"])
    .optional(),

    priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),
})