import { EmployeeRepository } from "../repositories/employee.repository";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import { Employee } from "../interfaces/employee.interface";
import { User } from "../interfaces/user.interface";
import mongoose from "mongoose";

const employeeRepository = new EmployeeRepository();
const userRepository = new UserRepository();

export const insertEmployee = async (createEmployeeDto: CreateEmployeeDto) => {
  const [existingEmployee, existingUser] = await Promise.all([
    employeeRepository.findOneByEmail(createEmployeeDto.email),
    userRepository.findOneByUsername(createEmployeeDto.username)
  ]);

  if (existingEmployee) {
    throw new Error("El correo ya se encuentra registrado");
  }

  if (existingUser) {
    throw new Error("El usuario ya está registrado.");
  }

  const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);
  const userData: User = {
    username: createEmployeeDto.username,
    password: hashedPassword,
    role: "employee",
  };

  const newUser = await userRepository.create(userData);
  if (!newUser) {
    throw new Error("Hubo un error al crear el usuario");
  }

  const employeeToCreate: Employee = {
    name: createEmployeeDto.name,
    position: createEmployeeDto.position,
    department: createEmployeeDto.department,
    email: createEmployeeDto.email,
    phone: createEmployeeDto.phone,
    hireDate: createEmployeeDto.hireDate,
    userId: newUser._id,
  };

  const responseInsert = await employeeRepository.create(employeeToCreate);
  return responseInsert;
};

export const getEmployees = async () => {
  const findEmployees = await employeeRepository.findAll();
  return findEmployees;
};

export const getEmployee = async (id: string) => {
  const findEmployee = await employeeRepository.findWithUser(id);
  return findEmployee;
};

export const updateEmployees = async (id: string, data: CreateEmployeeDto) => {
  const findEmployee = await employeeRepository.findOneById(id);
  if (!findEmployee) {
    throw new Error("El empleado no se encuentra registrado");
  }
  const findUser = await userRepository.findOneById(findEmployee.userId.toString());
  if (!findUser) {
    throw new Error("Usuario asociado al empleado no encontrado");
  }

  if (data.username !== findUser.username) {
    const existingUser = await userRepository.findOneByUsername(data.username);
    if (existingUser) {
      throw new Error("El nombre de usuario ya está registrado");
    }
  }

  let hashedPassword = findUser.password;
  if (data.password != findUser.password) {
    hashedPassword = await bcrypt.hash(data.password, 10);
  }

  const updatedUserData: User = {
    username: data.username,
    password: hashedPassword,
    role: "employee",
  };
  await userRepository.update(findUser._id.toString(), updatedUserData);

  const employeeToUpdate: Employee = {
    name: data.name,
    position: data.position,
    department: data.department,
    email: data.email,
    phone: data.phone,
    hireDate: data.hireDate,
    userId: findEmployee.userId,
  };

  const responseItem = await employeeRepository.update(id, employeeToUpdate);
  if (!responseItem) {
    throw new Error("Error al actualizar el empleado");
  }

  const employeeData = responseItem instanceof mongoose.Document ? responseItem.toObject() : responseItem;

  const updateEmployeeUser = {
    ...employeeData,
    user: updatedUserData,
  };

  return updateEmployeeUser;
};
