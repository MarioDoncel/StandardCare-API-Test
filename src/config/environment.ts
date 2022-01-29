interface IEnvironmentVariables {
  MONGO_CONNECTION: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  BCRYPT_SALT_ROUNDS: string;
  SENDGRID_API_KEY: string;
  VERIFICATION_EMAIL_SECRET: string;
}

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Please, set your environment variables',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || '10',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'Create your own API Key',
  VERIFICATION_EMAIL_SECRET: process.env.VERIFICATION_EMAIL_SECRET || 'default',
};
