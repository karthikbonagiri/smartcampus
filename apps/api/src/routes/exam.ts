import { Router } from 'express';
import {
  getExams,
  getExam,
  createExam,
  updateExam,
  deleteExam,
  addExamResults
} from '../controllers/examController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getExams);
router.get('/:id', getExam);
router.post('/', createExam);
router.put('/:id', updateExam);
router.delete('/:id', deleteExam);
router.post('/:id/results', addExamResults);  // optional

export default router;