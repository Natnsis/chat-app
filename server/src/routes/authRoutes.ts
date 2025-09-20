import express from 'express';
import { login, register } from '../controllers/authControllers';
const router = express.Router();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/register', upload.single('image'), register);
router.post('/login', login);

export default router;
