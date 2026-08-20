import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createTask, getTasks } from "./task.service";


export const createTaskController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message:"Authentication required"
            });
        }
        const createdTask = await createTask(
                req.body.title,
                req.body.description,
                req.body.projectId,
                userId,
                req.body.status,
                req.body.priority,
        );

        return res.status(200).json({
            success: true,
            data: createdTask,
        })
    } catch(error){

        console.error("Create task error:", error);

        if(error instanceof Error){
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });

    }
}

export const getTasksController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const projectId = req.query.projectId;

        if(!projectId || typeof projectId !== 'string'){
            return res.status(400).json({
                success: false,
                message:"Project ID is required."
            });
        }

        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message:"Authentication required"
            });
        }

        const tasks = await getTasks(projectId, userId);

        return res.status(200).json({
            success: true,
            data: tasks,
        });

    } catch(error){
        console.error("Get tasks error:", error);

        if(error instanceof Error){
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
    }
}