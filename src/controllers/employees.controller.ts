import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";
import { insertEmployee, getEmployees, getEmployee, updateEmployees } from "../services/employees.service";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { plainToInstance } from "class-transformer";

export const getEmployeesController = async (req: Request, res: Response) => {
  try {
    const employees = await getEmployees();
    handleSuccess(res, "Empleados obtenidos exitosamente", employees);
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, error.message, 400);
    } else {
      handleHttp(res, "Unexpected error", 500);
    }
  }
};

export const getEmployeeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await getEmployee(id);
    handleSuccess(res, "Empleado encontrado", employee);
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, error.message, 400);
    } else {
      handleHttp(res, "Unexpected error", 500);
    }
  }
};

export const createEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeDto = plainToInstance(CreateEmployeeDto, req.body);
    const response = await insertEmployee(employeeDto);
    handleSuccess(res, "Empleado creado con éxito", response, 201);
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, error.message, 400);
    } else {
      handleHttp(res, "Unexpected error", 500);
    }
  }
};

export const updateEmployeeController = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const updatedEmployee = await updateEmployees(id, body);
    handleSuccess(res, "Empleado actualizado con éxito", updatedEmployee);
  } catch (error) {
    if (error instanceof Error) {
      handleHttp(res, error.message, 400);
    } else {
      handleHttp(res, "Unexpected error", 500);
    }
  }
};