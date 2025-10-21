import { Request, Response } from "express";

import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createTeacher = async (req: Request, res: Response) => {
  const teacher = await prisma.teacher.create({ data: req.body });
  res.status(201).json(teacher);
};

const getTeachers = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [teachers] = await Promise.all([
    prisma.teacher.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.teacher.count(),
  ]);

  res.status(200).json(teachers);
};

const getTeacherById = async (req: Request, res: Response) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id: req.params.id },
  });

  if (!teacher) {
    return res.status(404).json({ status: "error", message: "Teacher not found" });
  }

  return res.status(200).json(teacher);
};

const updateTeacher = async (req: Request, res: Response) => {
  const teacher = await prisma.teacher.update({
    where: { id: req.params.id },
    data: req.body,
  });

  res.status(200).json(teacher);
};

const deleteTeacher = async (req: Request, res: Response) => {
  const teacher = await prisma.teacher.delete({
    where: { id: req.params.id },
  });

  res.status(200).json(teacher);
};

export { createTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher };
