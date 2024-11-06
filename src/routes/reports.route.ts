import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReportDto } from "../dtos/create-report.dto";
import { createReportController } from "../controllers/reports.controller";

const router = Router();

router.post("/submit", authMiddleware(["admin", "manager", "employee"]), validationMiddleware(CreateReportDto), createReportController);

export { router };
