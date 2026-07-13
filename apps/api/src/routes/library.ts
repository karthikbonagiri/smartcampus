import { Router } from 'express';
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
} from '../controllers/libraryController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;