import { createJwtVendorService } from '../useCases/vendors/services/createJwtVendor.service';
import { createRefreshToken } from './refreshToken';

export const createAndSetTokens = (id: string) => {
  const accessToken = createJwtVendorService(id);
  const refreshToken = createRefreshToken(id);
  localStorage.setItem('AccessToken', accessToken);
  localStorage.setItem('RefreshToken', JSON.stringify(refreshToken));
};
