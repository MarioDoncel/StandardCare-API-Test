import express, { Request, Response, NextFunction } from 'express';

import { UserModel } from '../Database/model/User';
import AppError from '../errors/AppError';
import { IUser } from '../interfaces/User';

const usersRouter = express.Router();

usersRouter.post(
  '/',
  async (
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
      console.log(user);

      return res.status(201).send(user);
    } catch (error) {
      next(error);
      return undefined;
    }
  }
);

usersRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserModel.find();

    res.status(200).json(users);
  }
);
usersRouter.get(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    try {
      const user = await UserModel.findById(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default usersRouter;
