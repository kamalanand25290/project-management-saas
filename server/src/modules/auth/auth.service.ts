import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        }
    });
    if(existingUser){
        throw new Error("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10); //The 10 is the bcrypt cost factor (salt rounds). We're deliberately not storing: 12345678. We're storing something resembling: $2b$10$... The exact hash will be different every time.

    const user = await prisma.user.create({
        data:{
            name,
            email,
            password: hashedPassword,
        }
    });

    return user;
}

export const loginUser = async(
    email:string,
    password: string,
) => {
    const user = await prisma.user.findUnique({
        where:{
            email,
        }
    });

    if(!user){
        throw new Error("INVALID_CREDENTIALS");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password,
    );

    if(!isPasswordValid){
        throw new Error("INVALID_CREDENTIALS")
    }

    return user;
}

export const getUserById = async(userId: string) => {
    const user = await prisma.user.findUnique({
        where:{
            id: userId,
        },
        select:{
            id: true,
            name: true,
            email: true,
            createdAt: true,
        },
    });

    return user;
}