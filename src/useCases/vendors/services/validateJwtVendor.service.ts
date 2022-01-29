import JWT from 'jsonwebtoken';

import { tokensConfig } from '../../../config/tokens';
import ForbiddenError from '../../../errors/ForbiddenError';

const { secret } = tokensConfig.jwt;

export const validateJWTVendorService = (
  jwt: string
): { valid: boolean; id?: string; message?: string } => {
  try {
    const decoded = JWT.verify(jwt, secret);

    if (typeof decoded !== 'object' || !decoded.sub)
      throw new ForbiddenError('Invalid Token.');

    return { valid: true, id: decoded.sub };
  } catch (error) {
    const err = error as Error;
    return { valid: false, message: err.message };
  }
};
