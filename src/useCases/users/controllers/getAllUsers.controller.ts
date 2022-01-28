import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../../interfaces/User';
import { getAllUsersService } from '../services/getAllUsers.service';

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const users: IUser[] = await getAllUsersService();

    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
  return undefined;
};
