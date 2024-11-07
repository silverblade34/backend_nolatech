import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";
import { createReport, getReportsByDepartment, getReportsByEmployee } from "../services/reports.service";
import { TokenPayload } from "../interfaces/token-payload.interface";

export const createReportController = async (req: Request, res: Response) => {
  try {
    const { role, entityId } = req.user as TokenPayload;
    if (role == "admin") {
      handleHttp(res, "No tienes acceso a este recurso", 403);
    }
    const questions = await createReport(req.body, entityId);
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