import { Request, Response } from "express";

import { paginationSchema } from "../schemas/paginationSchema";
import { prisma } from "../index";

const createUser = async (req: Request, res: Response) => {
  const user = await prisma.user.create({ data: req.body });
  res.status(201).json(user);
};

const getUsers = async (req: Request, res: Response) => {
  const { page, limit, sortBy, sortOrder } = paginationSchema.parse(req.query);

  const [users] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { [sortBy]: sortOrder },
    }),
    prisma.user.count(),
  ]);

  res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({ where: { id: req.params.id } });
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.status(200).json(user);
};

const updateUser = async (req: Request, res: Response) => {
  const user = await prisma.user.update({ where: { id: req.params.id }, data: req.body });
  res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response) => {
  const user = await prisma.user.delete({ where: { id: req.params.id } });
  res.status(200).json(user);
};

export { createUser, getUsers, getUserById, updateUser, deleteUser };


