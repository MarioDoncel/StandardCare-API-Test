import { NextFunction, Response, Request } from 'express';

import { VendorModel } from '../../../Database/model/Vendors';
import AppError from '../../../errors/AppError';
import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';

export const logInVendorControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.includes('Basic'))
      throw new AppError('Missing authorization header');

    const [, base64Data] = authHeader.split(' ');
    const credentials = Buffer.from(base64Data, 'base64').toString('utf-8');
    const [name, password] = credentials.split(':');
    // encrypt password
    const vendor: IVendor | null = await VendorModel.findOne({
      name,
      password,
    });
    if (!vendor) throw new DatabaseError('Invalid authentication credentials');

    res.status(200).json('Success');
  } catch (error) {
    next(error);
  }
  return undefined;
};
