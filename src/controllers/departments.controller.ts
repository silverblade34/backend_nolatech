import { Request, Response } from "express";
import { handleSuccess } from "../utils/success.handle";
import { handleHttp } from "../utils/error.handle";
import { getDepartment, getDepartments, insertDepartment, updateDepartment } from "../services/departments.service";

export const getDepartmentsController = async (req: Request, res: Response) => {
  try {
    const departments = await getDepartments();
    handleSuccess(res, "Departamentos obtenidos exitosamente", departments);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 500);
  }
};

export const getDepartmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await getDepartment(id);
    handleSuccess(res, "Departamento encontrado", department);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};

export const createDepartmentController = async (req: Request, res: Response) => {
  try {
    const department = await insertDepartment(req.body);
    handleSuccess(res, "Departamento creado exitosamente", department, 201);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};

export const updateDepartmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const department = await updateDepartment(id, req.body);
    handleSuccess(res, "Departamento actualizado exitosamente", department);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Unexpected error", 400);
  }
};
