import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { getQuestionsController, getQuestionController, createQuestionController, updateQuestionController } from "../controllers/questions.controller";
import { CreateQuestionDto } from "../dtos/create-question.dto";

const router = Router();

router.get("/", authMiddleware(["admin", "manager", "employee"]), getQuestionsController);
router.get("/:id", authMiddleware(["admin", "manager", "employee"]), getQuestionController);
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateQuestionDto), createQuestionController);
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateQuestionDto), updateQuestionController);

export { router };
