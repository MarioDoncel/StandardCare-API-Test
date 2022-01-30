import { sign } from 'jsonwebtoken';

import { tokensConfig } from '../config/tokens';
import { RefreshTokenModel } from '../Database/model/ValidRefreshTokens';
import { IRefreshToken } from '../interfaces/RefreshToken';
import { createJwtVendorService } from '../useCases/vendors/services/createJwtVendor.service';
import { createRefreshTokenVendorService } from '../useCases/vendors/services/createRefreshTokenVendor.service';

export const createTokens = async (id: string): Promise<string | undefined> => {
  const accessToken = createJwtVendorService(id);
  const { secret } = tokensConfig.jwt;
  try {
    const refreshToken = await createRefreshTokenVendorService(id);
    await RefreshTokenModel.create(refreshToken);
    const tokensJWT = sign(
      {
        accessToken,
        refreshToken: JSON.stringify(refreshToken),
      },
      secret,
      {
        expiresIn: '30d',
      }
    );
    return tokensJWT;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
