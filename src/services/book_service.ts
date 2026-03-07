import prisma from '../db/prisma';

export const getAllBooks = async () => {
  return await prisma.book.findMany();
};

export const getBookById = async (id: string) => {
  return await prisma.book.findUnique({
    where: { id }
  });
};

export const createBook = async (data: { title: string; author: string; year: number; isbn: string; available?: boolean }) => {
  return await prisma.book.create({
    data
  });
};

export const updateBook = async (id: string, data: any) => {
  try {
    return await prisma.book.update({
      where: { id },
      data
    });
  } catch (error) {
    return undefined; 
  }
};

export const deleteBook = async (id: string): Promise<boolean> => {
  try {
    await prisma.book.delete({
      where: { id }
    });
    return true;
  } catch (error) {
    return false;
  }
};