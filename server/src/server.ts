import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';

const app = express();

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
const PORT = 3002;
app.listen(3002, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
