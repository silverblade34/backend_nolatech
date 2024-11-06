import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const authMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Acceso denegado" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Permisos insuficientes" });
      }
      req.user = decoded;
      next();
    } catch (e) {
      res.status(401).json({ message: "Token inválido" });
    }
  };
};
