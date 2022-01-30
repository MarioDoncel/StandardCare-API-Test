import md5 from 'crypto-js/md5';
import { NextFunction, Request, Response } from 'express';

import AppError from '../../../errors/AppError';
import { IVendor } from '../../../interfaces/Vendor';
import { createVendorService } from '../services/createVendor.service';

export const createVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { name, password }: IVendor = req.body;
  if (!name || !password) throw new AppError('Missing data to create a vendor');

  const hashPassword = md5(password).toString();
  try {
    const vendor: IVendor = await createVendorService({
      name,
      password: hashPassword,
    });

    return res.status(201).send(vendor);
  } catch (error) {
    next(error);
    return undefined;
  }
};
