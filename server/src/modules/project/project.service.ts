import prisma from "../../lib/prisma";

export const createProject = async (
    name: string,
    description: string,
    workspaceId: string,
    userId: string,
) => {
    const workspace = await prisma.workspace.findFirst({
        where:{
            id: workspaceId,
            ownerId: userId,
        }
    });

    if(!workspace){
        throw new Error("Workspace not found or access denied");
    }

    const project = await prisma.project.create({
        data:{
            name,
            description,
            workspaceId,
        }
    });

    return project;
}

export const getProjects = async ( 
    userId: string,
    workspaceId?: string,
) => {
    const projects = await prisma.project.findMany({
        where:{
            workspace: {
                ownerId: userId,
                ...(workspaceId && {
                    id: workspaceId,
                }),
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return projects;
    
}

export const getProjectById = async (
    projectId: string,
    userId: string,
) => {
    const project = await prisma.project.findFirst({
        where: {
            id: projectId,
            workspace: {
                ownerId: userId, 
            }
        }
    });

    return project;
}

export const updateProject = async (
    projectId: string,
    userId: string,
    name?: string,
    description?: string,
) => {
    const project = await prisma.project.findFirst({
        where:{
            id: projectId,
            workspace:{
                ownerId: userId,
            }
        }
    });

    if (!project) {
        throw new Error("Project not found");
    }
    
    const updatedProject = await prisma.project.update({
        data: {
            ...(name!== undefined && {
                name: name,
            }),
            ...(description!== undefined && {
                description: description,
            }),
        },
        where: {
            id: projectId,
        }
    });

    return updatedProject;
}

export const deleteProject = async (
    projectId: string,
    userId: string,
) => {
    const project = await prisma.project.findFirst({
        where:{
            id: projectId,
            workspace:{
                ownerId: userId,
            }
        }
    });

    if (!project) {
        throw new Error("Project not found");
    }

    const deletedProject = await prisma.project.delete({
        where:{
            id: projectId,
        }
    });

    return deletedProject;
}