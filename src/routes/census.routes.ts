import express from 'express';

import { getCensusByClientController } from '../useCases/census/controllers/getCensusByClient.controller';
import { receiveCensusController } from '../useCases/census/controllers/receiveCensus.controller';

const censusRouter = express.Router();

censusRouter.post('/', receiveCensusController);

censusRouter.get('/:clientName', getCensusByClientController);

export default censusRouter;
