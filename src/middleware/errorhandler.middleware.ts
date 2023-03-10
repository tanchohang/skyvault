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
  //Not Found
  if (error.message === 'Not Found') {
    res.status(404).json({ error: error.message });
  }
  res.status(500).json({
    error: error.message ? error.message : 'internal server error',
    handler: 'error handler middleware',
  });
};
