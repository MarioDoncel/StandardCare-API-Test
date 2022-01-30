import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import cron from 'node-cron';

import { deleteExpiredRefreshTokens } from './config/cronJob';
import MongoConnection from './Database/mongoConnection';
import { errorHandler, mongoErrorHandler } from './middlewares/errorHandler';
import routes from './routes';

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoConnection();

app.use(routes);

app.use(mongoErrorHandler);
app.use(errorHandler);

cron.schedule('0 2 * * * ', deleteExpiredRefreshTokens);

app.listen(PORT, () => console.log(`⚡️:Server is running on ${HOST}:${PORT}`));
