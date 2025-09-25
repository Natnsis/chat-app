import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const { senderId } = req.body;
    const messages = await prisma.message.findMany({
      where: { receiverId, senderId },
      orderBy: { createdAt: 'desc' },
    });
    return res.status(200).json(messages);
  } catch (e) {
    console.log(e);
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { receiverId } = req.params;
    const { senderId, content } = req.body;

    if (!senderId || !content) {
      return res
        .status(400)
        .json({ error: 'senderId and content are required' });
    }

    const send = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
        status: 'NOT',
      },
    });

    return res.status(201).json(send);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};
