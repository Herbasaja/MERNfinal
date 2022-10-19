import express from 'express';
import { createCustomer, getAllCustomers, getCurrentUserCustomers, updateCustomer, deleteCustomer } from '../controllers/customer.js';

const router = express.Router();

router.post('/', createCustomer);
router.get('/all', getAllCustomers);
router.get('/myCustomers', getCurrentUserCustomers);
router.patch('/:customerId', updateCustomer);
router.delete('/:customerId', deleteCustomer);

export default router;