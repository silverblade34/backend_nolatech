import { Request, Response } from "express";
import { getDepartments } from "../../src/services/departments.service";
import { getDepartmentsController } from "../../src/controllers/departments.controller";

jest.mock("../../src/services/departments.service");

describe("getDepartmentsController", () => {
  it("should return a successful response with departments data", async () => {
    const mockDepartments = [{ id: 1, name: "Venta" }, { id: 2, name: "RH" }];
    (getDepartments as jest.Mock).mockResolvedValue(mockDepartments);

    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;

    await getDepartmentsController(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Departamentos obtenidos exitosamente",
      data: mockDepartments,
    });
  });
});
