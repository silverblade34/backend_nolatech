import { Request, Response } from "express";
import { getQuestions } from "../../src/services/questions.service";
import { getQuestionsController } from "../../src/controllers/questions.controller";

jest.mock("../../src/services/questions.service");

describe("getQuestionsController", () => {
  it("should return a successful response with questions data", async () => {
    const mockQuestions = [{ id: 1, text: "Pregunta 1" }, { id: 2, text: "Pregunta 2" }];
    (getQuestions as jest.Mock).mockResolvedValue(mockQuestions);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getQuestionsController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Preguntas obtenidas exitosamente",
      data: mockQuestions,
    });
  });
});
