import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { loginAuthController, registerAuthController } from "../controllers/auth.controller";

const router = Router();

router.post("/register", validationMiddleware(RegisterUserDto), registerAuthController);
router.post("/login", validationMiddleware(LoginUserDto), loginAuthController);

export { router };
