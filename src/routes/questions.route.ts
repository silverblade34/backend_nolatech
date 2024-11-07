/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Gestión de preguntas de evaluación
 */

import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { getQuestionsController, getQuestionController, createQuestionController, updateQuestionController } from "../controllers/questions.controller";
import { CreateQuestionDto } from "../dtos/create-question.dto";

const router = Router();

/**
 * @swagger
 * /questions:
 *   get:
 *     summary: Obtener todas las preguntas
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de preguntas
 *       500:
 *         description: Error al obtener las preguntas
 */
router.get("/", authMiddleware(["admin", "manager", "employee"]), getQuestionsController);

/**
 * @swagger
 * /questions/{id}:
 *   get:
 *     summary: Obtener una pregunta por ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     responses:
 *       200:
 *         description: Datos de la pregunta
 *       404:
 *         description: Pregunta no encontrada
 */
router.get("/:id", authMiddleware(["admin", "manager", "employee"]), getQuestionController);

/**
 * @swagger
 * /questions:
 *   post:
 *     summary: Crear una nueva pregunta
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionDto'
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateQuestionDto), createQuestionController);

/**
 * @swagger
 * /questions/{id}:
 *   put:
 *     summary: Actualizar una pregunta por ID
 *     tags: [Questions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateQuestionDto'
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Pregunta no encontrada
 */
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateQuestionDto), updateQuestionController);

export { router };
