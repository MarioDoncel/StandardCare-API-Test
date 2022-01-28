import express from 'express';

import { getVendorEngagementController } from '../useCases/vendors/controllers/getVendorEngagement.controller';
import { updateVendorEngagementController } from '../useCases/vendors/controllers/updateVendorEngagement.controller';

const vendorsRoutes = express.Router();

vendorsRoutes.get('/engagement', getVendorEngagementController);
vendorsRoutes.put('/engagement', updateVendorEngagementController);

export default vendorsRoutes;
