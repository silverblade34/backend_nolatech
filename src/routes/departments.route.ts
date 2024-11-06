import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createDepartmentController, getDepartmentController, getDepartmentsController, updateDepartmentController } from "../controllers/departments.controller";
import { CreateDepartmentDto } from "../dtos/create-department.dto";

const router = Router();

router.get("/", authMiddleware(["admin", "manager"]), getDepartmentsController);
router.get("/:id", authMiddleware(["admin", "manager"]), getDepartmentController);
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateDepartmentDto), createDepartmentController);
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateDepartmentDto), updateDepartmentController);

export { router };
