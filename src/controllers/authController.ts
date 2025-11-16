import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const JWT_EXPIRES_IN = "7d";

interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  studentId?: string;
  teacherId?: string;
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        student: true,
        teacher: true
      }
    });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "error",
        message: "Invalid email or password"
      });
    }

    // Create JWT payload
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    // Add student ID if user is a student
    if (user.role === "student" && user.student) {
      payload.studentId = user.student.id;
    }

    // Add teacher ID if user is a teacher
    if (user.role === "teacher" && user.teacher) {
      payload.teacherId = user.teacher.id;
    }

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN
    });

    // Return response
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tcNo: user.tcNo,
          studentId: user.student?.id,
          studentNumber: user.student?.studentNumber,
          teacherId: user.teacher?.id
        }
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, tcNo, role, studentNumber, enrollmentYear } = req.body;

    // Validate required fields
    if (!email || !password || !name || !tcNo || !role) {
      return res.status(400).json({
        status: "error",
        message: "Email, password, name, tcNo, and role are required"
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        status: "error",
        message: "User with this email already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        tcNo,
        role
      }
    });

    // If role is student, create student record
    if (role === "student") {
      if (!studentNumber || !enrollmentYear) {
        return res.status(400).json({
          status: "error",
          message: "Student number and enrollment year are required for students"
        });
      }

      await prisma.student.create({
        data: {
          studentNumber,
          enrollmentYear: parseInt(enrollmentYear),
          userId: user.id
        }
      });
    }

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error"
    });
  }
};

const verifyToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        student: true,
        teacher: true
      }
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found"
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          tcNo: user.tcNo,
          studentId: user.student?.id,
          studentNumber: user.student?.studentNumber,
          teacherId: user.teacher?.id
        }
      }
    });
  } catch (error) {
    return res.status(401).json({
      status: "error",
      message: "Invalid or expired token"
    });
  }
};

export { login, register, verifyToken };
