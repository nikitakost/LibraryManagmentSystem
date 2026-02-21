import { v4 as uuidv4 } from 'uuid';
import { Book } from '../types/models';
import { books, saveBooks } from '../storage/memoryDb'; 

export const getAllBooks = (): Book[] => Array.from(books.values());
export const getBookById = (id: string): Book | undefined => books.get(id);

export const createBook = (data: Omit<Book, 'id' | 'available'>): Book => {
  const newBook: Book = { id: uuidv4(), ...data, available: true };
  books.set(newBook.id, newBook);
  saveBooks(); 
  return newBook;
};

export const updateBook = (id: string, data: Partial<Book>): Book | undefined => {
  const book = books.get(id);
  if (!book) return undefined;

  const updatedBook = { ...book, ...data };
  books.set(id, updatedBook);
  saveBooks(); 
  return updatedBook;
};

export const deleteBook = (id: string): boolean => {
  const isDeleted = books.delete(id);
  if (isDeleted) saveBooks(); 
  return isDeleted;
};