import md5 from 'crypto-js/md5';
import { NextFunction, Response, Request } from 'express';

import { environmentVariables } from '../../../config/environment';
import { VendorModel } from '../../../Database/model/Vendors';
import AppError from '../../../errors/AppError';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';

export const vendorBasicAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.includes('Basic'))
    throw new AppError('Missing authorization header');

  const [, base64Data] = authHeader.split(' ');
  const credentials = Buffer.from(base64Data, 'base64').toString('utf-8');
  const [name, password] = credentials.split(':');

  try {
    const hashPassword = md5(password).toString();
    const vendor: IVendor | null = await VendorModel.findOne({
      name,
      password: hashPassword,
    });

    if (!vendor) throw new DatabaseError('Invalid authentication credentials');
    res.locals.vendor = vendor;
    next();
  } catch (error) {
    next(error);
  }
};
