import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { insertQuestion, getQuestions, getQuestion, updateQuestion } from "../services/questions.service";
import { handleSuccess } from "../utils/success.handle";

export const getQuestionsController = async (req: Request, res: Response) => {
  try {
    const questions = await getQuestions();
    handleSuccess(res, "Preguntas obtenidas exitosamente", questions);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 500);
  }
};

export const getQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const question = await getQuestion(id);
    handleSuccess(res, "Pregunta encontrada", question);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};

export const createQuestionController = async (req: Request, res: Response) => {
  try {
    const question = await insertQuestion(req.body);
    handleSuccess(res, "Pregunta creada exitosamente", question, 201);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};

export const updateQuestionController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await updateQuestion(id, req.body);
    handleSuccess(res, "Pregunta actualizada exitosamente", updatedQuestion);
  } catch (error) {
    handleHttp(res, error instanceof Error ? error.message : "Error inesperado", 400);
  }
};
