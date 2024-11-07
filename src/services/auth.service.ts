import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository";
import { RegisterUserDto } from "../dtos/register-user.dto";
import { LoginUserDto } from "../dtos/login-user.dto";
import { EmployeeRepository } from "../repositories/employee.repository";
import { Employee } from "../interfaces/employee.interface";

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const userRepository = new UserRepository();
const employeeRepository = new EmployeeRepository();

export const registerUser = async (userData: RegisterUserDto) => {
    const existingUser = await userRepository.findOneByUsername(userData.username);
    if (existingUser) {
        throw new Error("El usuario ya está registrado.");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await userRepository.create({ username: userData.username, password: hashedPassword, role: "employee" });

    if (!newUser) {
        throw new Error("Hubo un error al crear el usuario");
    }
    const employeeToCreate: Employee = {
        name: userData.name,
        position: userData.position,
        departmentId: userData.departmentId,
        email: userData.email,
        phone: userData.phone,
        hireDate: userData.hireDate,
        role: "employee",
        userId: newUser._id,
    };

    const responseInsert = await employeeRepository.create(employeeToCreate);
    return responseInsert;
};

export const loginUser = async (loginData: LoginUserDto) => {
    const user = await userRepository.findOneByUsername(loginData.username);
    if (!user) {
        throw new Error("Credenciales inválidas.");
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
        throw new Error("Credenciales inválidas.");
    }
    let name = "ADMIN"
    let position = "ADMIN"
    let entityId = ""
    if (user.role != "admin") {
        const findEmployee = await employeeRepository.findOneByUserId(user._id.toString());
        if (!findEmployee) {
            throw new Error("El empleado no se encuentra registrado");
        }
        entityId = findEmployee._id.toString();
        name = findEmployee.name;
        position = findEmployee.position;
    }

    const token = jwt.sign({ id: user._id, role: user.role, entityId }, JWT_SECRET, { expiresIn: "10h" });
    return { token, name, position, user: user.username, role: user.role };
};
