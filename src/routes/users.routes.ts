import express, { Request, Response, NextFunction } from 'express';

import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';
import { updateUserController } from '../useCases/users/controllers/updateUser.controller';
import { verifyEmailController } from '../useCases/users/controllers/verifyEmail.controller';

const usersRouter = express.Router();

usersRouter.post('/', createUserController);

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:userId', getUserByIdController);
usersRouter.get('/validation/:verificationToken', verifyEmailController);

usersRouter.patch('/:userId', updateUserController);

export default usersRouter;
