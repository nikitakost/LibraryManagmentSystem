import { Request, Response } from 'express';
import * as userService from '../services/user_service'; 

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const user = await userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
};


export const getMe = async (req: Request, res: Response): Promise<void> => {
  // @ts-ignore
  const userId = req.user?.userId; 
  
  if (!userId) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user = await userService.getUserById(userId);
  res.json(user);
};