import express from 'express';
import { login, register } from '../controllers/authControllers';
const router = express.Router();
import { upload } from '../middlewares/multer';

router.post('/register', upload.single('img'), register);
router.post('/login', login);

export default router;
