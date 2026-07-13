import { Router } from 'express';
import { markAttendance, getAttendance, getAttendanceReport } from '../controllers/attendanceController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/', markAttendance);
router.get('/', getAttendance);
router.get('/report', getAttendanceReport);

export default router;
