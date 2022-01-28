import { nextTick } from 'process';

import { UserModel } from '../../../Database/model/User';
import { IUserDto } from './IUser.dto';

export const createUserService = async ({
  firstName,
  lastName,
  email,
  dateOfBirth,
}: IUserDto) => {
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    dateOfBirth,
  });
  return user;
};
