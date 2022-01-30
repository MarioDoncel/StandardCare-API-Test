import { NextFunction, Response, Request } from 'express';
import jwt, { verify } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { tokensConfig } from '../../../config/tokens';
import { VendorModel } from '../../../Database/model/Vendors';
import AppError from '../../../errors/AppError';
import DatabaseError from '../../../errors/DatabaseError';
import { ILoginTokenPayload } from '../../../interfaces/LoginTokenPayload';
import { IVendor } from '../../../interfaces/Vendor';
import { createTokens } from '../../../utils/createTokens';
import { validateJWTVendorService } from '../services/validateJwtVendor.service';
import { validateRefreshTokenVendorService } from '../services/validateRefreshTokenVendor.service';

export const vendorBearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError('Authorization header not send');

  const [, token] = authHeader.split(' ');
  const { secret } = tokensConfig.jwt;
  const decoded = verify(token, secret);
  const { accessToken, refreshToken } = decoded as ILoginTokenPayload;

  if (!accessToken || !refreshToken)
    throw new AppError('Vendor unauthorized', '', 401);

  const accessTokenIsValid = validateJWTVendorService(accessToken);
  if (accessTokenIsValid.valid) {
    const vendor: IVendor | null = await VendorModel.findById(
      accessTokenIsValid.id
    );
    if (!vendor) throw new DatabaseError('Vendor not found');
    res.locals.vendor = vendor;
    return next();
  }

  if (accessTokenIsValid.message !== 'jwt expired')
    throw new AppError('Vendor unauthorized', '', 401);

  const { sub: vendorId } = jwt.verify(
    accessToken,
    environmentVariables.JWT_SECRET,
    { ignoreExpiration: true }
  );
  if (typeof vendorId !== 'string') throw new Error();

  const refreshTokenIsValid = validateRefreshTokenVendorService(
    vendorId,
    JSON.parse(refreshToken)
  );

  if (!refreshTokenIsValid) throw new AppError('Vendor unauthorized', '', 401);

  try {
    const vendor: IVendor | null = await VendorModel.findById(vendorId);
    if (!vendor) throw new DatabaseError('Vendor not found');
    const tokens = await createTokens(vendorId);
    // silent login
    // need to set the tokens at local storage or cookies at user browser
    if (window && tokens) localStorage.setItem('tokens', tokens);

    res.locals.vendor = vendor;
    return next();
  } catch (error) {
    return next(error);
  }
};
