import { Request, Response } from 'express';
import { File } from '../model/file.model.js';
import { unlinkFile } from '../utilities/unlinkFile.js';

const serveFile = async (req, res) => {
  const file = await File.find({ user: req.user_id, _id: req.params.id });
  res.sendFile(file[0].path, { root: `uploads/${req.user_id}` });
};
const publicUploadFile = async (req: Request, res: Response) => {
  const { project }: { project: string } = req.body;

  try {
    // save file to database
    const file = await File.create({
      path: req.file.path,
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      link: req.headers.origin,
      project: project,
      user: req.user_id,
    });

    res.status(200).json({ file });
  } catch (err) {
    //delete uploaded file because database save failed
    console.log(req.file.path, 'path');
    // if (req.file.path != undefined) {
    //   unlinkFile(req.file.path);
    // }

    res.status(500).json({ errors: err.errors });
  }
};

////Private uploads
const uploadFile = async (req: Request, res: Response) => {
  /* agendas of this function::::
    # multer uploads file.
    # save file to the database--handle error when saving--error may include db validation errors server error errors.
    # incase db saving error occurs delete uploaded file 
    # multer error is handled by the errorHandler middleware 
 */

  const { project }: { project: string } = req.body;

  try {
    // save file to database
    const file = await File.create({
      path: req.file.path.split('/').slice(2).join('/'),
      fileName: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      link: req.headers.origin,
      project: project,
      user: req.user_id,
    });

    res.status(200).json({ file });
  } catch (err) {
    //delete uploaded file because database save failed
    // check for file incase file is not sent to server or else req.file.path gives error
    if (req.file) {
      unlinkFile(req.file.path);
    } else {
      err.errors = 'File is required';
    }

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

export default { serveFile, uploadFile, uploadFiles, uploadMultiField };
