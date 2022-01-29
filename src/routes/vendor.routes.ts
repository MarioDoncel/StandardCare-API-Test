import express from 'express';

import { getVendorEngagementController } from '../useCases/vendors/controllers/getVendorEngagement.controller';
import { logInVendorControlller } from '../useCases/vendors/controllers/logInVendorControlller';
import { updateVendorEngagementController } from '../useCases/vendors/controllers/updateVendorEngagement.controller';
import { vendorBasicAuthMiddleware } from '../useCases/vendors/middlewares/vendorBasicAuth';
import { vendorBearerAuthMiddleware } from '../useCases/vendors/middlewares/vendorBearerAuth';

const vendorsRoutes = express.Router();

vendorsRoutes.post('/login', vendorBasicAuthMiddleware, logInVendorControlller);
vendorsRoutes.get(
  '/engagement',
  vendorBearerAuthMiddleware,
  getVendorEngagementController
);
vendorsRoutes.put(
  '/engagement',
  vendorBearerAuthMiddleware,
  updateVendorEngagementController
);

export default vendorsRoutes;
