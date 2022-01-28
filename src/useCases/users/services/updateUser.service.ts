import { UserModel } from '../../../Database/model/User';
import DatabaseError from '../../../errors/DatabaseError';
import { IUser } from '../../../interfaces/User';

export const updateUserService = async (
  updateFields: Partial<IUser>,
  userId: number
): Promise<IUser> => {
  const { email } = updateFields;
  const updatedUser: IUser | null = await UserModel.findOneAndUpdate(
    { _id: userId },
    { ...updateFields, emailVerified: !email && false }, // if email is an update field, then = false
    { new: true }
  );
  if (updatedUser) return updatedUser;

  throw new DatabaseError('User not found.', '', 400);
};
