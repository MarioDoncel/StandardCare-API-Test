import express, { Request, Response, NextFunction } from 'express';

import censusRoutes from './census.routes';
import usersRoutes from './users.routes';
import vendorsRoutes from './vendor.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello Ryan, server is running! ');
});

routes.use('/vendors', vendorsRoutes);
routes.use('/users', usersRoutes);
routes.use('/census', censusRoutes);

export default routes;
