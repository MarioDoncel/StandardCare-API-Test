import { NextFunction, Response, Request } from 'express';

import { IVendor } from '../../../interfaces/Vendor';
import { getVendorByNameService } from '../services/getVendorByName.service';

export const getVendorEngagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { name } = res.locals.vendor;
  try {
    const vendor: IVendor = await getVendorByNameService(name);
    const { engagement } = vendor;

    res.status(200).json(engagement);
  } catch (error) {
    next(error);
  }

  return undefined;
};
