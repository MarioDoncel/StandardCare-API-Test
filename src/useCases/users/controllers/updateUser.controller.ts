import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../../interfaces/User';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<IUser | undefined> => {
  const { userId } = req.params;
  const updateFields: Partial<IUser> = req.body;

  try {
    const updatedUser: IUser = await updateUserService(
      updateFields,
      Number(userId)
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
  return undefined;
};
