/**
 * @swagger
 * tags:
 *   name: Evaluations
 *   description: Gestión de evaluaciones
 */

import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createEvaluationController, getEvaluationController, getEvaluationsController, updateEvaluationController } from "../controllers/evaluations.controller";
import { CreateEvaluationDto } from "../dtos/create-evaluation.dto";

const router = Router();

/**
 * @swagger
 * /evaluations:
 *   get:
 *     summary: Obtener todas las evaluaciones
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 *       500:
 *         description: Error al obtener las evaluaciones
 */
router.get("/", authMiddleware(["admin", "manager", "employee"]), getEvaluationsController);

/**
 * @swagger
 * /evaluations/{id}:
 *   get:
 *     summary: Obtener una evaluación por ID
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Datos de la evaluación
 *       404:
 *         description: Evaluación no encontrada
 */
router.get("/:id", authMiddleware(["admin", "manager", "employee"]), getEvaluationController);

/**
 * @swagger
 * /evaluations:
 *   post:
 *     summary: Crear una nueva evaluación
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvaluationDto'
 *     responses:
 *       201:
 *         description: Evaluación creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateEvaluationDto), createEvaluationController);

/**
 * @swagger
 * /evaluations/{id}:
 *   put:
 *     summary: Actualizar una evaluación por ID
 *     tags: [Evaluations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la evaluación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEvaluationDto'
 *     responses:
 *       200:
 *         description: Evaluación actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Evaluación no encontrada
 */
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateEvaluationDto), updateEvaluationController);

export { router };
