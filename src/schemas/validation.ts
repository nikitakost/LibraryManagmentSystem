import { z } from 'zod';

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  year: z.number().int().min(1000).max(new Date().getFullYear()),
  isbn: z.string().min(10, "ISBN must be valid"),
  available: z.boolean().optional(), 
});

export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

export const loanSchema = z.object({
  userId: z.string().uuid("Invalid User ID"),
  bookId: z.string().uuid("Invalid Book ID"),
});