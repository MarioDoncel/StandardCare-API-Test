import express, { Request, Response, NextFunction } from 'express';

import { CensusModel } from '../Database/model/Census';
import { UserModel } from '../Database/model/User';
import AppError from '../errors/AppError';
import { ICensus } from '../interfaces/Census';
import { IUser } from '../interfaces/User';
import { IVendor } from '../interfaces/Vendor';

const censusRouter = express.Router();

censusRouter.post(
  '/',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    // i didn't understand if the census users comes from a client or from a vendor.
    const clientCensus: ICensus[] = req.body;

    try {
      clientCensus.forEach(async (user) => {
        await CensusModel.create({
          name: user.name,
          dateOfBirth: user.dateOfBirth,
          clientName: user.clientName,
        });
      });

      return res.status(201).send('Success');
    } catch (error) {
      next(error);
      return undefined;
    }
  }
);

censusRouter.get(
  '/:clientName',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const { clientName } = req.params;
    try {
      const census = await CensusModel.find({ vendor: clientName });

      return res.status(200).json(census);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default censusRouter;
