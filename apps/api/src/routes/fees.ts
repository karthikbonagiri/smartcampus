import { Router } from 'express';
import { getFees, getStudentFees, createFee, updateFee, deleteFee } from '../controllers/feeController';
const router = Router();
router.get('/', getFees);
router.get('/student/:studentId', getStudentFees);
router.post('/', createFee);
router.put('/:id', updateFee);
router.delete('/:id', deleteFee);
export default router;// Placeholder: fees.ts
