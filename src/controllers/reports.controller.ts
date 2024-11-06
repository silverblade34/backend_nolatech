import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";
import { createReport } from "../services/reports.service";

export const createReportController = async (req: Request, res: Response) => {
  try {
    const questions = await createReport(req.body);
    handleSuccess(res, "Se ha registrado el reporte de formulario correctamente", questions);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};