import express from 'express';
import customerRoutes from './customer.js'
import authRoutes from './auth.js'
import usersRoutes from './users.js'
import checkAuth from '../utils/checkAuth.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customers', checkAuth, customerRoutes);
router.use('/user', checkAuth, usersRoutes);

export default router;