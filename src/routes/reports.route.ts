/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Gestión de reportes de evaluación
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateReportDto } from "../dtos/create-report.dto";
import { createReportController, reportDepartmentController, reportEmployeeController } from "../controllers/reports.controller";

const router = Router();

/**
 * @swagger
 * /reports/submit:
 *   post:
 *     summary: Crear un reporte de evaluación
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateReportDto'
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/submit", authMiddleware(["admin", "manager", "employee"]), validationMiddleware(CreateReportDto), createReportController);

/**
 * @swagger
 * /reports/employee/{id}:
 *   get:
 *     summary: Obtener reporte de un empleado por ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     responses:
 *       200:
 *         description: Reporte del empleado
 *       404:
 *         description: Reporte no encontrado
 */
router.get("/employee/:id", authMiddleware(["admin"]), reportEmployeeController);

/**
 * @swagger
 * /reports/department/{id}:
 *   get:
 *     summary: Obtener reporte de un departamento por ID
 *     tags: [Reports]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del departamento
 *     responses:
 *       200:
 *         description: Reporte del departamento
 *       404:
 *         description: Reporte no encontrado
 */
router.get("/department/:id", authMiddleware(["admin"]), reportDepartmentController);

export { router };
