import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

import { IUser } from '../../interfaces/User';

const schema = new mongoose.Schema<IUser>({
  _id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: String, required: true },
  emailVerified: { type: String, required: true, default: false },
  createDate: { type: Date, required: true, default: Date.now },
});

schema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: '_id',
  startAt: 1,
  incrementBy: 1,
});

export const UserModel = mongoose.model<IUser>('users', schema);
