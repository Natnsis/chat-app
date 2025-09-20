import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

const prisma = new PrismaClient();

const imageUploader = (bufferImage: Buffer): Promise<any> => {
  return new Promise((resolve, reject) => {
    const image = cloudinary.uploader.upload_stream(
      { folder: 'chatApp' },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(bufferImage).pipe(image);
  });
};

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
    if (!req.file) return res.json('no image bro');
    const uploaded = await imageUploader(req.file.buffer);
    const hashedPassword = await bcrypt.hash(password, 10);
    const new_user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        url: uploaded.secure_url,
      },
    });
    return res.json({ message: 'you have registered successfully', new_user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Registration failed', error: e });
  }
};
