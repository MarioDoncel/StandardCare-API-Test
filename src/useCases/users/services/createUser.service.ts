import { UserModel } from '../../../Database/model/User';
import { IUser } from '../../../interfaces/User';
import { ICreateUserDto } from '../dtos/CreateUser.dto';

export const createUserService = async ({
  firstName,
  lastName,
  email,
  dateOfBirth,
}: ICreateUserDto): Promise<IUser> => {
  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    dateOfBirth,
  });
  return user;
};
