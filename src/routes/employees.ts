import { Request, Response, Router } from "express";
import {
  createEmployee,
  getEmployees,
} from "../controllers/employees.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";

const router = Router();

/**
 * http://localhost:3022/employees [POST]
 */

router.get("/", getEmployees);
router.get("/:id", getEmployees);
router.post("/", validationMiddleware(CreateEmployeeDto), createEmployee);
router.put("/:id", getEmployees);
router.delete("/:id", getEmployees);

export { router };
