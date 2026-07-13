import { Router } from 'express';
import {
  getTimetable,
  getTimetableByClass,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  getTeacherTimetable
} from '../controllers/timetableController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getTimetable);
router.get('/class/:classId', getTimetableByClass);
router.get('/teacher/:teacherId', getTeacherTimetable);
router.post('/', createTimetableEntry);
router.put('/:id', updateTimetableEntry);
router.delete('/:id', deleteTimetableEntry);

export default router;