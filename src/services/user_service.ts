import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/models';
import { users } from '../storage/memoryDb';

export const getAllUsers = (): User[] => {
  return Array.from(users.values());
};

export const getUserById = (id: string): User | undefined => {
  return users.get(id);
};

export const createUser = (data: Omit<User, 'id'>): User => {
  const newUser: User = {
    id: uuidv4(),
    ...data
  };
  users.set(newUser.id, newUser);
  return newUser;
};