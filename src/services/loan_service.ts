import { v4 as uuidv4 } from 'uuid';
import { Loan, LoanStatus } from '../types/models';
import { loans, books, users, saveLoans, saveBooks } from '../storage/memoryDb'; 

export const getAllLoans = (): Loan[] => Array.from(loans.values());

export const issueLoan = (userId: string, bookId: string): Loan => {
  const user = users.get(userId);
  if (!user) throw new Error('User not found');

  const book = books.get(bookId);
  if (!book) throw new Error('Book not found');

  if (!book.available) throw new Error('Book is not available');

  const newLoan: Loan = {
    id: uuidv4(),
    userId,
    bookId,
    loanDate: new Date(),
    returnDate: null,
    status: LoanStatus.ACTIVE
  };

  book.available = false;
  books.set(bookId, book);
  loans.set(newLoan.id, newLoan);
  
  saveBooks(); 
  saveLoans(); 
  
  return newLoan;
};

export const returnLoan = (loanId: string): Loan => {
  const loan = loans.get(loanId);
  if (!loan) throw new Error('Loan not found');
  if (loan.status === LoanStatus.RETURNED) throw new Error('Book is already returned');

  loan.status = LoanStatus.RETURNED;
  loan.returnDate = new Date();
  loans.set(loanId, loan);

  const book = books.get(loan.bookId);
  if (book) {
    book.available = true;
    books.set(book.id, book);
    saveBooks(); 
  }

  saveLoans(); 
  return loan;
};