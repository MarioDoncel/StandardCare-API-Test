import express, { Request, Response, NextFunction } from 'express';

const engagementRouter = express.Router();

engagementRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello Server Is Running');
});

engagementRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Express + Typescript Server');
});

export default engagementRouter;
