import bcrypt from 'bcrypt';
import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { VendorModel } from '../../../Database/model/Vendors';
import AppError from '../../../errors/AppError';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';
import { createAndSetTokens } from '../../../utils/createAndSetTokens';
import { validateRefreshToken } from '../../../utils/refreshToken';
import { validateJWTVendorService } from '../services/validateJwtVendor.service';

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
    res.locals.id = accessTokenIsValid.id;
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
  const refreshTokenIsValid = validateRefreshToken(vendorId, refreshToken);

  if (!refreshTokenIsValid) throw new AppError('Vendor unauthorized', '', 401);

  try {
    const vendor: IVendor | null = await VendorModel.findById(vendorId);
    if (!vendor) throw new DatabaseError('Vendor not found');
    createAndSetTokens(vendorId);
    // silent login
    res.locals.vendor = vendor;
    next();
  } catch (error) {
    next(error);
  }
};
