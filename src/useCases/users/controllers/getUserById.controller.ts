import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../../interfaces/User';
import { getUserByIdService } from '../services/getUserById.service';

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { userId } = req.params;
  try {
    const id = Number(userId);
    const user: IUser = await getUserByIdService(id);

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
  return undefined;
};
