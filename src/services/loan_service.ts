import prisma from '../db/prisma';

export const getAllLoans = async () => {
  return await prisma.loan.findMany({
    include: {
      book: true,
      user: { select: { id: true, name: true, email: true } }
    }
  });
};

export const issueLoan = async (userId: string, bookId: string) => {
  const book = await prisma.book.findUnique({ where: { id: bookId } });
  if (!book) throw new Error('Book not found');
  if (!book.available) throw new Error('Book is not available');

  return await prisma.$transaction(async (tx) => {
    const loan = await tx.loan.create({
      data: {
        userId,
        bookId,
        status: 'ACTIVE'
      }
    });

    await tx.book.update({
      where: { id: bookId },
      data: { available: false }
    });

    return loan;
  });
};

export const returnLoan = async (loanId: string) => {
  const loan = await prisma.loan.findUnique({ where: { id: loanId } });
  if (!loan) throw new Error('Loan not found');
  if (loan.status === 'RETURNED') throw new Error('Book is already returned');

  return await prisma.$transaction(async (tx) => {
    const updatedLoan = await tx.loan.update({
      where: { id: loanId },
      data: {
        status: 'RETURNED',
        returnDate: new Date()
      }
    });

    await tx.book.update({
      where: { id: loan.bookId },
      data: { available: true }
    });

    return updatedLoan;
  });
};