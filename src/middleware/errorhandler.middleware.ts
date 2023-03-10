import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';

export const errorHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //MulterError handling
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE')
      res.status(500).json({ error: error.message });

    res.status(500).json({ error: error.message, extra: 'multer failed' });
  }
  res
    .status(500)
    .json({ error: error.message, handler: 'error handler middleware' });
};
