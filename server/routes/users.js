import { getUserInfo } from '../controllers/user.js';
import express from 'express';

const router = express.Router();

router.get('/me', getUserInfo);

export default router;