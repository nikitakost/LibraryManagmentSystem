import { Router } from 'express';
import * as userController from '../controllers/user_controller';
import { isAuth } from '../middleware/auth.middleware';
import { isAdmin } from '../middleware/role.middleware';

const router = Router();

// Public
router.get('/me', isAuth, userController.getMe);

// Admin only
router.get('/', isAuth, isAdmin, userController.getUsers);
router.get('/:id', isAuth, isAdmin, userController.getUserById);

export default router;