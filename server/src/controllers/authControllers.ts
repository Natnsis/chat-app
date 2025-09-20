import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Token generation and assigning
const generateToken = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET!, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET!, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 1000,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return res.json({ message: 'no user found' });
    const authorized = await bcrypt.compare(password, user.password);
    if (!authorized) return res.json('wrong password');
    const id = user.id;
    const { accessToken, refreshToken } = generateToken(id);
    setRefreshCookie(res, refreshToken);
    return res.json({ accessToken: accessToken });
  } catch (e) {
    return res.send(e);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.json({ message: 'you have registered successfully', new_user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Registration failed', error: e });
  }
};
