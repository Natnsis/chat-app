import express from 'express';
import { getMessage, sendMessage } from '../controllers/messageControllers';
const router = express.Router();

router.post('/', sendMessage);
router.get('/', getMessage);

export default router;
