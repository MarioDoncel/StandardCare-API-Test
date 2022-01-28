interface IEnvironmentVariables {
  MONGO_CONNECTION: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  BCRYPT_SALT_ROUNDS: string;
}

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Please, set your environment variables',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || '10',
};
