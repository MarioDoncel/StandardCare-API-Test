import { NextFunction, Request, Response } from 'express';

import { UserModel } from '../../../Database/model/User';
import { IUser } from '../../../interfaces/User';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { firstName, lastName, email, dateOfBirth }: IUser = req.body;
  try {
    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      dateOfBirth,
    });

    return res.status(201).send(user);
  } catch (error) {
    next(error);
    return undefined;
  }
};
