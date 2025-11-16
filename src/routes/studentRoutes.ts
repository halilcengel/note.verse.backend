import {
  createStudent,
  deleteStudent,
  getStudentById,
  getStudentByUserId,
  getStudentCourses,
  getStudentCourseOfferings,
  getStudentCurrentSemesterCourses,
  getStudentEnrollments,
  getStudents,
  updateStudent
} from "../controllers/studentController";
import { createStudentSchema, updateStudentSchema } from "../schemas/studentSchema";

import { asyncHandler } from "../middleware/asyncHandler";
import express from "express";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/students:
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             studentNumber: "20250001"
 *             enrollmentYear: 2025
 *             gpa: 3.32
 *             userId: "some-user-id"
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(createStudentSchema), asyncHandler(createStudent));

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: Get all students with pagination
 *     tags: [Students]
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
 *           enum: [id, studentNumber, createdAt, updatedAt]
 *           default: createdAt
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *     responses:
 *       200:
 *         description: List of students retrieved successfully
 *       400:
 *         description: Bad request - Invalid query parameters
 *       500:
 *         description: Internal server error
 */
router.get("/", asyncHandler(getStudents));

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get a student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", asyncHandler(getStudentById));

/**
 * @swagger
 * /api/students/user/{userId}:
 *   get:
 *     summary: Get a student by user id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.get("/user/:userId", asyncHandler(getStudentByUserId));
/**
 * @swagger
 * /api/students/{id}:
 *   put:
 *     summary: Update a student by id
 *     tags: [Students]
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
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             gpa: 3.75
 *             enrollmentYear: 2025
 *     responses:
 *       200:
 *         description: Student updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", validate(updateStudentSchema), asyncHandler(updateStudent));

/**
 * @swagger
 * /api/students/{id}:
 *   delete:
 *     summary: Delete a student by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", asyncHandler(deleteStudent));


/**
 * @swagger
 * /api/students/{id}/courses:
 *   get:
 *     summary: Get a student's courses by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Courses retrieved successfully
 *       404:
 *         description: Courses not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/courses", asyncHandler(getStudentCourses));

/**
 * @swagger
 * /api/students/{id}/course-offerings:
 *   get:
 *     summary: Get a student's course offerings (enrolled courses with full details)
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course offerings retrieved successfully
 *       404:
 *         description: Course offerings not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/course-offerings", asyncHandler(getStudentCourseOfferings));

/**
 * @swagger
 * /api/students/{id}/current-semester:
 *   get:
 *     summary: Get a student's current semester course offerings
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: semester
 *         required: true
 *         schema:
 *           type: string
 *           enum: [Fall, Spring, Summer]
 *       - in: query
 *         name: academicYear
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\d{4}-\d{4}$'
 *     responses:
 *       200:
 *         description: Current semester courses retrieved successfully
 *       400:
 *         description: Bad request - Missing semester or academicYear
 *       500:
 *         description: Internal server error
 */
router.get("/:id/current-semester", asyncHandler(getStudentCurrentSemesterCourses));

/**
 * @swagger
 * /api/students/{id}/enrollments:
 *   get:
 *     summary: Get a student's enrollments by id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enrollments retrieved successfully
 *       404:
 *         description: Enrollments not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id/enrollments", asyncHandler(getStudentEnrollments));

export default router;
