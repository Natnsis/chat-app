import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { Server } from 'socket.io';
import http from 'http';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' },
});

// userId -> socketId mapping
const onlineUsers: Record<string, string> = {};

io.on('connection', socket => {
  console.log('user connected:', socket.id);

  // Register user (prevent duplicate registration)
  socket.on('register', (userId: string) => {
    if (onlineUsers[userId] && onlineUsers[userId] !== socket.id) {
      console.log(
        `⚠️ user ${userId} already registered with socket ${onlineUsers[userId]}, updating to ${socket.id}`
      );
    }
    onlineUsers[userId] = socket.id;
    console.log(` user ${userId} registered with socket ${socket.id}`);
  });

  // Fetch past messages between two users
  socket.on('messages', async ({ senderId, receiverId }) => {
    try {
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
        orderBy: { createdAt: 'asc' },
      });
      socket.emit('messages', messages);
    } catch (e) {
      console.error('Unable to fetch messages', e);
      socket.emit('messages', []);
    }
  });

  // Send new message
  socket.on('send message', async ({ senderId, receiverId, content }) => {
    try {
      const message = await prisma.message.create({
        data: {
          content,
          status: 'NOT',
          sender: { connect: { id: senderId } },
          receiver: { connect: { id: receiverId } },
        },
      });

      // Emit to sender (optimistic update)
      socket.emit('receive message', message);

      // Emit to receiver if online
      const receiverSocketId = onlineUsers[receiverId];
      if (receiverSocketId && receiverSocketId !== socket.id) {
        io.to(receiverSocketId).emit('receive message', message);
      }
    } catch (e) {
      console.error('Failed to send message', e);
    }
  });

  // Disconnect: remove user mapping
  socket.on('disconnect', () => {
    for (const [userId, sockId] of Object.entries(onlineUsers)) {
      if (sockId === socket.id) {
        delete onlineUsers[userId];
        console.log(`⚠️ user ${userId} disconnected`);
        break;
      }
    }
  });
});

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

server.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
