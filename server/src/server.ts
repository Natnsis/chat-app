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

io.on('connection', socket => {
  console.log('user is connected');

  socket.on('messages', async ({ senderId, receiverId }) => {
    try {
      const messages = await prisma.message.findMany({
        where: { senderId, receiverId },
        orderBy: { createdAt: 'desc' },
      });
      socket.emit('messages', messages);
    } catch (e) {
      console.log('unable to fetch messages');
      socket.emit('messages', []);
    }
  });

  socket.on('send message', async ({ senderId, receiverId, content }) => {
    try {
      const message = await prisma.message.create({
        data: {
          content: content,
          status: 'NOT',
          sender: {
            connect: { id: senderId },
          },
          receiver: {
            connect: { id: receiverId },
          },
        },
      });

      socket.to(receiverId).emit('receive message', message);
      socket.emit('receive message', message);
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('disconnect', () => {
    console.log('user is disconnected');
  });
});

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

//routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
server.listen(process.env.PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`);
});
