import { z } from "zod";

export const createWorkspaceSchema = z.object({
    name: z.string().trim().min(1 , "Workspace name is required"),
});

export const updateWorkspaceSchema = z.object({
    name: z.string().trim().min(1, "Workspace name is required"),
})