import express, { Request, Response, NextFunction } from 'express'
import engagementRouter from './engagement.routes'


const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Express + Typescript Server')
})

routes.use('/engagement', engagementRouter);

export default routes;