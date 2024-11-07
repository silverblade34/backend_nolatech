/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Gestiona los departamentos
 */

import { Router } from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createDepartmentController, getDepartmentController, getDepartmentsController, updateDepartmentController } from "../controllers/departments.controller";
import { CreateDepartmentDto } from "../dtos/create-department.dto";

const router = Router();

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Obtener todos los departamentos
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de departamentos
 *       500:
 *         description: Error al obtener los departamentos
 */
router.get("/", getDepartmentsController);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Obtener un departamento por ID
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del departamento
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Departamento encontrado
 *       400:
 *         description: Error en la búsqueda del departamento
 */
router.get("/:id", getDepartmentController);

/**
 * @swagger
 * /departments:
 *   post:
 *     summary: Crear un nuevo departamento
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartmentDto'
 *     responses:
 *       201:
 *         description: Departamento creado exitosamente
 *       400:
 *         description: Error al crear el departamento
 */
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateDepartmentDto), createDepartmentController);

/**
 * @swagger
 * /departments/{id}:
 *   put:
 *     summary: Actualizar un departamento
 *     tags: [Departments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del departamento
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartmentDto'
 *     responses:
 *       200:
 *         description: Departamento actualizado exitosamente
 *       400:
 *         description: Error al actualizar el departamento
 */
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateDepartmentDto), updateDepartmentController);

export { router };
