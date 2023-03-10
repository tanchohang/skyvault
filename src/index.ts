import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';

import mongodb from './utilities/mongodb.js';
import { MulterError } from 'multer';
import { errorHandler } from './middleware/errorhandler.middleware.js';
import { authenticatedUser } from './middleware/auth.middleware.js';
import { File, IFileDocument } from './model/file.model.js';

dotenv.config();

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public/uploads'));

mongodb
  .then(() => {
    app.listen(3500);
  })
  .catch((err) => {
    console.error(err, 'mongodb Error');
  });

///routes

app.use(authRoutes);
app.use(fileRoutes);

app.use(errorHandler);
