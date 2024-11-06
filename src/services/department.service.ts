import { CreateDepartmentDto } from "../dtos/create-department.dto";
import { DepartmentRepository } from "../repositories/department.repository";

const departmentRepository = new DepartmentRepository();

export const insertDepartment = async (createDepartmentDto: CreateDepartmentDto) => {
  const existingDepartment = await departmentRepository.findByName(createDepartmentDto.name);
  if (existingDepartment) {
    throw new Error("El departamento ya está registrado.");
  }
  return await departmentRepository.create(createDepartmentDto);
};

export const getDepartments = async () => {
  return await departmentRepository.findAll();
};

export const getDepartment = async (id: string) => {
  return await departmentRepository.findById(id);
};

export const updateDepartment = async (id: string, data: CreateDepartmentDto) => {
  return await departmentRepository.update(id, data);
};
