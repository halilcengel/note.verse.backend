import express from "express";
import { login, register, verifyToken } from "../controllers/authController";
import { loginSchema, registerSchema } from "../schemas/authSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *           example:
 *             email: "student@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post("/login", validate(loginSchema), asyncHandler(login));

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *               - tcNo
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               name:
 *                 type: string
 *               tcNo:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, teacher, student]
 *               studentNumber:
 *                 type: string
 *               enrollmentYear:
 *                 type: string
 *           example:
 *             email: "student@example.com"
 *             password: "password123"
 *             name: "John Doe"
 *             tcNo: "12345678901"
 *             role: "student"
 *             studentNumber: "20240001"
 *             enrollmentYear: "2024"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", validate(registerSchema), asyncHandler(register));

/**
 * @swagger
 * /api/auth/verify:
 *   get:
 *     summary: Verify JWT token
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Invalid or expired token
 *       500:
 *         description: Internal server error
 */
router.get("/verify", asyncHandler(verifyToken));

export default router;
