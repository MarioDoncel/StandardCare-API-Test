import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';

import { environmentVariables } from '../../../config/environment';
import AppError from '../../../errors/AppError';
import { IVendor } from '../../../interfaces/Vendor';
import { createVendorService } from '../services/createVendor.service';

export const createVendorController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { BCRYPT_SALT_ROUNDS } = environmentVariables;
  const { name, password }: IVendor = req.body;
  if (!name || !password) throw new AppError('Missing data to create a vendor');

  const hashPassword = await bcrypt.hash(password, Number(BCRYPT_SALT_ROUNDS));
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
