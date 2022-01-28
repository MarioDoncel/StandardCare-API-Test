import { NextFunction, Response, Request } from 'express';

import { createJWT } from '../../../utils/jwt';
import { createRefreshToken } from '../../../utils/refreshToken';

export const logInVendorControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { _id }: { _id: string } = res.locals.vendor;
  const accessToken = createJWT(_id);
  const refreshToken = createRefreshToken(_id);
  localStorage.setItem('AccessToken', accessToken);
  localStorage.setItem('RefreshToken', JSON.stringify(refreshToken));

  return res.status(200).json('Success');
};
