import express, { Request, Response, NextFunction } from 'express';

import { UserModel } from '../Database/model/User';
import { IUser } from '../interfaces/User';
import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';

const usersRouter = express.Router();

usersRouter.post('/', createUserController);

usersRouter.get('/', getAllUsersController);

usersRouter.get('/:userId', getUserByIdController);

usersRouter.patch(
  '/:userId',
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const updateFields: Partial<IUser> = req.body;

    const { email } = updateFields;

    try {
      const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
        { _id: userId },
        { ...updateFields, emailVerified: !email && false } // if email is an update field, then = false
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default usersRouter;
