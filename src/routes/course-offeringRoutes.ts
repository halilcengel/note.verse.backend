import express from "express";
import {
  createCourseOffering,
  getCourseOfferings,
  getCourseOfferingById,
  getCourseOfferingsBySemester,
  updateCourseOffering,
  deleteCourseOffering
} from "../controllers/course-offeringController";
import { createCourseOfferingSchema, updateCourseOfferingSchema} from "../schemas/course-offeringSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/course-offerings:
 *   post:
 *     summary: Create a new course offering
 *     tags: [CourseOfferings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseOffering'
 *           example:
 *             courseId: "course-id-123"
 *             teacherId: "teacher-id-456"
 *             semester: "Fall"
 *             academicYear: "2024-2025"
 *             quota: 40
 *     responses:
 *       201:
 *         description: Course offering created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post( "/", validate(createCourseOfferingSchema), asyncHandler(createCourseOffering));

/**
 * @swagger
 * /api/course-offerings:
 *   get:
 *     summary: Get all course offerings with pagination
 *     tags: [CourseOfferings]
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
 *           enum: [id, semester, academicYear, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of course offerings retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(getCourseOfferings));

/**
 * @swagger
 * /api/course-offerings/semester/filter:
 *   get:
 *     summary: Get course offerings filtered by semester and academic year
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: query
 *         name: semester
 *         schema:
 *           type: string
 *           enum: [Fall, Spring, Summer]
 *         description: Semester to filter by
 *       - in: query
 *         name: academicYear
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{4}$'
 *         description: Academic year to filter by (format YYYY-YYYY)
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
 *           enum: [id, semester, academicYear, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: Filtered course offerings retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/semester/filter", asyncHandler(getCourseOfferingsBySemester));

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   get:
 *     summary: Get a course offering by id
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course offering retrieved successfully
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(getCourseOfferingById));

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   put:
 *     summary: Update a course offering by id
 *     tags: [CourseOfferings]
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
 *             $ref: '#/components/schemas/CourseOffering'
 *           example:
 *             quota: 50
 *             semester: "Spring"
 *     responses:
 *       200:
 *         description: Course offering updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Internal server error
 */
router.put( "/:id", validate(updateCourseOfferingSchema), asyncHandler(updateCourseOffering));

/**
 * @swagger
 * /api/course-offerings/{id}:
 *   delete:
 *     summary: Delete a course offering by id
 *     tags: [CourseOfferings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course offering deleted successfully
 *       404:
 *         description: Course offering not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(deleteCourseOffering));

export default router;