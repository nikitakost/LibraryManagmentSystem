import { Router} from 'express';
import * as loanController from '../controllers/loan_controller';

const router = Router();

router.get('/', loanController.getLoans);
router.post('/', loanController.issueLoan);
router.post('/:id/return', loanController.returnLoan);

export default router;