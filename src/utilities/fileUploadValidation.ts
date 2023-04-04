import { NextFunction, Request, Response } from 'express';
import { pid } from 'process';
import { isProject } from '../service/project.service.js';

export function fileUploadValidation(req: Request) {
  //   if (req.body.project) {
  //     if (isProject(req.user_id, req.body.project)) {
  //       return null;
  //     } else return new Error('Project is invalid');
  //   } else {
  //     return new Error('Project field is required');
  //   }

  if (req.body.project === undefined) {
    return Error('Project field is required');
  }
  return null;
}
