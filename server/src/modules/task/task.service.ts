import prisma from "../../lib/prisma";
import { TaskStatus, TaskPriority } from "../../generated/prisma";

export const createTask = async(
    title: string,
    description: string | undefined,
    projectId: string,
    userId: string,
    status?: TaskStatus,
    priority?: TaskPriority,
) => {

    const project = await prisma.project.findFirst({
        where:{
            id: projectId,
            workspace: {
                ownerId: userId,
            }
        }
    });

    if(!project){
        throw new Error("Project not found!");
    }

    const task = await prisma.task.create({
        data:{
            title,
            ...(description !== undefined && { description }),
            projectId,
            ...(status !== undefined && { status }),
            ...(priority !== undefined && {priority}),
        }
    });

    return task;
}

export const getTasks = async(
    projectId: string,
    userId: string,
) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspace:{
                ownerId: userId,
            }
        }
    })

    if(!project){
        throw new Error ('Project not found');
    }

    const tasks = await prisma.task.findMany({
        where:{
            projectId,  
        }
    });

    return tasks;
}

export const getTaskById = async (
    taskId: string,
    userId: string,
) => {
    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                workspace: {
                    ownerId: userId,
                },
            },
        },
    });
    return task;
};

export const updateTask = async (
    taskId: string,
    userId: string,
    title: string,
    description?: string,
    status?: TaskStatus,
    priority?: TaskPriority,
) => {

    const task = await prisma.task.findFirst({
        where: {
            id: taskId,
            project: {
                workspace: {
                    ownerId: userId,
                },
            },
        },
    });

    if (!task) {
        throw new Error("Task not found");
    }

    const updatedTask = await prisma.task.update({
        where: {
            id: taskId,
        },
        data: {
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(status !== undefined && { status }),
            ...(priority !== undefined && { priority }),
        },
    });
    return updatedTask;
};