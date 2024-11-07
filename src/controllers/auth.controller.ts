import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { loginUser, registerUser } from "../services/auth.service";
import { handleSuccess } from "../utils/success.handle";

export const registerAuthController = async (req: Request, res: Response) => {
    try {
        const newUser = await registerUser(req.body);
        handleSuccess(res, "Usuario registrado con éxito", newUser, 201);
    } catch (error) {
        handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
    }
};

export const loginAuthController = async (req: Request, res: Response) => {
    try {
        const data = await loginUser(req.body);
        handleSuccess(res, "Inicio de sesión exitoso", data);
    } catch (error) {
        handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
    }
};
