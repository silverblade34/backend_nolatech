import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { loginAuthController, registerAuthController } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Gestiona la autenticación de usuarios (registro y login)
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserDto'
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       400:
 *         description: Error en los datos de entrada
 *       500:
 *         description: Error al registrar el usuario
 */
router.post("/register", validationMiddleware(RegisterUserDto), registerAuthController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con las credenciales de usuario
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUserDto'
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso, devuelve el token de autenticación
 *       401:
 *         description: Credenciales incorrectas
 *       500:
 *         description: Error al iniciar sesión
 */
router.post("/login", validationMiddleware(LoginUserDto), loginAuthController);

export { router };
