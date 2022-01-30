import express, { Request, Response, NextFunction } from 'express';

import usersRoutes from './users.routes';
import vendorsRoutes from './vendor.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log(`reqheaders- ${req.headers.host}`);
  console.log(`reqheaders- ${window.location}`);

  res.send('Hello Ryan, server is running! ');
});

routes.use('/vendors', vendorsRoutes);
routes.use('/users', usersRoutes);

export default routes;
