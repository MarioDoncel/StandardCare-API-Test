import { NextFunction, Request, Response } from 'express';

import DatabaseError from '../../../errors/DatabaseError';
import { IVendor } from '../../../interfaces/Vendor';
import { updateVendorEngagementService } from '../services/updateVendorEngagement.service';

export const updateVendorEngagementController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | undefined> => {
  const { engagement }: { engagement: string } = req.body;
  const { name } = res.locals.vendor;

  try {
    const updatedVendor: IVendor | null = await updateVendorEngagementService(
      name,
      engagement
    );

    if (!updatedVendor) throw new DatabaseError('Vendor not found', '', 400);

    res.status(200).json(updatedVendor);
  } catch (error) {
    next(error);
  }
  return undefined;
};
