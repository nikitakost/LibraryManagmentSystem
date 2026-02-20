import { Request, Response } from 'express';
import * as loanService from '../services/loan_service';
import { loanSchema } from '../schemas/validation';

export const getLoans = (req: Request, res: Response) => {
  res.json(loanService.getAllLoans());
};

export const issueLoan = (req: Request, res: Response): void => {
  const validation = loanSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  try {
    const loan = loanService.issueLoan(validation.data.userId, validation.data.bookId);
    res.status(201).json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const returnLoan = (req: Request<{ id: string }>, res: Response): void => {
  try {
    const loan = loanService.returnLoan(req.params.id);
    res.json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};