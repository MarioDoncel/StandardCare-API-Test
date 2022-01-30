import { Request, Response, NextFunction } from 'express';
import { MongoError } from 'mongoose/node_modules/mongodb';

import AppError from '../errors/AppError';
import DatabaseError from '../errors/DatabaseError';

export const mongoErrorHandler = (
  err: MongoError,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return response.status(400).send({
      status: 'error',
      message: 'There was a duplicate key error',
    });
  }
  next(err);
  return undefined;
};

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError || err instanceof DatabaseError) {
    return response.status(err.statusCode).send({
      status: 'error',
      message: err.message,
      data: err?.data,
    });
  }

  return response.status(500).send({
    status: 'error',
    message: 'Internal servel Error',
  });
};
