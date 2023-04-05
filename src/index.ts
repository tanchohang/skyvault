import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import projectRoutes from './routes/project.routes.js';
import { config } from './config/index.js';
import path from 'path';

import mongodb from './utilities/mongodb.js';
import { errorHandler } from './middleware/errorhandler.middleware.js';

import { logger } from './logger/index.js';

const app: Application = express();
const __dirname = path.resolve();

//middleware
app.use(express.json());

app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info('access_info', { ip_address: req.socket.remoteAddress, method: req.method, path: req.originalUrl });
  next();
});

app.use(express.static(path.join(__dirname, 'public/uploads')));
///routes
app.use(authRoutes);
app.use(fileRoutes);
app.use(projectRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');

  res.status(404).json({ error: error.message });
});

app.use(errorHandler);

mongodb
  .then(() => {
    app.listen(config.port).on('error', (err) => {
      console.log(err.message);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error(err, 'mongodb Error');
  });
