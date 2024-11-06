import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { handleHttp } from "../utils/error.handle";
import { loginUser, registerUser } from "../services/auth.service";
import { handleSuccess } from "../utils/success.handle";

export const registerAuthController = async (req: Request, res: Response) => {
    try {
        const userData = plainToInstance(RegisterUserDto, req.body);
        const newUser = await registerUser(userData);
        handleSuccess(res, "Usuario registrado con éxito", newUser, 201);
    } catch (error) {
        if (error instanceof Error) {
            handleHttp(res, error.message, 400);
        } else {
            handleHttp(res, "Unexpected error", 500);
        }
    }
};

export const loginAuthController = async (req: Request, res: Response) => {
    try {
        const loginData = plainToInstance(LoginUserDto, req.body);
        const { token } = await loginUser(loginData);
        handleSuccess(res, "Inicio de sesión exitoso", { token });
    } catch (error) {
        if (error instanceof Error) {
            handleHttp(res, error.message, 400);
        } else {
            handleHttp(res, "Unexpected error", 500);
        }
    }
};
