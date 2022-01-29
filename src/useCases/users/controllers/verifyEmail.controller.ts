import { NextFunction, Request, Response } from 'express';
import JWT from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { VendorModel } from '../../../Database/model/Vendors';
import DatabaseError from '../../../errors/DatabaseError';
import ForbiddenError from '../../../errors/ForbiddenError';
import { IVendor } from '../../../interfaces/Vendor';
import { setEmailVerifiedService } from '../services/setEmailVerified.service';

export const verifyEmailController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { verificationToken } = req.params;
  try {
    const decoded = JWT.verify(
      verificationToken,
      environmentVariables.VERIFICATION_EMAIL_SECRET
    );
    if (typeof decoded !== 'object' || !decoded.sub)
      throw new ForbiddenError('Invalid Token.');

    const id = decoded.sub;
    setEmailVerifiedService(id);

    return res.status(200).send('Email verified');
  } catch (error) {
    next(error);
    return undefined;
  }
};
