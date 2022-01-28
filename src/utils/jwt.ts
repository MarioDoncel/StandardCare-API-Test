import JWT, { sign } from 'jsonwebtoken';

import { tokensConfig } from '../config/tokens';
import ForbiddenError from '../errors/ForbiddenError';

const { secret, expiresIn } = tokensConfig.jwt;

export const createJWT = (id: string): string => {
  const accessToken = sign({}, secret, {
    subject: id,
    expiresIn,
  });
  return accessToken;
};

export const validateJWT = (jwt: string): string => {
  try {
    const decoded = JWT.verify(jwt, secret);

    if (typeof decoded !== 'object' || !decoded.sub)
      throw new ForbiddenError('Invalid Token.');

    return decoded.sub;
  } catch (error) {
    throw new ForbiddenError('Invalid Token.');
  }
};
