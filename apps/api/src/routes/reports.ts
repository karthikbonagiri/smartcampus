import { Router } from 'express';
import { generateStudentReport, generateFeeReport } from '../controllers/reportController';
const router = Router();
router.get('/student/:studentId', generateStudentReport);
router.get('/fees', generateFeeReport);
export default router;// Placeholder: reports.ts
