import { Router } from "express";
import {
  createEmployeeController,
  getEmployeeController,
  getEmployeesController,
  updateEmployeeController,
} from "../controllers/employees.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";

const router = Router();

/**
 * http://localhost:3022/employees [POST]
 */

router.get("/", getEmployeesController);
router.get("/:id", getEmployeeController);
router.post("/", validationMiddleware(CreateEmployeeDto), createEmployeeController);
router.put("/:id", validationMiddleware(CreateEmployeeDto), updateEmployeeController);

export { router };
