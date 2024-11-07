/**
 * @swagger
 * tags:
 *   name: Employees
 *   description: Gestión de empleados
 */

import { Router } from "express";
import {
  createEmployeeController,
  getEmployeeController,
  getEmployeesController,
  updateEmployeeController,
} from "../controllers/employees.controller";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateEmployeeDto } from "../dtos/create-employee.dto";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de empleados
 *       500:
 *         description: Error al obtener los empleados
 */
router.get("/", authMiddleware(["admin", "manager"]), getEmployeesController);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     tags: [Employees]
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
 *         description: Datos del empleado
 *       404:
 *         description: Empleado no encontrado
 */
router.get("/:id", authMiddleware(["admin", "manager"]), getEmployeeController);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeDto'
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post("/", authMiddleware(["admin"]), validationMiddleware(CreateEmployeeDto), createEmployeeController);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Actualizar un empleado por ID
 *     tags: [Employees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del empleado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateEmployeeDto'
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Empleado no encontrado
 */
router.put("/:id", authMiddleware(["admin"]), validationMiddleware(CreateEmployeeDto), updateEmployeeController);

export { router };
