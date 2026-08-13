import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if(!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Authetication header is missing",
        });
    }

    const [scheme, token] = authHeader.split(" ");

    if(scheme !== "Bearer" || !token){
        return res.status(401).json({
            success: false,
            message: "Invalid Authorisation header",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded === "string" || !("userId" in decoded)){
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        req.userId = decoded.userId as string;

        next();

    } catch(error){
        return res.status(401).json({
            success: false,
            message: "Invalid of expired token",
        });
    }
}