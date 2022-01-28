import { NextFunction, Response, Request } from 'express';

import { IVendor } from '../../../interfaces/Vendor';
import { getVendorByNameService } from '../services/getVendorByName.service';

export const getVendorEngagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { vendorName } = res.locals; // I assume the vendor name comes from an authentication middleware, because in the documentation is described as get YOUR current metrics.
  try {
    const vendor: IVendor = await getVendorByNameService(vendorName);
    const { engagement } = vendor;

    res.status(200).json(engagement);
  } catch (error) {
    next(error);
  }

  return undefined;
};
