import express from 'express';

import { basicAuthMiddleware } from '../middlewares/basicAuth';
import { getVendorEngagementController } from '../useCases/vendors/controllers/getVendorEngagement.controller';
import { logInVendorControlller } from '../useCases/vendors/controllers/logInVendorControlller';
import { updateVendorEngagementController } from '../useCases/vendors/controllers/updateVendorEngagement.controller';

const vendorsRoutes = express.Router();

vendorsRoutes.post('/login', basicAuthMiddleware, logInVendorControlller);
vendorsRoutes.get('/engagement', getVendorEngagementController);
vendorsRoutes.put('/engagement', updateVendorEngagementController);

export default vendorsRoutes;
