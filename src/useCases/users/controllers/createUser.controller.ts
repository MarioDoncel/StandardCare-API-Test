/* eslint-disable no-underscore-dangle */
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { IUser } from '../../../interfaces/User';
import { sendEmailVerification } from '../../../utils/sendEmailVerification';
import { createUserService } from '../services/createUser.service';
import { sendVerificationEmailService } from '../services/sendVericationEmail.service';

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

    if (user._id) sendVerificationEmailService(user._id.toString(), email);

    return res.status(201).send(user);
  } catch (error) {
    next(error);
    return undefined;
  }
};
