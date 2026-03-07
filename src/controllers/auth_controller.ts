import { Request, Response } from 'express';
import * as authService from '../services/auth_service';
import { registerSchema, loginSchema } from '../schemas/validation';

export const register = async (req: Request, res: Response): Promise<void> => {
  const validation = registerSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  try {
    const { name, email, password } = validation.data;
    const user = await authService.register(name, email, password);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const validation = loginSchema.safeParse(req.body);
  if (!validation.success) {
    res.status(400).json({ errors: validation.error.flatten().fieldErrors });
    return;
  }

  try {
    const { email, password } = validation.data;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message }); 
  }
};