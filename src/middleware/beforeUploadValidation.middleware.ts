import { NextFunction, Request, Response } from 'express';

export const beforeUploadValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  //   if (req.body.file == null) {
  //   }
  next();
};
