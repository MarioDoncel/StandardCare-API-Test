import { NextFunction, Response, Request } from 'express';

import { createAndSetTokens } from '../../../utils/createAndSetTokens';
import { createJWT } from '../../../utils/jwt';
import { createRefreshToken } from '../../../utils/refreshToken';

export const logInVendorControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { _id }: { _id: string } = res.locals.vendor;
  createAndSetTokens(_id);

  return res.status(200).json('Success');
};
