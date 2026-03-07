import { Router } from 'express';
import * as loanController from '../controllers/loan_controller';
import { isAuth } from '../middleware/auth.middleware';

const router = Router();

// Public
router.get('/', isAuth, loanController.getLoans);
router.post('/', isAuth, loanController.issueLoan);
router.post('/:id/return', isAuth, loanController.returnLoan);

export default router;