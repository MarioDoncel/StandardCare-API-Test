import { createJwtVendorService } from '../useCases/vendors/services/createJwtVendor.service';
import { createRefreshTokenVendorService } from '../useCases/vendors/services/createRefreshTokenVendor.service';

export const createAndSetTokens = (id: string) => {
  const accessToken = createJwtVendorService(id);
  const refreshToken = createRefreshTokenVendorService(id);
  localStorage.setItem('AccessToken', accessToken);
  localStorage.setItem('RefreshToken', JSON.stringify(refreshToken));
};
