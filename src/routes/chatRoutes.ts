import express from "express";
import { sendMessage } from "../controllers/chatController";
import { chatRequestSchema } from "../schemas/chatSchema";
import { asyncHandler } from "../middleware/asyncHandler";
import { validate } from "../middleware/validation";

const router = express.Router();

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Send a message to the chat service
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               thread_id:
 *                 type: string
 *               url:
 *                 type: string
 *               school:
 *                 type: string
 *               department:
 *                 type: string
 *           example:
 *             message: "7 kasımda hangi sınavlar var ?"
 *             thread_id: "test-4"
 *             url: "https://eem.bakircay.edu.tr"
 *             school: "Izmir Bakircay Universitesi"
 *             department: "Elektrik Elektronik Mühendisliği"
 *     responses:
 *       200:
 *         description: Chat response stream (SSE)
 *         content:
 *           text/event-stream:
 *             schema:
 *               type: string
 *       400:
 *         description: Bad request - Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", validate(chatRequestSchema), asyncHandler(sendMessage));

export default router;
