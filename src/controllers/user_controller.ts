import { Request, Response } from 'express';
import * as userService from '../services/user_service';
import { userSchema } from '../schemas/validation';

export const getUsers = (req: Request, res: Response) => {
  res.json(userService.getAllUsers());
};

export const getUserById = (req: Request<{ id: string }>, res: Response): void => {
  const user = userService.getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response): void => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  const newUser = userService.createUser(validation.data);
  res.status(201).json(newUser);
};