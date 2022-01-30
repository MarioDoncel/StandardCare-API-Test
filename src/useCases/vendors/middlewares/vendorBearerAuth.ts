import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { VendorModel } from '../../../Database/model/Vendors';
import AppError from '../../../errors/AppError';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';
import { createTokens } from '../../../utils/createTokens';
import { validateJWTVendorService } from '../services/validateJwtVendor.service';
import { validateRefreshTokenVendorService } from '../services/validateRefreshTokenVendor.service';

export const vendorBearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshTokenStringfied = localStorage.getItem('refreshToken');
  const refreshToken = refreshTokenStringfied
    ? JSON.parse(refreshTokenStringfied)
    : null;

  if (!accessToken || !refreshToken)
    throw new AppError('Vendor unauthorized', '', 401);

  const accessTokenIsValid = validateJWTVendorService(accessToken);
  if (accessTokenIsValid.valid) {
    const vendor: IVendor | null = await VendorModel.findById(
      accessTokenIsValid.id
    );
    if (!vendor) throw new DatabaseError('Vendor not found');
    res.locals.vendor = vendor;
    next();
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
    refreshToken
  );

  if (!refreshTokenIsValid) throw new AppError('Vendor unauthorized', '', 401);

  try {
    const vendor: IVendor | null = await VendorModel.findById(vendorId);
    if (!vendor) throw new DatabaseError('Vendor not found');
    const tokens = await createTokens(vendorId);
    // silent login
    res.locals.vendor = vendor;
    res.locals.tokens = tokens;
    next();
  } catch (error) {
    next(error);
  }
};
