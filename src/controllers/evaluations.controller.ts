import { Request, Response } from "express";
import { getEvaluations, getEvaluation, insertEvaluation, updateEvaluation } from "../services/evaluations.service";
import { handleHttp } from "../utils/error.handle";
import { handleSuccess } from "../utils/success.handle";

export const getEvaluationsController = async (req: Request, res: Response) => {
  try {
    const evaluations = await getEvaluations();
    handleSuccess(res, "Evaluaciones obtenidas exitosamente", evaluations);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};

export const getEvaluationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evaluation = await getEvaluation(id);
    handleSuccess(res, "Evaluación encontrada", evaluation);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};

export const createEvaluationController = async (req: Request, res: Response) => {
  try {
    const evaluation = await insertEvaluation(req.body);
    handleSuccess(res, "Evaluación creada exitosamente", evaluation, 201);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};

export const updateEvaluationController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const evaluation = await updateEvaluation(id, req.body);
    handleSuccess(res, "Evaluación actualizada exitosamente", evaluation);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};
