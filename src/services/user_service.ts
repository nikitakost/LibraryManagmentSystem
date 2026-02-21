import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/models';
import { users, saveUsers } from '../storage/memoryDb'; 

export const getAllUsers = (): User[] => Array.from(users.values());
export const getUserById = (id: string): User | undefined => users.get(id);

export const createUser = (data: Omit<User, 'id'>): User => {
  const newUser: User = { id: uuidv4(), ...data };
  users.set(newUser.id, newUser);
  saveUsers(); 
  return newUser;
};