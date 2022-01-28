import mongoose from 'mongoose';

import { IRefreshToken } from '../../interfaces/RefreshToken';

const schema = new mongoose.Schema<IRefreshToken>({
  accessId: { type: String, required: true },
  secret: { type: String, required: true },
  expiresIn: { type: Date, required: true },
});

export const RefreshTokenModel = mongoose.model<IRefreshToken>(
  'refreshTokens',
  schema
);
