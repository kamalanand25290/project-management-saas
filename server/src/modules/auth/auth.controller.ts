import { Request, Response } from "express";
import { registerUser, loginUser, getUserById } from "./auth.service";
import { generateAccessToken } from "./auth.utils";
import { AuthRequest } from "./auth.middleware";

export const register = async (req:Request, res:Response) => {
    const {name, email, password} = req.body;
    
    if(!name?.trim() || !email?.trim() || !password?.trim()) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    try {
        const user = await registerUser(
            name.trim(),
            email.trim().toLowerCase(),
            password
        );

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data : {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error){
        if(error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS"){
            return res.status(409).json({
                success: false,
                message: "Email already exists",
            });
        }

        console.error("Registration error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
}

export const login = async (req: Request, res:Response) => {
    const { email, password } = req.body;

    if (!email?.trim() || !password?.trim()) {
        return res.status(400).json({
        success: false,
        message: "Email and password are required",
        });
    }

    try{
        const user = await loginUser(
            email.trim().toLowerCase(),
            password,
        );

        const accessToken = generateAccessToken(user.id);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data:{
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken,
            },
        });
    } catch(error){
        if(error instanceof Error && error.message === "INVALID_CREDENTIALS"){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        console.error("Login error:", error);

        return res.status(500).json({
            success: false,
            message:"Something went wrong",
        });
    }
}

export const getMe = async (req: AuthRequest, res: Response) => {

    if (!req.userId) {
        return res.status(401).json({
        success: false,
        message: "Authentication required",
        });
    }
    const user = await getUserById(req.userId);

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    return res.status(200).json({
        success: true,
        data: user,
    });
}