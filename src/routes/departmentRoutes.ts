import express from "express";
import { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment} from "../controllers/departmentController";
import { createDepartmentSchema, updateDepartmentSchema } from "../schemas/departmentSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *           example:
 *             name: "Computer Engineering"
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createDepartmentSchema), asyncHandler(createDepartment));

/**
 * @swagger
 * /api/departments:
 *   get:
 *     summary: Get all departments with pagination
 *     tags: [Departments]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [id, name, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of departments retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(getDepartments));

/**
 * @swagger
 * /api/departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department retrieved successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(getDepartmentById));

/**
 * @swagger
 * /api/departments/{id}:
 *   put:
 *     summary: Update a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Department'
 *           example:
 *             name: "Electrical and Electronics Engineering"
 *     responses:
 *       200:
 *         description: Department updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", validate(updateDepartmentSchema), asyncHandler(updateDepartment));

/**
 * @swagger
 * /api/departments/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department deleted successfully
 *       404:
 *         description: Department not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(deleteDepartment));

export default router;
