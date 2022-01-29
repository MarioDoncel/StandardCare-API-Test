import bcrypt from 'bcrypt';

import { environmentVariables } from '../../../config/environment';
import { tokensConfig } from '../../../config/tokens';
import { RefreshTokenModel } from '../../../Database/model/ValidRefreshTokens';
import { IRefreshToken } from '../../../interfaces/RefreshToken';

export const createRefreshTokenVendorService = async (id: string) => {
  const { REFRESH_TOKEN_SECRET, BCRYPT_SALT_ROUNDS } = environmentVariables;
  const encryptedSecret = bcrypt.hash(
    REFRESH_TOKEN_SECRET,
    Number(BCRYPT_SALT_ROUNDS)
  );
  const refreshToken: IRefreshToken = await RefreshTokenModel.create({
    accessId: id,
    expiresIn: tokensConfig.refreshToken.expiresIn,
    secret: encryptedSecret,
  });
  return refreshToken;
};
