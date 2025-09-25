import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { createdAt } });
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
  }
};
