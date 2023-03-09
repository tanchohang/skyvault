import dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import fileRoutes from './routes/file.routes.js';

import mongodb from './utilities/mongodb.js';
import { MulterError } from 'multer';

dotenv.config();

const app: Application = express();

//middleware
app.use(express.json());
app.use(cors());

mongodb
  .then(() => {
    app.listen(3500);
  })
  .catch((err) => {
    console.error(err);
  });

///routes

app.use(authRoutes);
app.use(fileRoutes);

app.use((error, req: Request, res: Response, next: NextFunction) => {
  //MulterError handling
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE')
      res.status(500).json({ error: error.message });

    res.status(500).json({ error: error.message, extra: 'multer failed' });
  }
  res.status(500).json({ error: error.message });
});
