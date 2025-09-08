import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';

//cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const prisma = new PrismaClient();

//token generation and assigning
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
  const { name, email, password, imageBase64 } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const uploaded = await cloudinary.uploader.upload(imageBase64, {
      folder: 'chat-app/users',
    });
    const new_user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        url: uploaded.secure_url,
      },
    });
    if (!new_user) return res.json('this is not registering');
    return res.json({ message: 'you have registered successfully' });
  } catch (e) {
    res.json('hello its not working');
  }
};
