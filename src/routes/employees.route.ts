import { Router } from "express";
import {
  createEmployeeController,
  getEmployeeController,
  getEmployeesController,
  updateEmployeeController,
} from "../controllers/employees.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * http://localhost:3022/employees [POST]
 */

router.get("/", getEmployeesController);
router.get("/:id", getEmployeeController);
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateEmployeeDto), createEmployeeController);
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateEmployeeDto), updateEmployeeController);

export { router };
