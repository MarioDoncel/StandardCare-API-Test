import express from 'express';

import { upload } from '../middlewares/multer';
import { getCensusByClientController } from '../useCases/census/controllers/getCensusByClient.controller';
import { receiveCensusController } from '../useCases/census/controllers/receiveCensus.controller';

const censusRouter = express.Router();

censusRouter.post('/', upload.single('file'), receiveCensusController);

censusRouter.get('/:clientName', getCensusByClientController);

export default censusRouter;
