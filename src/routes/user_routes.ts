import { Router } from 'express';
import * as userController from '../controllers/user_controller';

const router = Router();

router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);

export default router;