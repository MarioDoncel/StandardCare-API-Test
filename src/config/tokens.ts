import { environmentVariables } from './environment';

const thirtyDays = 1000 * 60 * 60 * 24 * 30;
const now = new Date().getTime();

const refereshTokenExpiration = now + thirtyDays;

export const tokensConfig = {
  jwt: {
    secret: environmentVariables.JWT_SECRET,
    expiresIn: '1h',
  },
  refreshToken: {
    expiresIn: refereshTokenExpiration,
  },
};
