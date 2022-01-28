import { UserModel } from '../../../Database/model/User';
import { IUser } from '../../../interfaces/User';

export const getAllUsersService = async (): Promise<IUser[]> => {
  const users = await UserModel.find();
  return users;
};
