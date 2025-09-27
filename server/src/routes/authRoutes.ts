import express from 'express';
import { login, logout, register } from '../controllers/authControllers';
const router = express.Router();
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/register', upload.single('image'), register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
