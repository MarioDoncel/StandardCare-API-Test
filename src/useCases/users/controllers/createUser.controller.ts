import { NextFunction, Request, Response } from 'express';

import { IUser } from '../../../interfaces/User';
import { createUserService } from '../services/createUser.service';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { firstName, lastName, email, dateOfBirth }: IUser = req.body;

  try {
    const user: IUser = await createUserService({
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
