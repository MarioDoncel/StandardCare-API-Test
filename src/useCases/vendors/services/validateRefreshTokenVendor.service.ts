import bcrypt from 'bcrypt';

import { environmentVariables } from '../../../config/environment';
import ForbiddenError from '../../../errors/ForbiddenError';
import { IRefreshToken } from '../../../interfaces/RefreshToken';

const { REFRESH_TOKEN_SECRET } = environmentVariables;

export const validateRefreshTokenVendorService = async (
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
