import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { handleHttp } from "../utils/error.handle";
import { TokenPayload } from "../interfaces/token-payload.interface";

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
      const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;

      if (!roles.includes(decoded.role)) {
        handleHttp(res, "Permisos insuficientes", 403);
        return;
      }

      req.user = decoded;
      next();
    } catch (e: any) {
      if (e.name === "TokenExpiredError") {
        handleHttp(res, "El token ha expirado", 401);
      } else {
        handleHttp(res, "Token inválido", 401);
      }
    }
  };
};
