import { Router } from 'express';
import * as authController from '../controllers/auth_controller';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

export default router;