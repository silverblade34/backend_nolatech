import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";
import { insertEmployee, getEmployees, getEmployee, updateEmployees } from "../services/employees.service";

export const getEmployeesController = async (req: Request, res: Response) => {
  try {
    const employees = await getEmployees();
    handleSuccess(res, "Empleados obtenidos exitosamente", employees);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};

export const getEmployeeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await getEmployee(id);
    handleSuccess(res, "Empleado encontrado", employee);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};

export const createEmployeeController = async (req: Request, res: Response) => {
  try {
    const response = await insertEmployee(req.body);
    handleSuccess(res, "Empleado creado con éxito", response, 201);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};

export const updateEmployeeController = async ({ params, body }: Request, res: Response) => {
  try {
    const { id } = params;
    const updatedEmployee = await updateEmployees(id, body);
    handleSuccess(res, "Empleado actualizado con éxito", updatedEmployee);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};