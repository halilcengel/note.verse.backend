import express from "express";
import { createTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher }
from "../controllers/teacherController";
import { createTeacherSchema, updateTeacherSchema } from "../schemas/teacherSchema";

import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/teachers:
 *   post:
 *     summary: Create a new teacher
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *           example:
 *             title: "Prof."
 *             departmentId: "dep123"
 *             officeNumber: "B202"
 *             phone: "+90 555 123 4567"
 *             userId: "usr789"
 *     responses:
 *       201:
 *         description: Teacher created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createTeacherSchema), asyncHandler(createTeacher));

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: Get all teachers with pagination
 *     tags: [Teachers]
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
 *           enum: [id, title, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of teachers retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(getTeachers));

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Get a teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher retrieved successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(getTeacherById));

/**
 * @swagger
 * /api/teachers/{id}:
 *   put:
 *     summary: Update a teacher by id
 *     tags: [Teachers]
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
 *             $ref: '#/components/schemas/Teacher'
 *           example:
 *             title: "Assoc. Prof."
 *             officeNumber: "C303"
 *             phone: "+90 555 987 6543"
 *     responses:
 *       200:
 *         description: Teacher updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", validate(updateTeacherSchema), asyncHandler(updateTeacher));

/**
 * @swagger
 * /api/teachers/{id}:
 *   delete:
 *     summary: Delete a teacher by id
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(deleteTeacher));

export default router;
