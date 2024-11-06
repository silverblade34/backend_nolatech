import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReportDto } from "../dtos/create-report.dto";
import { createReportController, reportDepartmentController, reportEmployeeController } from "../controllers/reports.controller";

const router = Router();

router.post("/submit", authMiddleware(["admin", "manager", "employee"]), validationMiddleware(CreateReportDto), createReportController);
router.get("/employee/:id", authMiddleware(["admin"]), reportEmployeeController);
router.get("/department/:id", authMiddleware(["admin"]), reportDepartmentController);
export { router };
