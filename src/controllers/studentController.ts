import { Request, Response } from "express";

import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createStudent = async (req: Request, res: Response) => {
  const student = await prisma.student.create({ data: req.body });
  res.status(201).json(student);
};

const getStudents = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [students] = await Promise.all([
    prisma.student.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.student.count(),
  ]);

  res.status(200).json(students);
};

const getStudentByUserId = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { userId: req.params.userId },
  });
  if (!student) {
    return res
      .status(404)
      .json({ status: "error", message: "Student not found" });
  }
  return res.status(200).json(student);
};

const getStudentCourses = async (req: Request, res: Response) => {
  const courses = await prisma.course.findMany({
    where: { courseOfferings: { some: { enrollments: { some: { studentId: req.params.id } } } } },
  });
  if (!courses) {
    return res
      .status(404)
      .json({ status: "error", message: "Courses not found" });
  }
  return res.status(200).json(courses);
};

const getStudentEnrollments = async (req: Request, res: Response) => {
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: req.params.id },
  });
  if (!enrollments) {
    return res
      .status(404)
      .json({ status: "error", message: "Enrollments not found" });
  }
  return res.status(200).json(enrollments);
};

// Get student's course offerings (with full details)
const getStudentCourseOfferings = async (req: Request, res: Response) => {
  const courseOfferings = await prisma.courseOffering.findMany({
    where: {
      enrollments: {
        some: {
          studentId: req.params.id,
          status: "active"
        }
      }
    },
    include: {
      course: {
        include: {
          department: true
        }
      },
      teacher: {
        include: {
          user: true,
          department: true
        }
      },
      schedules: true,
      enrollments: {
        where: { studentId: req.params.id }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.status(200).json(courseOfferings);
};

// Get student's current semester course offerings
const getStudentCurrentSemesterCourses = async (req: Request, res: Response) => {
  const { semester, academicYear } = req.query;

  if (!semester || !academicYear) {
    return res.status(400).json({
      status: "error",
      message: "semester and academicYear query parameters are required"
    });
  }

  const courseOfferings = await prisma.courseOffering.findMany({
    where: {
      semester: semester as string,
      academicYear: academicYear as string,
      enrollments: {
        some: {
          studentId: req.params.id,
          status: "active"
        }
      }
    },
    include: {
      course: {
        include: {
          department: true
        }
      },
      teacher: {
        include: {
          user: true,
          department: true
        }
      },
      schedules: true,
      enrollments: {
        where: { studentId: req.params.id },
        include: {
          grades: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return res.status(200).json({
    semester,
    academicYear,
    total: courseOfferings.length,
    data: courseOfferings
  });
};

const getStudentById = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { id: req.params.id },
  });
  if (!student) {
    return res
      .status(404)
      .json({ status: "error", message: "Student not found" });
  }
  return res.status(200).json(student);
};

const updateStudent = async (req: Request, res: Response) => {
  const student = await prisma.student.update({
    where: { id: req.params.id },
    data: req.body,
  });
  res.status(200).json(student);
};

const deleteStudent = async (req: Request, res: Response) => {
  const student = await prisma.student.delete({
    where: { id: req.params.id },
  });
  res.status(200).json(student);
};

export {
  createStudent,
  getStudents,
  getStudentById,
  getStudentByUserId,
  getStudentCourses,
  getStudentCourseOfferings,
  getStudentCurrentSemesterCourses,
  getStudentEnrollments,
  updateStudent,
  deleteStudent,
};

