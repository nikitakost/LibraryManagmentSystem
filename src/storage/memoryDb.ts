import fs from 'fs';
import path from 'path';
import { Book, User, Loan } from '../types/models';

const DATA_DIR = path.join(__dirname, '../../data');

const loadData = <T>(filename: string): Map<string, T> => {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return new Map();
  
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const array = JSON.parse(rawData);
  return new Map(array.map((item: any) => [item.id, item]));
};


export const books: Map<string, Book> = loadData<Book>('books.json');
export const users: Map<string, User> = loadData<User>('users.json');
export const loans: Map<string, Loan> = loadData<Loan>('loans.json');


export const saveBooks = () => {
  fs.writeFileSync(path.join(DATA_DIR, 'books.json'), JSON.stringify(Array.from(books.values()), null, 2));
};

export const saveUsers = () => {
  fs.writeFileSync(path.join(DATA_DIR, 'users.json'), JSON.stringify(Array.from(users.values()), null, 2));
};

export const saveLoans = () => {
  fs.writeFileSync(path.join(DATA_DIR, 'loans.json'), JSON.stringify(Array.from(loans.values()), null, 2));
};