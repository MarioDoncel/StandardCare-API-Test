import { RefreshTokenModel } from '../Database/model/ValidRefreshTokens';
import { IRefreshToken } from '../interfaces/RefreshToken';
import { createJwtVendorService } from '../useCases/vendors/services/createJwtVendor.service';
import { createRefreshTokenVendorService } from '../useCases/vendors/services/createRefreshTokenVendor.service';

export const createTokens = async (
  id: string
): Promise<[string, IRefreshToken] | undefined> => {
  const accessToken = createJwtVendorService(id);
  try {
    const refreshToken = await createRefreshTokenVendorService(id);
    await RefreshTokenModel.create(refreshToken);
    return [accessToken, refreshToken];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
