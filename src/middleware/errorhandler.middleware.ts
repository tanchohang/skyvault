import { NextFunction, Request, Response } from 'express';
import { MulterError } from 'multer';
import { logger } from '../logger/index.js';

export const errorHandler = (error, req: Request, res: Response, next: NextFunction) => {
  logger.error(error, { ip_address: req.socket.remoteAddress, method: req.method, path: req.originalUrl, user: req.user_id });

  //MulterError handling
  if (error instanceof MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') res.status(500).json({ error: 'File can only be 10MB' });
    if (error.code === 'LIMIT_FIELD_COUNT') res.status(500).json({ error: 'Cant upload more than 20 files per upload ' });

    res.status(500).json({ error: error.message, handler: 'multer failed' });
  }

  res.status(500).json({
    error: error.message ? error.message : 'internal server error',
    handler: 'error handler middleware',
  });
};
