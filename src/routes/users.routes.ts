import express, { Request, Response, NextFunction } from 'express';

import { UserModel } from '../Database/model/User';
import { IUser } from '../interfaces/User';
import { createUserController } from '../useCases/users/controllers/createUser.controller';

const usersRouter = express.Router();

usersRouter.post('/', createUserController);

usersRouter.get(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    try {
      const users = await UserModel.find();
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
    return undefined;
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
usersRouter.patch(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const updateFields: Partial<IUser> = req.body;

    const { email } = updateFields;

    try {
      const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
        { _id: userId },
        { ...updateFields, emailVerified: !email } // if email is an update field, then = false
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default usersRouter;
