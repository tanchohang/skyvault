import { Request, Response, Express, NextFunction } from 'express';
import { mkdirSync } from 'fs';
import { File, IFile } from '../model/file.model.js';
import { isProject } from '../service/project.service.js';
import { unlinkFiles } from '../utilities/unlinkFiles.js';
import * as fileService from '../service/file.service.js';
import { config } from '../config/index.js';

// const createPublic = async (req: Request, res: Response) => {
//   const { project }: { project: string } = req.body;

//   try {
//     // save file to database
//     const file = await File.create({
//       path: req.file.path,
//       fileName: req.file.filename,
//       originalName: req.file.originalname,
//       mimeType: req.file.mimetype,
//       link: req.headers.origin,
//       project: project,
//       user: req.user_id,
//     });

//     res.status(200).json({ file });
//   } catch (err) {
//     //delete uploaded file because database save failed
//     console.log(req.file.path, 'path');
//     // if (req.file.path != undefined) {
//     //   unlinkFile(req.file.path);
//     // }

//     res.status(500).json({ errors: err.errors });
//   }
// };

// ////Private uploads
// const create = async (req: Request, res: Response) => {
//   /* agendas of this function::::
//     # multer uploads file.
//     # save file to the database--handle error when saving--error may include db validation errors server error errors.
//     # incase db saving error occurs delete uploaded file
//     # multer error is handled by the errorHandler middleware
//  */

//   const { project }: { project: string } = req.body;

//   try {
//     // save file to database
//     const file = await File.create({
//       path: req.file.path.split('/').slice(2).join('/'),
//       fileName: req.file.filename,
//       originalName: req.file.originalname,
//       mimeType: req.file.mimetype,
//       link: req.headers.origin,
//       project: project,
//       user: req.user_id,
//     });

//     res.status(200).json({ file });
//   } catch (err) {
//     //delete uploaded file because database save failed
//     // check for file incase file is not sent to server or else req.file.path gives error
//     if (req.file) {
//       unlinkFile(req.file.path);
//     } else {
//       err.errors = 'File is required';
//     }

//     res.status(500).json({ errors: err.errors });
//   }
// };

export const upload = async (req: Request, res: Response, next: NextFunction) => {
  /******
   * if req.files is empty then req escapes multer middleware. so we validate that the project exists for the user and use this phenomena to create new folders.
   * multer first uploades the files and then controller adds them to the database: Incase the database action fails we have to unlink the uploades files.
   *
   * ******/

  //saving to database
  try {
    const user = req.user_id;
    const project = req.body.project;

    const filePublic = req.body.public === 'true'; //converting string to boolean
    const fileList = req.files as Express.Multer.File[];
    if (fileList === undefined || fileList.length === 0) {
      // no files but subfolders can be created

      // check if project is valid
      if (!(await isProject({ uid: user, pid: project }))) {
        throw new Error('Project is not valid'); //not valid throw error
      }
      const uploadPath = ['uploads', user, project, req.body.subfolders].join('/'); //create folder path
      const uploadedFolder = fileService.saveFiles({ files: [{ user, project, path: uploadPath } as IFile] });
      mkdirSync(uploadPath, { recursive: true }); //create folder

      return res.status(200).json('folder created successfully');
    }
    let tempFileList;
    if (filePublic) {
      tempFileList = fileList.map(
        (file: Express.Multer.File) =>
          ({
            path: file.path,
            fileName: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            link: [config.base_url, file.filename].join('/'),
            public: true,
            project: project,
            user: req.user_id,
          } as IFile)
      );
    } else {
      tempFileList = fileList.map(
        (file: Express.Multer.File) =>
          ({
            path: file.path,
            fileName: file.filename,
            originalName: file.originalname,
            mimeType: file.mimetype,
            link: ['files', file.filename].join('/'),
            project: project,
            user: req.user_id,
          } as IFile)
      );
    }

    const files = await fileService.saveFiles({ files: tempFileList });
    res.status(200).json(files);
  } catch (error) {
    if (req.files) unlinkFiles(req.files as Express.Multer.File[]);
    next(error);
  }
};

export const sendFile = async (req: Request, res: Response, next: NextFunction) => {
  const file = await fileService.sendFile({ uid: req.user_id, filename: req.params.filename });
  res.sendFile(file.path, { root: `uploads/${req.user_id}` });
};

export const readAllFiles = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = await fileService.getAllFiles({ uid: req.user_id });
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const readFiles = async (req: Request, res: Response, next: NextFunction) => {
  const { pid } = req.params;
  try {
    const files = await fileService.getAllFileByProject({ uid: req.user_id, pid });
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const readTrashedFiles = async (req: Request, res: Response, next: NextFunction) => {
  const { pid } = req.params;
  try {
    const files = await fileService.getTrashed({ uid: req.user_id });
    res.status(200).json(files);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const file = await fileService.updateFile({ uid: req.user_id, id: req.params.id, name });
    res.status(200).json(file);
  } catch (error) {
    next(error);
  }
};

export const trash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trashed = await fileService.trashFile({ id: req.params.id });
    res.status(200).json(trashed);
  } catch (error) {
    next(error);
  }
};
export const restore = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trashed = await fileService.restoreFile({ id: req.params.id });
    res.status(200).json(trashed);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await fileService.deleteFile({ uid: req.user_id, id: req.params.id });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
export const emptyTrash = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await fileService.emptyTrash({ uid: req.user_id });
    res.status(200).json(deleted);
  } catch (error) {
    next(error);
  }
};
