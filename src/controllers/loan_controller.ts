import { Request, Response } from 'express';
import * as loanService from '../services/loan_service'; 
import { loanSchema } from '../schemas/validation';
import prisma from '../db/prisma';

export const getLoans = async (req: Request, res: Response): Promise<void> => {
  const user = req.user!; 

  if (user.role === 'ADMIN') {
    const loans = await loanService.getAllLoans();
    res.json(loans);
  } else {
    const userLoans = await prisma.loan.findMany({
      where: { userId: user.userId },
      include: { book: true }
    });
    res.json(userLoans);
  }
};

export const issueLoan = async (req: Request, res: Response): Promise<void> => {
  const validation = loanSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  try {
    const loan = await loanService.issueLoan(validation.data.userId, validation.data.bookId);
    res.status(201).json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const returnLoan = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const loan = await loanService.returnLoan(req.params.id);
    res.json(loan);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};