import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, { IUser } from "../models/user.model";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

export const registerUser = async (userData: RegisterUserDto) => {
    const existingUser = await UserModel.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("El usuario ya está registrado.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new UserModel({ ...userData, password: hashedPassword });
    return await newUser.save();
};

export const loginUser = async (loginData: LoginUserDto) => {
    const user = await UserModel.findOne({ username: loginData.username });
    if (!user) {
        throw new Error("Credenciales inválidas.");
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Credenciales inválidas.");
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return { token };
};
