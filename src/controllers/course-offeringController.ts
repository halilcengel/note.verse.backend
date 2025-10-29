import { Request, Response } from "express";
import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createCourseOffering = async (req: Request, res: Response) => {
  const courseOffering = await prisma.courseOffering.create({
    data: req.body
  });
  res.status(201).json(courseOffering);
};

const getCourseOfferings = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [courseOfferings, totalCount] = await Promise.all([
    prisma.courseOffering.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
      include: {
        course: true,
        teacher: true
      }
    }),
    prisma.courseOffering.count()
  ]);

  res.status(200).json({
    total: totalCount,
    page,
    limit,
    data: courseOfferings
  });
};

const getCourseOfferingById = async (req: Request, res: Response) => {
  const courseOffering = await prisma.courseOffering.findUnique({
    where: { id: req.params.id },
    include: {
      course: true,
      teacher: true,
      enrollments: true,
      schedules: true
    }
  });

  if (!courseOffering) {
    return res
      .status(404)
      .json({ status: "error", message: "Course Offering not found" });
  }

  return res.status(200).json(courseOffering);
};

const updateCourseOffering = async (req: Request, res: Response) => {
  const courseOffering = await prisma.courseOffering.update({
    where: { id: req.params.id },
    data: req.body
  })
  res.status(200).json(courseOffering);
};

const deleteCourseOffering = async (req: Request, res: Response) => {
  const courseOffering = await prisma.courseOffering.delete({
    where: { id: req.params.id }
  });
  res.status(200).json(courseOffering);
};

export { createCourseOffering, getCourseOfferings, getCourseOfferingById, updateCourseOffering, deleteCourseOffering};
