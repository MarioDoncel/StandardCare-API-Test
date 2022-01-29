import { sign } from 'jsonwebtoken';

import { tokensConfig } from '../../../config/tokens';

const { secret, expiresIn } = tokensConfig.jwt;

export const createJwtVendorService = (id: string): string => {
  const accessToken = sign({}, secret, {
    subject: id,
    expiresIn,
  });
  return accessToken;
};
