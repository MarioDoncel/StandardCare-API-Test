import { NextFunction, Response, Request } from 'express';
import { ObjectId } from 'mongodb';

import { createTokens } from '../../../utils/createTokens';

export const logInVendorControlller = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { _id }: { _id: ObjectId } = res.locals.vendor;
  const tokens = await createTokens(_id.toString());

  return res.status(200).json(tokens);
};
