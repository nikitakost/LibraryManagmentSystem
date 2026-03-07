import { Router } from 'express';
import * as bookController from '../controllers/book_controller';
import { isAuth } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';

const router = Router();

// Public
router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);

// Admin only
router.post('/', isAuth, isAdmin, bookController.createBook);
router.put('/:id', isAuth, isAdmin, bookController.updateBook);
router.delete('/:id', isAuth, isAdmin, bookController.deleteBook);

export default router;