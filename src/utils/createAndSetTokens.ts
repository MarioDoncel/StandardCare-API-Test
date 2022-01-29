import { RefreshTokenModel } from '../Database/model/ValidRefreshTokens';
import { createJwtVendorService } from '../useCases/vendors/services/createJwtVendor.service';
import { createRefreshTokenVendorService } from '../useCases/vendors/services/createRefreshTokenVendor.service';

export const createAndSetTokens = async (id: string): Promise<void> => {
  const accessToken = createJwtVendorService(id);
  const refreshToken = createRefreshTokenVendorService(id);
  localStorage.setItem('AccessToken', accessToken);
  localStorage.setItem('RefreshToken', JSON.stringify(refreshToken));
  await RefreshTokenModel.create(refreshToken);
  // I stored it in local storage despite using Httponly and Secure cookies is a more secure way, because in my last project i have some issues reported by an user using Safari to store and read cookies
};
