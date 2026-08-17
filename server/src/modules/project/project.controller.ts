import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from "./project.service";

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

        const project = await createProject(
            name, 
            description, 
            workspaceId, 
            userId
        );

        return res.status(201).json({
            success: true,
            data: project,
        });
    } catch(error){
        console.error("Create project error:", error);

        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }

}

export const getProjectsController = async( req: AuthRequest, res: Response) => {
    try{
        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const workspaceId = req.query.workspaceId;

        const projects = await getProjects(
            req.userId,
            typeof workspaceId === "string" ? workspaceId : undefined,
        );

        return res.status(200).json({
            success: true,
            data: projects,
        });

    } catch(error) {
        console.error("Get projects error:",error);

        return res.status(500).json({
            success: false,
            message: "Error fetching projects"
        })
    }

}

export const getProjectByIdController = async (req: AuthRequest, res: Response) => {
    try{
        const { projectId } = req.params;

        if(!projectId || typeof projectId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Project ID is required"
            });
        }

        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const project = await getProjectById(projectId , req.userId);

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: project,
        });
        
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Error fetching project"
        });
    }
}

export const updateProjectController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const {name, description} = req.body;

        const { projectId } = req.params;
        if(!projectId || typeof projectId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const project = await updateProject(
            projectId,
            userId, 
            name,
            description,
        );

        return res.status(200).json({
            success: true,
            data: project,
        });
    } catch(error){
        console.error("Update project error:", error);

        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }

}

export const deleteProjectController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const { projectId } = req.params;

        if(!projectId || typeof projectId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const deletedProject = await deleteProject(projectId , userId);

        return res.status(200).json({
            success: true,
            data: deletedProject,
        })
    } catch(error){
        console.error("Delete project error:", error);

        return res.status(400).json({
            success: false,
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
}