import { Book, User, Loan } from '../types/models';

export const books: Map<string, Book> = new Map();
export const users: Map<string, User> = new Map();
export const loans: Map<string, Loan> = new Map();

export const clearDb = () => {
    books.clear();
    users.clear();
    loans.clear();
};