import bcrypt from 'bcrypt';

import { environmentVariables } from '../config/environment';
import { tokensConfig } from '../config/tokens';
import { RefreshTokenModel } from '../Database/model/ValidRefreshTokens';
import ForbiddenError from '../errors/ForbiddenError';
import { IRefreshToken } from '../interfaces/RefreshToken';

const { REFRESH_TOKEN_SECRET, BCRYPT_SALT_ROUNDS } = environmentVariables;
const encryptedSecret = bcrypt.hash(REFRESH_TOKEN_SECRET, BCRYPT_SALT_ROUNDS);

export const createRefreshToken = async (id: string) => {
  const refreshToken: IRefreshToken = await RefreshTokenModel.create({
    accessId: id,
    expiresIn: tokensConfig.refreshToken.expiresIn,
    secret: encryptedSecret,
  });
  return refreshToken;
};

export const validateRefreshToken = async (
  accessId: string,
  refreshToken: IRefreshToken
): Promise<boolean> => {
  const withinValidity = refreshToken.expiresIn < Date.now();
  if (!withinValidity) throw new ForbiddenError('RefreshToken expired');

  if (accessId !== refreshToken.accessId)
    throw new ForbiddenError('RefreshToken Invalid');

  const validSecret = await bcrypt.compare(
    REFRESH_TOKEN_SECRET,
    refreshToken.secret
  );

  if (!validSecret) throw new ForbiddenError('RefreshToken Invalid');

  return true;
};
