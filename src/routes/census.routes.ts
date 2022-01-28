import express, { Request, Response, NextFunction } from 'express';

import { CensusModel } from '../Database/model/Census';
import { receiveCensusController } from '../useCases/census/controllers/receiveCensus.controller';

const censusRouter = express.Router();

censusRouter.post('/', receiveCensusController);

censusRouter.get(
  '/:clientName',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | undefined> => {
    const { clientName } = req.params;
    try {
      const census = await CensusModel.find({ clientName });

      return res.status(200).json(census);
    } catch (error) {
      next(error);
    }
    return undefined;
  }
);

export default censusRouter;
