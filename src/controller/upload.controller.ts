import { Request, Response } from 'express';
import { File } from '../model/file.model.js';
import { unlinkFile } from '../utilities/unlinkFile.js';

const uploadFile = async (req: Request, res: Response) => {
  /* 
    # multer uploads file.
    # save file to the database--handle error when saving--error may include db validation errors server error errors.
    # incase db saving error occurs delete uploaded file 
    TODO:# multer error may also be passed herer and may need to be handled -- using MulterError class
 */

  const { project }: { project: string } = req.body;

  try {
    //save file to database
    const file = await File.create({
      path: req.file.path,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      link: req.headers.origin,
      project: project,
      user: req.user_id,
    });

    res.status(200).json({ file });
  } catch (err) {
    //delete uploaded file because database save failed
    // unlinkFile(req.file.path);
    res.status(500).json({ errors: err.errors });
  }
};

const uploadFiles = async (req: Request, res: Response) => {
  const { project }: { project: string } = req.body;

  //   try {
  //     const file = await File.create({
  //       path: req.file.path,
  //       originalName: req.file.originalname,
  //       link: req.headers.origin,
  //       project: project,
  //       user: req.user_id,
  //     });

  // res.status(200).json({ file });
  //   } catch (err) {
  //     res.status(500).json({ errors: err.errors });
  //   }
  res.status(200).json({ status: 'success' });
};

const uploadMultiField = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'success' });
};

export default { uploadFile, uploadFiles, uploadMultiField };
