import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_Secret } from "../index.js";



export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Mimicking the Auth endpoint, In production-grade application we will use the Access-Refresh Token based, or even Modern like Oauth Authentication and Authorization.
    
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send("No header");

    try {
        const decodedToken = jwt.verify(authHeader, JWT_Secret);
        next();

    } catch (e) {
        res.status(403).send("Not Authenticated");
    }

}