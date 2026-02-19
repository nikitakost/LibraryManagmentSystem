import { v4 as uuidv4 } from 'uuid';
import { Book } from '../types/models';
import { books } from '../storage/memoryDb';

export const getAllBooks = (): Book[] => {
  return Array.from(books.values());
};

export const getBookById = (id: string): Book | undefined => {
  return books.get(id);
};

export const createBook = (data: Omit<Book, 'id' | 'available'>): Book => {
  const newBook: Book = {
    id: uuidv4(),
    ...data,
    available: true 
  };
  books.set(newBook.id, newBook);
  return newBook;
};

export const updateBook = (id: string, data: Partial<Book>): Book | undefined => {
  const book = books.get(id);
  if (!book) return undefined;

  const updatedBook = { ...book, ...data };
  books.set(id, updatedBook);
  return updatedBook;
};

export const deleteBook = (id: string): boolean => {
  return books.delete(id);
};