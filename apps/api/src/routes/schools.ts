import { Router } from 'express';
import { getSchools, getSchool, updateSchool, deleteSchool } from '../controllers/schoolController';
import { authorize } from '../middleware/auth';
const router = Router();
router.get('/', authorize('super_admin'), getSchools);
router.get('/:id', authorize('super_admin','school_admin'), getSchool);
router.put('/:id', authorize('super_admin','school_admin'), updateSchool);
router.delete('/:id', authorize('super_admin'), deleteSchool);
export default router;// Placeholder: schools.ts
