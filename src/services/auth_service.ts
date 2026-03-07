import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../db/prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash
    }
  });

  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' } 
  );

  const { passwordHash: _, ...userWithoutPassword } = user;
  
  return {
    token,
    user: userWithoutPassword
  };
};