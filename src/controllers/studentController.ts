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

const getStudentById = async (req: Request, res: Response) => {
  const student = await prisma.student.findUnique({
    where: { id: req.params.id } });
  if (!student) {
    return res.status(404).json({ status: "error", message: "Student not found" });
  }
  return res.status(200).json(student);
};

const updateStudent = async (req: Request, res: Response) => {
  const student = await prisma.student.update({
    where: { id: req.params.id }, data: req.body });
  res.status(200).json(student);
};

const deleteStudent = async (req: Request, res: Response) => {
  const student = await prisma.student.delete({
    where: { id: req.params.id } });
  res.status(200).json(student);
};

export { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
