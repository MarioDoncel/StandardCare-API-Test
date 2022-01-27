import mongoose from 'mongoose';

import { IUser } from '../../interfaces/User';

const schema = new mongoose.Schema<IUser>({
  id: { type: Number, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  emailVerified: { type: String, required: true, default: false },
  createDate: { type: Date, required: true, default: Date.now },
});

export const UserModel = mongoose.model<IUser>('users', schema);
