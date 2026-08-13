import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createWorkspace, getUserWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace } from "./workspace.service";

export const createWorkspaceController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const {name} = req.body;

        const workspace = await createWorkspace(
            name.trim(),
            req.userId,
        );

        return res.status(201).json({
            success: true,
            data: workspace,
        });
    } catch(error) {
        console.log("Create workspace error:" , error);

        return res.status(500).json({
            success: false,
            message: "Failed to create workspace",
        });
    }
}

export const getUserWorkspacesController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const workspaces = await getUserWorkspaces(req.userId);

        return res.status(200).json({
            success: true,
            data: workspaces,
        });

    } catch(error){
        console.log("Get workspaces error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to get workspaces",
        });
    }
}

export const getWorkspaceByIdController = async (
    req: AuthRequest,
    res: Response,
) => {
    try{
        if(!req.userId){
            return res.status(400).json({
                success: false,
                messgae: "Authentication required",
            });
        }
        
        const { workspaceId } = req.params;

        if (!workspaceId || typeof workspaceId !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required",
            });
        }
        
        const workspace = await getWorkspaceById(
            workspaceId,
            req.userId
        );

        if(!workspace){
            return res.status(404).json({
                sucess: false,
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: workspace,
        });
        
    } catch(error) {
        console.log("Get workspace error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to get workspace",
        });
    }
};

export const updateWorkspaceController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required"
            });
        }

        const { workspaceId } = req.params;

        const { name } = req.body;

        if(!workspaceId || typeof workspaceId !== 'string'){
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required"
            });
        }

        const workspace = await updateWorkspace(workspaceId, req.userId, name.trim());

        if(!workspace){
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: workspace,
        });

    } catch(error){
        console.log("Update workspace error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update workspace"
        });
    }

}

export const deleteWorkspaceController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const { workspaceId } = req.params;

        if(!req.userId){
            return res.status(400).json({
                success: false,
                message: "Authentication required"
            });
        }

        if(!workspaceId || typeof workspaceId !== 'string'){
            return res.status(400).json({
                success: false,
                message: "Workspace ID is required"
            });
        }

        const workspace = await deleteWorkspace(workspaceId, req.userId);

        if(!workspace){
            return res.status(404).json({
                success: false,
                message: "Workspace not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Workspace deleted successfully",
        });

    } catch(error){
        console.log("Delete workspace error", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete workspace",
        });
    }
}