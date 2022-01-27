import 'dotenv/config'
import express from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';

const HOST = process.env.HOST || 'http://localhost';
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`⚡️:Server is running on ${HOST}:${PORT}`));
