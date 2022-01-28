interface IEnvironmentVariables {
  MONGO_CONNECTION: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
}

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Please, set your environment variables',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default',
};
