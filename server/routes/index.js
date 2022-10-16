import express from 'express';
import customerRoutes from './customer.js'
import authRoutes from './auth.js'
import usersRoutes from './users.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/user', usersRoutes);

export default router;