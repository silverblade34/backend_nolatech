import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReportDto } from "../dtos/create-report.dto";
import { createReportController, reportDepartmentController, reportEmployeeController } from "../controllers/reports.controller";

const router = Router();

router.post("/submit", authMiddleware(["admin", "manager", "employee"]), validationMiddleware(CreateReportDto), createReportController);
router.post("/employee/:id", authMiddleware(["admin"]), reportEmployeeController);
router.post("/department/:id", authMiddleware(["admin"]), reportDepartmentController);
export { router };
