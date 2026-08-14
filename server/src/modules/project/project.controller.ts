import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createProject } from "./project.service";

export const createProjectController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const {name, description, workspaceId} = req.body;
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const project = await createProject(name, description, workspaceId, userId);

        return res.status(201).json({
            success: true,
            data: project,
        });
    } catch(error){
        console.log("Create project error:", error);

        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }

}