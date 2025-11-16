import { Request, Response } from "express";

import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createCourse = async (req: Request, res: Response) => {
  const course = await prisma.course.create({ data: req.body });
  res.status(201).json(course);
};

const getCourses = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [courses, totalCount] = await Promise.all([
    prisma.course.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: { department: true }
    }),
    prisma.course.count(),
  ]);

  res.status(200).json({
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    data: courses
  });
};

const getCourseById = async (req: Request, res: Response) => {
  const course = await prisma.course.findUnique({
    where: { id: req.params.id },
    include: { department: true }
  });

  if (!course) {
    return res.status(404).json({ status: "error", message: "Course not found" });
  }

  return res.status(200).json(course);
};

const updateCourse = async (req: Request, res: Response) => {
  const course = await prisma.course.update({
    where: { id: req.params.id },
    data: req.body
  });
  res.status(200).json(course);
};

const deleteCourse = async (req: Request, res: Response) => {
  const course = await prisma.course.delete({
    where: { id: req.params.id }
  });
  res.status(200).json(course);
};

export { createCourse, getCourses, getCourseById, updateCourse, deleteCourse };
