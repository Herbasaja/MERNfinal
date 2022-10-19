import { getUserInfo, updateUser } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.get('/me', getUserInfo);
router.patch('/me', updateUser);

export default router;