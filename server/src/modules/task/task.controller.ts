import { Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import { createTask, getTaskById, getTasks, updateTask } from "./task.service";


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

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export const getTaskByIdController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{   
        const { taskId } = req.params;

        if(!taskId || typeof taskId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Task ID is required",
            });
        }

        if(!req.userId){
            return res.status(401).json({
                success: false,
                message: "Authentication required",
            });
        }

        const task = await getTaskById(taskId, req.userId);

        if(!task){
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: task,
        });

    } catch(error){
        console.error("Get task by ID error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export const updateTaskController = async(
    req: AuthRequest,
    res: Response,
) => {
    try{
        const { taskId } = req.params;

        if(!taskId || typeof taskId !== "string"){
            return res.status(400).json({
                success: false,
                message: "Task ID is required",
            });
        }
        
        const userId = req.userId;
        if(!userId){
            return res.status(401).json({
                success: false,
                message:"Authentication required"
            });
        }

        const updatedTask = await updateTask(
                taskId,
                userId,
                req.body.title,
                req.body.description,
                req.body.status,
                req.body.priority,
        );

        return res.status(200).json({
            success: true,
            data: updatedTask,
        })
    } catch(error){

        console.log("Update task error:", error);

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