import prisma from "../../lib/prisma";

export const createWorkspace = async(
    name: string,
    ownerId: string
) => {
    return prisma.workspace.create({
        data: {
            name,
            ownerId,
        },
    });
}

export const getUserWorkspaces = async(
    userId: string,
) => {
    return prisma.workspace.findMany({
        where:{
            ownerId: userId,
        },
        orderBy:{
            createdAt: "desc",
        },
    });
}

export const getWorkspaceById = async(
    workspaceId: string,
    userId: string
) => {
    return prisma.workspace.findFirst({
        where: {
            id: workspaceId,
            ownerId: userId,
        },
    });
}

export const updateWorkspace = async(
    workspaceId: string,
    userId: string,
    name: string,
) => {
    const workspace = await prisma.workspace.findFirst({
        where:{
            id: workspaceId,
            ownerId: userId,
        }
    });

    if(!workspace){
        return null;
    }

    return prisma.workspace.update({
        where: {
            id: workspaceId,
        },
        data:{
            name,
        }
    });
}

export const deleteWorkspace = async(
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
        return null;
    }

    return prisma.workspace.delete({
        where:{
            id: workspaceId,
        }
    });
}