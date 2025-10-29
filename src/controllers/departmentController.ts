import { Request, Response } from "express";
import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createDepartment = async (req: Request, res: Response) => {
  const department = await prisma.department.create({ data: req.body });
  res.status(201).json(department);
};

const getDepartments = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [departments, total] = await Promise.all([
    prisma.department.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        teachers: true,
        courses: true,
        documents: true,
      },
    }),
    prisma.department.count(),
  ]);

  res.status(200).json({
    status: "success",
    data: departments,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  });
};

const getDepartmentById = async (req: Request, res: Response) => {
  const department = await prisma.department.findUnique({
    where: { id: req.params.id },
    include: {
      teachers: true,
      courses: true,
      documents: true
    }
  });

  if (!department) {
    return res.status(404).json({ status: "error", message: "Department not found" });
  }

  return res.status(200).json(department);
};

const updateDepartment = async (req: Request, res: Response) => {
  const department = await prisma.department.update({
    where: { id: req.params.id },
    data: req.body
  });

  res.status(200).json(department);
};

const deleteDepartment = async (req: Request, res: Response) => {
  const department = await prisma.department.delete({
    where: { id: req.params.id }
  });

  res.status(200).json(department);
};

export { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment };
