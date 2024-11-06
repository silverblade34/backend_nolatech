import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";
import { createReport, getReportsByDepartment, getReportsByEmployee } from "../services/reports.service";

export const createReportController = async (req: Request, res: Response) => {
  try {
    const questions = await createReport(req.body);
    handleSuccess(res, "Se ha registrado el reporte de formulario correctamente", questions);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};

export const reportEmployeeController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const questions = await getReportsByEmployee(id);
    handleSuccess(res, "Reporte de evaluaciones registradas por empleado", questions);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};

export const reportDepartmentController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const questions = await getReportsByDepartment(id);
    handleSuccess(res, "Reporte de evaluaciones registradas por departamento", questions);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};