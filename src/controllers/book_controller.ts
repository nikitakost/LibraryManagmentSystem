import { Request, Response } from 'express';
import * as bookService from '../services/book_service'; 
import { bookSchema } from '../schemas/validation';

export const getBooks = async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.json(books);
};

export const getBookById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.json(book);
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const validation = bookSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  const newBook = await bookService.createBook(validation.data);
  res.status(201).json(newBook);
};

export const updateBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const validation = bookSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  const updatedBook = await bookService.updateBook(req.params.id, validation.data);
  if (!updatedBook) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  
  res.json(updatedBook);
};

export const deleteBook = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const success = await bookService.deleteBook(req.params.id);
  if (!success) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  res.status(204).send();
};