import request from "supertest";
import app from "../../src/app";
import { insertDepartment } from "../../src/services/departments.service";

jest.mock("../../src/services/departments.service");

describe("POST /api/departments", () => {
    it("should create a department successfully", async () => {
        const newDepartment = { name: "IT" };
        const mockDepartment = { id: 1, name: "IT" };
        (insertDepartment as jest.Mock).mockResolvedValue(mockDepartment);

        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({ username: "marcos", password: "123456" });

        const token = loginResponse.body.data.token;

        const response = await request(app)
            .post("/api/departments")
            .set("Authorization", `Bearer ${token}`)
            .send(newDepartment)
            .expect(201);

        expect(response.body).toEqual({
            message: "Departamento creado exitosamente",
            data: mockDepartment,
        });
    });
});
