import prisma from "../../lib/prisma";

export const createProject = async (
    name: string,
    description: string | undefined,
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