import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createEvaluationController, getEvaluationController, getEvaluationsController, updateEvaluationController } from "../controllers/evaluations.controller";
import { CreateEvaluationDto } from "../dtos/create-evaluation.dto";

const router = Router();

router.get("/", authMiddleware(["admin", "manager", "employee"]), getEvaluationsController);
router.get("/:id", authMiddleware(["admin", "manager", "employee"]), getEvaluationController);
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateEvaluationDto), createEvaluationController);
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateEvaluationDto), updateEvaluationController);

export { router };
