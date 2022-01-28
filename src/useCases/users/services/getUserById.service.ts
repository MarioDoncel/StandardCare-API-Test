import { UserModel } from '../../../Database/model/User';
import DatabaseError from '../../../errors/DatabaseError';
import { IUser } from '../../../interfaces/User';

export const getUserByIdService = async (_id: number): Promise<IUser> => {
  const user: IUser | null = await UserModel.findById(_id);

  if (user) return user;

  throw new DatabaseError('User not found.', '', 400);
};
