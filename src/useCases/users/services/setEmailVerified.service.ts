import { UserModel } from '../../../Database/model/User';
import DatabaseError from '../../../errors/DatabaseError';
import { IUser } from '../../../interfaces/User';

export const setEmailVerifiedService = async (id: number) => {
  try {
    const user: IUser | null = await UserModel.findOneAndUpdate(
      { _id: id },
      { emailVerified: true },
      { new: true }
    );
    if (!user) throw new DatabaseError('Vendor not found');
    return user;
  } catch (error) {
    throw new DatabaseError('Fail to update user');
  }
};
