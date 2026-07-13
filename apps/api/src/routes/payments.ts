import { Router } from 'express';
import { initiatePayment, verifyPayment, getPayments } from '../controllers/paymentController';
const router = Router();
router.post('/initiate', initiatePayment);
router.post('/verify', verifyPayment);
router.get('/', getPayments);
export default router;// Placeholder: payments.ts
