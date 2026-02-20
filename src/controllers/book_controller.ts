import { Request, Response } from 'express';
import * as bookService from '../services/book_service';
import { bookSchema } from '../schemas/validation';

export const getBooks = (req: Request, res: Response) => {
  const books = bookService.getAllBooks();
  res.json(books);
};

export const getBookById = (req: Request<{ id: string }>, res: Response): void => {
  const book = bookService.getBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.json(book);
};

export const createBook = (req: Request, res: Response): void => {
  const validation = bookSchema.safeParse(req.body);
  if (!validation.success) {
    // Використовуємо flatten() для більш читабельного формату помилок
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  const newBook = bookService.createBook(validation.data);
  res.status(201).json(newBook);
};

export const updateBook = (req: Request<{ id: string }>, res: Response): void => {
  const validation = bookSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  const updatedBook = bookService.updateBook(req.params.id, validation.data);
  if (!updatedBook) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  
  res.json(updatedBook);
};

export const deleteBook = (req: Request<{ id: string }>, res: Response): void => {
  const success = bookService.deleteBook(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(204).send();
};