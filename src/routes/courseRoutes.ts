import express from "express";
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse } from "../controllers/courseController";
import { createCourseSchema, updateCourseSchema } from "../schemas/courseSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             code: "CS101"
 *             name: "Introduction to Programming"
 *             credits: 6
 *             departmentId: "some-department-id"
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createCourseSchema), asyncHandler(createCourse));

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses with pagination
 *     tags: [Courses]
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
 *           enum: [id, code, name, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of courses retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(getCourses));

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course retrieved successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(getCourseById));

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update a course by id
 *     tags: [Courses]
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
 *             $ref: '#/components/schemas/Course'
 *           example:
 *             name: "Advanced Programming"
 *             credits: 5
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", validate(updateCourseSchema), asyncHandler(updateCourse));

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course by id
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(deleteCourse));

export default router;
