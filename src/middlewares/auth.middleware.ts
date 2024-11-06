import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      handleHttp(res, "Acceso denegado", 401);
      return;
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (!roles.includes(decoded.role)) {
        handleHttp(res, "Permisos insuficientes", 403);
      }
      req.user = decoded;
      next();
    } catch (e) {
      handleHttp(res, "Token inválido", 401);
    }
  };
};
