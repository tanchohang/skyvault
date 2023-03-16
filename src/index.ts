import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';
import config from './config/index.js';

import mongodb from './utilities/mongodb.js';
import { errorHandler } from './middleware/errorhandler.middleware.js';

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public/uploads'));

///routes

app.use(authRoutes);
app.use(fileRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');

  next(error);
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
